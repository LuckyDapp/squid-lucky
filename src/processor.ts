import { KnownArchives, KnownArchivesEVM, KnownArchivesSubstrate, lookupArchive } from "@subsquid/archive-registry"
import * as ss58 from "@subsquid/ss58"
import {toHex, decodeHex} from "@subsquid/util-internal-hex"
import {SubstrateBatchProcessor} from "@subsquid/substrate-processor"
import { TypeormDatabase} from "@subsquid/typeorm-store"
import {Like, In} from "typeorm"
import {DappsStakingBondAndStakeEvent, DappsStakingNewDappStakingEraEvent, DappsStakingNominationTransferEvent, DappsStakingRewardEvent, DappsStakingUnbondAndUnstakeEvent} from "./types/events"

import * as lucky_raffle from "./abi/lucky_raffle"
import * as reward_manager from "./abi/reward_manager"

import {Account, DappStakingEra, DeveloperReward, Reward, Stake, RewardsClaimed, RaffleDone} from "./model/generated"
import { SmartContract } from "./types/v7"

import {Network, start_block, RAFFLE_CONTRACT_ADDRESS_SS58, REWARD_CONTRACT_ADDRESS_SS58, DAPP_CONTRACT_ADDRESS_SS58, DEVELOPPER_ADDRESS_SS58 } from "./constants"

// Get network from env, 
// default shibuya
const network:string = process.env.NETWORK ? process.env.NETWORK as unknown as string : "shibuya" ;
console.log("NETWORK",network)

// Init addresses
const RAFFLE_CONTRACT_ADDRESS = toHex(ss58.decode(RAFFLE_CONTRACT_ADDRESS_SS58[network as unknown as keyof Network]).bytes);
console.log("hex raffle address",RAFFLE_CONTRACT_ADDRESS);
const REWARD_CONTRACT_ADDRESS = toHex(ss58.decode(REWARD_CONTRACT_ADDRESS_SS58[network as unknown as keyof Network]).bytes);
console.log("hex reward address",REWARD_CONTRACT_ADDRESS);
const DAPP_CONTRACT_ADDRESS = toHex(ss58.decode(DAPP_CONTRACT_ADDRESS_SS58[network as unknown as keyof Network]).bytes);
console.log("hex dapp address",DAPP_CONTRACT_ADDRESS);
const DEVELOPPER_ADDRESS = toHex(ss58.decode(DEVELOPPER_ADDRESS_SS58[network as unknown as keyof Network]).bytes);
console.log("hex developper address",DEVELOPPER_ADDRESS);

// interface for objects that will be created while looping through the batch's blocks
// there is no Account Interface because we won't populate an array of account during the batch
interface StakeRecord {
    id: string 
    account: string
    type: string
    amount: bigint
    era: bigint
    blockNumber: bigint
}

interface DappStakingEraRecord {
    id: string,
    era: bigint,
    blockNumber: bigint
}

interface DevelopperRewardRecord {
    id: string
    account: string
    era: bigint
    amount: bigint
}

interface RaffleRecord {
    id: string
    era: bigint
    totalRewards: bigint
    nbWinners: bigint
    nbParticipants: bigint
    totalValue: bigint
}

interface RewardRecord {
    id: string
    account: string
    era: bigint
    amount: bigint
}

interface RewardClaimedRecord {
    id: string
    account: string
    amount: bigint
    blockNumber: bigint
    timestamp: string
}

// function getAccount is used to lookup the existing account from the given map in param
// if not exists, create a new one and init amounts with 0
function getAccount(m: Map<string, Account>, id: string): Account {
    let acc = m.get(id)
    if (acc == null) {
        acc = new Account()
        acc.id = id
        acc.totalStake = BigInt(0);
        acc.totalRewards = BigInt(0);
        acc.totalClaimed = BigInt(0);
        acc.totalPending = BigInt(0);
        m.set(id, acc)
    }
    return acc
}


/******************************* */
/* subscribe to SUBSTRATE events */
/******************************* */

const start_block_network:number = start_block[network as unknown as keyof Network];

export const processor = new SubstrateBatchProcessor()
    .setDataSource({
        archive: lookupArchive(network as unknown as KnownArchivesSubstrate, {release: 'FireSquid'}),
    })
    .addEvent('DappsStaking.BondAndStake', {
        data: {
            event: {
                args: true,
                extrinsic: {
                    hash: true,
                    fee: true,
                },
            },
        },
        range: {
            from: start_block_network
        }
    } as const)
    .addEvent('DappsStaking.UnbondAndUnstake', {
        data: {
            event: {
                args: true,
                extrinsic: {
                    hash: true,
                    fee: true,
                },
            },
        },
        range: {
            from: start_block_network
        }
    } as const)
    .addEvent('DappsStaking.NominationTransfer', {
        data: {
            event: {
                args: true,
                extrinsic: {
                    hash: true,
                    fee: true,
                },
            },
        },
        range: {
            from: start_block_network
        }
    } as const)
    .addEvent('DappsStaking.Reward', {
        data: {
            event: {
                args: true,
                extrinsic: {
                    hash: true,
                    fee: true,
                },
            },
        },
        range: {
            from: start_block_network
        }
    } as const)
    .addEvent('DappsStaking.NewDappStakingEra', {
        data: {
            event: {
                args: true,
                extrinsic: {
                    hash: true,
                    fee: true,
                },
            },
        },
        range: {
            from: 0
        }
    } as const)

/************************* */
/* subscribe to INK events */
/************************* */

    .addContractsContractEmitted(REWARD_CONTRACT_ADDRESS, {
        data: {
            event: {args: true}
        },
        range: {
            from: start_block_network
        }
    } as const)
    .addContractsContractEmitted(RAFFLE_CONTRACT_ADDRESS, {
        data: {
            event: {args: true}
        },
        range: {
            from: start_block_network
        }
    } as const);


/************************ */
/* LFG! Run the processor */
/************************ */
const database = new TypeormDatabase();
processor.run(database, async (ctx) => {

    // we create an array for each object type
    // only accounts will be created on the fly with other objects
    const eras: DappStakingEraRecord[] = []
    const stakes: StakeRecord[] = [];
    const developper_rewards: DevelopperRewardRecord[] = [];
    const raffles: RaffleRecord[] = [];
    const rewards: RewardRecord[] = [];
    const rewards_claimed: RewardClaimedRecord[] = [];

    // get last era created, to init current_era
    const last_era = await ctx.store.findOne(DappStakingEra,{
        where: {
            id: Like("%"),
        },
        order: {
            era: "DESC",
        },
    });
    let current_era: bigint = BigInt(last_era ? last_era.era : 0);

    // loop through each block of the batch and populate all arrays of objects
    // for each Object we insert a string in "account" and we will deal with it later
    for (const block of ctx.blocks) {
        
        for (const item of block.items) {

            /*****************************/
            // run the ink part
            /*****************************/

            if (item.name === 'Contracts.ContractEmitted' && item.event.args.contract === RAFFLE_CONTRACT_ADDRESS) {
                const data = item.event.args.data;
                const event = lucky_raffle.decodeEvent(data);
                if (event.__kind === 'RaffleDone') {
                    const raffle = {
                        id: item.event.id,
                        era: BigInt(event.era),
                        totalRewards: event.pendingRewards,
                        nbWinners: BigInt(event.nbWinners),
                        nbParticipants: BigInt(event.nbParticipants),
                        totalValue: event.totalValue                  
                    };
                    raffles.push(raffle);
                }
            }

            if (item.name === 'Contracts.ContractEmitted' && item.event.args.contract === REWARD_CONTRACT_ADDRESS) {
                const data = item.event.args.data;
                const event = reward_manager.decodeEvent(data);
                if (event.__kind === 'PendingReward') {
               
                    const reward = {
                        id: item.event.id, 
                        account:ss58.codec("astar").encode(event.account), // string
                        era: BigInt(event.era),
                        amount: event.amount
                    };
                    rewards.push(reward);
                }
                if (event.__kind === 'RewardsClaimed') {
                    const reward_claimed = {
                        id: item.event.id,
                        account: ss58.codec("astar").encode(event.account), // string
                        amount: event.amount,
                        blockNumber: BigInt(block.header.height),
                        timestamp: String(block.header.timestamp)
                    };
                    rewards_claimed.push(reward_claimed);
                }
            }

            /*****************************/
            // run the substrate event part
            /*****************************/

            if (((item.name === "DappsStaking.NewDappStakingEra"))){
                const era = {
                    id: item.event.id,
                    era: BigInt(item.event.args),
                    blockNumber: BigInt(block.header.height)
                };
                eras.push(era);
                current_era = era.era;

            }

            if (((item.name === "DappsStaking.BondAndStake"))){
                const e = new DappsStakingBondAndStakeEvent(ctx,item.event);
                let rec :{account: Uint8Array, contract: SmartContract, amount: bigint};
                let [account, contract, amount] = e.asV7;
                rec={account, contract, amount};
                
                if (item.event.args[1].value === DAPP_CONTRACT_ADDRESS) { // 0x5a91a4a61aaf75a2d8ad377339412bbcaf56898db47201da577a49503956e93f
                    const tx_from = ss58.codec("astar").encode(decodeHex(item.event.args[0]));
                    const stake = {
                        id: item.event.id,  
                        account: tx_from, // string
                        amount: BigInt(item.event.args[2]),
                        type: "stake",
                        era: current_era,
                        blockNumber: BigInt(block.header.height)
                    };
                    stakes.push(stake);
                }
            }
            if (((item.name === "DappsStaking.UnbondAndUnstake"))){
                const e = new DappsStakingUnbondAndUnstakeEvent(ctx,item.event);
                let rec :{account: Uint8Array, contract: SmartContract, amount: bigint};
                let [account, contract, amount] = e.asV27;
                rec={account, contract, amount};
                
                if (item.event.args[1].value === DAPP_CONTRACT_ADDRESS) { // 0x5a91a4a61aaf75a2d8ad377339412bbcaf56898db47201da577a49503956e93f
                    const tx_from = ss58.codec("astar").encode(decodeHex(item.event.args[0]));
                    const stake = {
                        id: item.event.id,  
                        account: tx_from,
                        amount: BigInt(0) - BigInt(item.event.args[2]),
                        type: "unstake",
                        era: current_era,
                        blockNumber: BigInt(block.header.height)
                    };
                    stakes.push(stake);
                }
            }

            if (((item.name === "DappsStaking.NominationTransfer"))){
                const e = new DappsStakingNominationTransferEvent(ctx,item.event);
                let rec :{account: Uint8Array, origin: SmartContract, amount: bigint, target: SmartContract};
                let [account, origin, amount, target] = e.asV49;
                rec={account, origin, amount, target};
                const is_target = toHex(target.value) === DAPP_CONTRACT_ADDRESS;
                const is_origin = toHex(origin.value) === DAPP_CONTRACT_ADDRESS;

                if (is_origin || is_target) {
                    const tx_from = ss58.codec("astar").encode(account);
                    const stake = {
                        id: item.event.id,  
                        account: tx_from, // string
                        amount: is_target ? BigInt(0) + BigInt(amount) : BigInt(0) - BigInt(amount) ,
                        type: "transfer",
                        era: current_era,
                        blockNumber: BigInt(block.header.height)
                    };
                    stakes.push(stake);
                }
            }

            /* Subtrate event reward
            as we only track DevelopperRewards, 
            we just check if dest account is our developper account
            */
            if (((item.name === "DappsStaking.Reward"))){
                const e = new DappsStakingRewardEvent(ctx,item.event);
                let rec :{account: Uint8Array, contract: SmartContract, era: number,  amount: bigint};
                let [account, contract, era, amount ] = e.asV13;
                rec={account, contract, era, amount};
                
                const is_developper = ss58.codec("astar").encode(account) === DEVELOPPER_ADDRESS_SS58 as unknown as string;
                const is_contract = toHex(contract.value) === DAPP_CONTRACT_ADDRESS;

                if ( is_developper && is_contract) {
                    const developper_reward = {
                        id: item.event.id,  
                        account: ss58.codec("astar").encode(account), // string
                        era: current_era,
                        amount: BigInt(amount),
                    };
                    developper_rewards.push(developper_reward);
                }
            }
        }
    }

    /***********************************************/
    /** Almost done, persist the objects ************************/
    /***********************************************/

    /********* ERAS ********************************/
    // Insert All eras (no update)
    // can use one liner because no update of account object
    for (let e of eras) {
        await ctx.store.insert(new DappStakingEra(e));
    }
    
    /********* ACCOUNTS ****************************/
    /** 
     * Accounts are not created directly
     * 
     * we create or update accounts when we insert 
     * others objects:
     * - stakes (bond, unbond or transfer)
     * - developper rewards
     * - raffle rewards (won)
     * - raffle rewards (claimed)
     * 
     * we get all accounts addresses from these objects
     * and add them to accounts_id array
     * this array will be used to query the store and get existing objects
     * we use it as an arg in function getAccount when creating other entities
    */

    let accounts_ids = new Set<string>()
    for (let s of stakes) {
        accounts_ids.add(s.account);
    }
    for (let d of developper_rewards) {
        accounts_ids.add(d.account);
    }
    for (let r of rewards) {
        accounts_ids.add(r.account);
    }
    for (let rc of rewards_claimed) {
        accounts_ids.add(rc.account);
    }

    // get accounts from store that match accounts in the objects above
    // store_accounts map will contain all accounts from store that already exists
    let store_accounts = await ctx.store.findBy(Account, {id: In([...accounts_ids])}).then(accounts => {
        return new Map(accounts.map(a => [a.id, a]))
    })

    /********* STAKES ******************************/
    /* every stakes are new objects, no update */

    // loop over all stakes entries 
    // create new object, populate data
    // bind existing or create new account (in getAccount)
    // update account with new stake (s.amount can be negative)
    // save objects
    for (let s of stakes) {
        const s_s = new Stake();
        s_s.id = s.id;
        s_s.amount = s.amount;
        s_s.type = s.type;
        s_s.era = BigInt(s.era);
        s_s.blockNumber = s.blockNumber;
        s_s.account = getAccount(store_accounts,s.account);
        s_s.account.totalStake = s_s.account.totalStake + s.amount;
        await ctx.store.save(s_s.account);
        await ctx.store.save(s_s);
    }

    /********* DEV REWARDS *************************/
    /* every dr are new objects, no update */

    // loop over all dr entries 
    // create new object, populate data
    // bind existing or create new account (in getAccount)
    // save objects
    for (let dr of developper_rewards) {
        const s_dr = new DeveloperReward();
        s_dr.id = dr.id;
        s_dr.era = dr.era;
        s_dr.amount = dr.amount;
        s_dr.account = getAccount(store_accounts,dr.account);
        await ctx.store.save(s_dr.account);
        await ctx.store.insert(s_dr);
    }

    /********* REWARDS (from raffle) ************** */
    /* every rr are new objects, no update */

    // loop over all dr entries 
    // create new object, populate data
    // bind existing account (in getAccount)
    // update account with new pending amount (positive only)
    // save objects
    for (let rr of rewards) {
        const s_rr = new Reward();
        s_rr.id = rr.id;
        s_rr.era = rr.era;
        s_rr.amount = rr.amount;
        s_rr.account = getAccount(store_accounts,rr.account);
        s_rr.account.totalPending += rr.amount;
        await ctx.store.save(s_rr.account);
        await ctx.store.insert(s_rr);
    }

    /********* REWARDS CLAIMED (from raffle) ****** */
    /* every rc are new objects, no update */

    // loop over all rc entries 
    // create new object, populate data
    // bind existing account (in getAccount)
    // update account with new claimed amount (positive only)
    // reset totalPending
    // save objects
    for (let rc of rewards_claimed) {
        const s_rc = new RewardsClaimed();
        s_rc.id = rc.id;
        s_rc.amount = rc.amount;
        s_rc.blockNumber = rc.blockNumber;
        s_rc.timestamp = rc.timestamp;
        s_rc.account = getAccount(store_accounts,rc.account);
        s_rc.account.totalClaimed += rc.amount;
        s_rc.account.totalPending = BigInt(0);
        await ctx.store.save(s_rc.account);
        await ctx.store.insert(s_rc);
    }

    /********* RAFFLES DONE ************************ */
    /* every rd are new objects, no update */

    // loop over all rd entries 
    // create new object, populate data
    // save objects
    for (let rd of raffles) {
        const s_rd = new RaffleDone();
        s_rd.id = rd.id;
        s_rd.era = BigInt(rd.era);
        s_rd.totalRewards = rd.totalRewards;
        s_rd.nbWinners = rd.nbWinners;
        s_rd.nbParticipants = rd.nbParticipants;
        s_rd.totalValue = rd.totalValue;
        await ctx.store.insert(s_rd);
    }

    /** FIX for backward compatibility of queries in dapp
     * in a former implementation of indexer we used different prefix for ink and substrate events
     * --> prefix 42 for ink part 
     * --> prefix 5  for substrate part 
     * 
     * this implementation uses prefix 5 everywhere
     * for backward compatibility we temporary want to have a copy of the Accounts entities, using prefix 42
     */

    // query again store for Accouts with all accounts_ids from other entities created this batch that affect Accounts
    // this time, all Accounts will be found in the store
    // we just create one new object and change the ID for prefix 42
    await ctx.store.findBy(Account, {id: In([...accounts_ids])}).then(async (accounts) => {
        for (let a of accounts) {
            const new_a = {...a};
            new_a.id = ss58.codec("substrate").encode(ss58.decode(a.id).bytes);
            await ctx.store.save(new Account(new_a));
        }
    })

})
/**
                                                                                                                                     
                                .::-----:.                   .::---::.                          
                                .------------:               :-----------:.                       
                            .----------------            .---------------:                      
                            .-------------------.         :------------------:                    
                        :----------------------        :---------------------:                  
                        :-------------------------      .------------------------:.               
                    .:---------------------------.     ----------------------------.             
                    -------------------------------    :------------------------------:           
                .--------------------------------:   ---------------------------------          
                .----------------------------------  :---------------------------------.         
                .----------------------------------. ----------------------------------:         
                -----------------------------------:----------------------------------.         
                --------------------------------------------------------------------:          
                    :-----------------------------------------------------------------.           
                    .------------------------------------------------------------:              
                        .:----------------------------------------------------:.                 
                            ..:------------------------------------------:..                     
                                ..:-------------------------------:.                           
                            ..::--------------------------------------::..                      
                        .:-----------------------------------------------------::.                
                    .:--------------------------------------------------------------:.            
                :-============-------------------------------------------------------:          
                -=====================================----------------------------------.        
                :===========================================================--------------        
                :=========================================================================.       
                :======================================-=================================-        
                -====================================- -===============================-         
                :-=============================-====- .==============================:          
                    :-==========================- ====-  :===========================-.           
                    .-=======================-  -===-   -========================-.             
                        :=====================-   :====    -======================:               
                        -==================-    .====.    -===================:                 
                        .================:      -===-     -================-                   
                            -=============.       .====      .-============-.                    
                            :-=======-:          -===-       .-========-.                      
                                .....             .====:          ....                          
                                                    :===-                                        
                                                    .                   

LLLLLLLLLLL            UUUUUUUU     UUUUUUUU       CCCCCCCCCCCCCKKKKKKKKK    KKKKKKKYYYYYYY       YYYYYYY
L:::::::::L            U::::::U     U::::::U    CCC::::::::::::CK:::::::K    K:::::KY:::::Y       Y:::::Y
L:::::::::L            U::::::U     U::::::U  CC:::::::::::::::CK:::::::K    K:::::KY:::::Y       Y:::::Y
LL:::::::LL            UU:::::U     U:::::UU C:::::CCCCCCCC::::CK:::::::K   K::::::KY::::::Y     Y::::::Y
  L:::::L               U:::::U     U:::::U C:::::C       CCCCCCKK::::::K  K:::::KKKYYY:::::Y   Y:::::YYY
  L:::::L               U:::::D     D:::::UC:::::C                K:::::K K:::::K      Y:::::Y Y:::::Y   
  L:::::L               U:::::D     D:::::UC:::::C                K::::::K:::::K        Y:::::Y:::::Y    
  L:::::L               U:::::D     D:::::UC:::::C                K:::::::::::K          Y:::::::::Y     
  L:::::L               U:::::D     D:::::UC:::::C                K:::::::::::K           Y:::::::Y      
  L:::::L               U:::::D     D:::::UC:::::C                K::::::K:::::K           Y:::::Y       
  L:::::L               U:::::D     D:::::UC:::::C                K:::::K K:::::K          Y:::::Y       
  L:::::L         LLLLLLU::::::U   U::::::U C:::::C       CCCCCCKK::::::K  K:::::KKK       Y:::::Y       
LL:::::::LLLLLLLLL:::::LU:::::::UUU:::::::U  C:::::CCCCCCCC::::CK:::::::K   K::::::K       Y:::::Y       
L::::::::::::::::::::::L UU:::::::::::::UU    CC:::::::::::::::CK:::::::K    K:::::K    YYYY:::::YYYY    
L::::::::::::::::::::::L   UU:::::::::UU        CCC::::::::::::CK:::::::K    K:::::K    Y:::::::::::Y    
LLLLLLLLLLLLLLLLLLLLLLLL     UUUUUUUUU             CCCCCCCCCCCCCKKKKKKKKK    KKKKKKK    YYYYYYYYYYYYY    
             
                             
 * 
 */

