import { lookupArchive } from "@subsquid/archive-registry"
import * as ss58 from "@subsquid/ss58"
import {toHex, decodeHex} from "@subsquid/util-internal-hex"
import {BatchContext, BatchProcessorItem, SubstrateBatchProcessor} from "@subsquid/substrate-processor"
import {Store, TypeormDatabase} from "@subsquid/typeorm-store"
import {Like, In} from "typeorm"
import {DappsStakingBondAndStakeEvent, DappsStakingNewDappStakingEraEvent, DappsStakingNominationTransferEvent, DappsStakingRewardEvent, DappsStakingUnbondAndUnstakeEvent} from "./types/events"

import * as lucky_raffle from "./abi/lucky_raffle"
import * as reward_manager from "./abi/reward_manager"

import {Account, DappStakingEra, DeveloperReward, Reward, Stake} from "./model/generated"
import { SmartContract } from "./types/v7"
 
const database = new TypeormDatabase();
type Item = BatchProcessorItem<typeof ink_processor>
type Ctx = BatchContext<Store, Item>
type Context = BatchContext<Store, Item>;

const network = "shibuya";
const start_block = {"shibuya":3_393_298}

interface AccountRecord {
    id: string  
    totalStake: bigint
    totalRewards: bigint // claimed + pending
    totalClaimed: bigint
    totalPending: bigint
}

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

/*async function getStoreAccounts(ctx:Ctx, accountIds:Set<string>){
    let accounts = await ctx.store.findBy(Account, {id: In([...accountIds])}).then(accounts => {
        return new Map(accounts.map(a => [a.id, a]))
    })
}*/
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

function getEra(m: Map<string, DappStakingEra>, id: string): DappStakingEra {
    let e = m.get(id)
    if (e == null) {
        e = new DappStakingEra()
        e.id = id
        m.set(id, e)
    }
    return e
}

function getStake(m: Map<string, Stake>, id: string): Stake {
    let e = m.get(id)
    if (e == null) {
        e = new Stake()
        e.id = id
        m.set(id, e)
    }
    return e
}

function getDevelopperReward(m: Map<string, DeveloperReward>, id: string): DeveloperReward {
    let e = m.get(id)
    if (e == null) {
        e = new DeveloperReward()
        e.id = id
        m.set(id, e)
    }
    return e
}

/************* */
/* INK INDEXER */
/************* */

const RAFFLE_CONTRACT_ADDRESS_SS58 = 'arobt7C1EEULtwsVhxSQnjA5ajrTsZnUBBU5fJV7z356Sp7' // Shibuya
const RAFFLE_CONTRACT_ADDRESS = toHex(ss58.decode(RAFFLE_CONTRACT_ADDRESS_SS58).bytes)
console.log("hex raffle address",RAFFLE_CONTRACT_ADDRESS)
const RAFFLE_SS58_PREFIX = ss58.decode(RAFFLE_CONTRACT_ADDRESS_SS58).prefix

const REWARD_CONTRACT_ADDRESS_SS58 = 'WDtNnQgygsCXKfjdvL5TgimewWhcBhJgSSCkb5u5pzZJTpR' // Shibuya
const REWARD_CONTRACT_ADDRESS = toHex(ss58.decode(REWARD_CONTRACT_ADDRESS_SS58).bytes)
console.log("hex reward address",REWARD_CONTRACT_ADDRESS)
const REWARD_SS58_PREFIX = ss58.decode(REWARD_CONTRACT_ADDRESS_SS58).prefix

const DAPP_CONTRACT_ADDRESS_SS58 = 'Xz3sHvmRgRY3mt3qQ3SjZ3aUPQTfHkj4rKeoQM6VJrenD3W'
const DAPP_CONTRACT_ADDRESS = toHex(ss58.decode(DAPP_CONTRACT_ADDRESS_SS58).bytes)
console.log("hex dapp address",DAPP_CONTRACT_ADDRESS)
const DAPP_SS58_PREFIX = ss58.decode(DAPP_CONTRACT_ADDRESS_SS58).prefix

const DEVELOPPER_ADDRESS_SS58 = 'WayJSoeDvHLJ8rXPqrPyQQwznntbxvjwvmq1AKBpu9phYHr'
const DEVELOPPER_ADDRESS = toHex(ss58.decode(DEVELOPPER_ADDRESS_SS58).bytes)
console.log("hex devp address",DEVELOPPER_ADDRESS)
const DEVELOPPER_ADDRESS_PREFIX = ss58.decode(DEVELOPPER_ADDRESS_SS58).prefix

// Create instance of processor
const ink_processor = new SubstrateBatchProcessor()
    // connect to shibuya archive  
    .setDataSource({
        archive: lookupArchive(network, { release: "FireSquid" })
    })
    // Subscribe to our contract
    .addContractsContractEmitted(REWARD_CONTRACT_ADDRESS, {
        data: {
            event: {args: true}
        },
        range: {
            from: start_block[network]
        }
    } as const)
    .addContractsContractEmitted(RAFFLE_CONTRACT_ADDRESS, {
        data: {
            event: {args: true}
        },
        range: {
            from: start_block[network]
        }
    } as const)
    
/*
ink_processor.run(database, async ctx => {
    // Process txs with dedicated fn
    const txs = inkExtractAccountRecords(ctx)
})*/

function inkExtractAccountRecords(ctx: Ctx): AccountRecord[] {
    const records: AccountRecord[] = []
    for (const block of ctx.blocks) {
        //console.log("block",block)
        for (const item of block.items) {
            //console.log("item",item)
            if (item.name === 'Contracts.ContractEmitted' && item.event.args.contract === REWARD_CONTRACT_ADDRESS) {
                const data = item.event.args.data;
                const event = reward_manager.decodeEvent(data)
                console.log(REWARD_CONTRACT_ADDRESS,event.__kind)
               
                if (event.__kind === 'PendingReward') {
                   
                }
                if (event.__kind === 'RewardsClaimed') {
                   
                }

            }
            if (item.name === 'Contracts.ContractEmitted' && item.event.args.contract === RAFFLE_CONTRACT_ADDRESS) {
                const data = item.event.args.data;
                const event = lucky_raffle.decodeEvent(data)
                console.log(RAFFLE_CONTRACT_ADDRESS,event.__kind)
                
                if (event.__kind === 'RaffleDone') {
                   
                }

            }
        }
    }
    return records
}


/******************* */
/* SUBSTRATE INDEXER */
/******************* */

const substrate_runtime_events = [
    "DappsStaking.BondAndStake",
    "DappsStaking.UnbondAndUnstake",
    "DappsStaking.NominationTransfer",
    "DappsStaking.Reward",
    "DappsStaking.NewDappStakingEra"
];

export const substrate_processor = new SubstrateBatchProcessor()
    .setDataSource({
        archive: lookupArchive(network, {release: 'FireSquid'}),
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
            from: start_block[network]
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
            from: start_block[network]
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
            from: start_block[network]
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
            from: start_block[network]
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

substrate_processor.run(database, async (ctx) => {
    // Process txs with dedicated fn
    const eras: DappStakingEraRecord[] = []
    const stakes: StakeRecord[] = [];
    const accounts: AccountRecord[] = [];
    const developper_rewards: DevelopperRewardRecord[] = [];

    const last_era = await ctx.store.findOne(DappStakingEra,{
        where: {
            id: Like("%"),
        },
        order: {
            era: "DESC",
        },
    })
    let current_era: bigint = BigInt(last_era ? last_era.era : 0);

    for (const block of ctx.blocks) {
        
        //console.log("block",block);
        for (const item of block.items) {
            if (((item.name === "DappsStaking.NewDappStakingEra"))){
                //const e = new DappsStakingNewDappStakingEraEvent(ctx,item.event)
                //let obj = e.asV7;
                //console.log("NewDappStakingEra",item.event)
                const era = {
                    id: item.event.id,
                    era: BigInt(item.event.args),
                    blockNumber: BigInt(block.header.height)
                }
                eras.push(era)
                current_era = era.era;
                //await ctx.store.insert(new DappStakingEra(era))
            }

            if (((item.name === "DappsStaking.BondAndStake"))){
                const e = new DappsStakingBondAndStakeEvent(ctx,item.event);
                let rec :{account: Uint8Array, contract: SmartContract, amount: bigint}
                let [account, contract, amount] = e.asV7;
                rec={account, contract, amount}
                
                if (item.event.args[1].value === DAPP_CONTRACT_ADDRESS) { // 0x5a91a4a61aaf75a2d8ad377339412bbcaf56898db47201da577a49503956e93f
                    /*console.log(
                        "account",ss58.codec("astar").encode(account),
                        "contract",ss58.codec("astar").encode(contract.value),
                        "amount",amount)
                    */
                    const tx_from = ss58.codec("astar").encode(decodeHex(item.event.args[0]));
                    const stake = {
                        id: item.event.id,  
                        account: tx_from,
                        amount: BigInt(item.event.args[2]),
                        type: "stake",
                        era: current_era,
                        blockNumber: BigInt(block.header.height)
                    }
                    stakes.push(stake)
                }
            }
            if (((item.name === "DappsStaking.UnbondAndUnstake"))){
                const e = new DappsStakingUnbondAndUnstakeEvent(ctx,item.event);
                let rec :{account: Uint8Array, contract: SmartContract, amount: bigint}
                let [account, contract, amount] = e.asV27;
                rec={account, contract, amount}
                
                if (item.event.args[1].value === DAPP_CONTRACT_ADDRESS) { // 0x5a91a4a61aaf75a2d8ad377339412bbcaf56898db47201da577a49503956e93f
                    /*console.log(
                        "account",ss58.codec("astar").encode(account),
                        "contract",ss58.codec("astar").encode(contract.value),
                        "amount",amount)
                    */
                    const tx_from = ss58.codec("astar").encode(decodeHex(item.event.args[0]));
                    const stake = {
                        id: item.event.id,  
                        account: tx_from,
                        amount: BigInt(0) - BigInt(item.event.args[2]),
                        type: "unstake",
                        era: current_era,
                        blockNumber: BigInt(block.header.height)
                    }
                    stakes.push(stake)
                }
            }

            if (((item.name === "DappsStaking.NominationTransfer"))){
                const e = new DappsStakingNominationTransferEvent(ctx,item.event);
                let rec :{account: Uint8Array, origin: SmartContract, amount: bigint, target: SmartContract}
                let [account, origin, amount, target] = e.asV49;
                rec={account, origin, amount, target}
                const is_target = toHex(target.value) === DAPP_CONTRACT_ADDRESS
                const is_origin = toHex(origin.value) === DAPP_CONTRACT_ADDRESS

                if (is_origin || is_target) {
                    const tx_from = ss58.codec("astar").encode(account);
                    const stake = {
                        id: item.event.id,  
                        account: tx_from,
                        amount: is_target ? BigInt(0) + BigInt(amount) : BigInt(0) - BigInt(amount) ,
                        type: "transfer",
                        era: current_era,
                        blockNumber: BigInt(block.header.height)
                    }
                    stakes.push(stake)
                }
            }

            /* Subtrate event reward
            we only track DevelopperRewards, 
            so we check if dest account is our developper account
            */
            if (((item.name === "DappsStaking.Reward"))){
                const e = new DappsStakingRewardEvent(ctx,item.event);
                let rec :{account: Uint8Array, contract: SmartContract, era: number,  amount: bigint}
                let [account, contract, era, amount ] = e.asV13;
                rec={account, contract, era, amount}
                
                //console.log("DappsStaking.Reward","account",account, "contract", contract, "era", era, "amount", amount)

                const is_developper = ss58.codec("astar").encode(account) === DEVELOPPER_ADDRESS_SS58;
                const is_contract = toHex(contract.value) === DAPP_CONTRACT_ADDRESS;

                if ( is_developper && is_contract) {
                        /*
                        console.log(
                        "account",ss58.codec("astar").encode(account),
                        "contract",ss58.codec("astar").encode(contract.value),
                        "era",era,
                        "amount",amount)
                        */
                    const developper_reward = {
                        id: item.event.id,  
                        account: ss58.codec("astar").encode(account),
                        era: current_era,
                        amount: BigInt(amount),
                    }
                    developper_rewards.push(developper_reward)
                }
            }
        }
    }

    /********* ERAS ********/
    // Insert All eras (no update)
    for (let e of eras) {
        await ctx.store.insert(new DappStakingEra(e))
    }
    
    /********* ACCOUNTS ********/
    // find all accounts from stakes
    let accounts_ids = new Set<string>()
    for (let s of stakes) {
        accounts_ids.add(s.account)
    }
    // find all accounts from DevelopperRewards
    for (let d of developper_rewards) {
        accounts_ids.add(d.account)
    }
    // get accounts from store that match accounts from stakes or dr
    let store_accounts = await ctx.store.findBy(Account, {id: In([...accounts_ids])}).then(accounts => {
        return new Map(accounts.map(a => [a.id, a]))
    })

    /********* STAKES ********/
    // find all stake ids
    let stakes_ids = new Set<string>()
    for (let s of stakes) {
        stakes_ids.add(s.id)
    }
    // get stakes from store with all the ids
    let store_stakes = await ctx.store.findBy(Stake, {id: In([...stakes_ids])}).then(stakes => {
        return new Map(stakes.map(s => [s.id, s]))
    })
    // loop over all stakes entries 
    // update stakes with existing Account obj or new obj (in fn getAccount)
    // save obj
    for (let s of stakes) {
        const s_s = getStake(store_stakes,s.id)
        s_s.amount = s.amount;
        s_s.type = s.type;
        s_s.era = BigInt(s.era);
        s_s.blockNumber = s.blockNumber;
        s_s.account = getAccount(store_accounts,s.account);
        s_s.account.totalStake = s_s.account.totalStake + s.amount;
        await ctx.store.save(s_s.account)
        await ctx.store.save(s_s)
    }

    /********* DEV REWARDS ********/
    // find all dr ids
    let dr_ids = new Set<string>()
    for (let d of developper_rewards) {
        dr_ids.add(d.id)
    }
    // get dr from store with all the ids
    let store_dr = await ctx.store.findBy(DeveloperReward, {id: In([...dr_ids])}).then(dr => {
        return new Map(dr.map(d => [d.id, d]))
    })
    // loop over all dr entries 
    // update dr with existing obj or new obj
    // save obj
    for (let dr of developper_rewards) {
        const s_dr = getDevelopperReward(store_dr,dr.id)
        s_dr.era = dr.era
        s_dr.amount = dr.amount
        s_dr.account = getAccount(store_accounts,dr.account);
        await ctx.store.save(s_dr.account)
        await ctx.store.save(s_dr)
    }
})

