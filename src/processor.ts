import { lookupArchive } from "@subsquid/archive-registry"
import * as ss58 from "@subsquid/ss58"
import {toHex, decodeHex} from "@subsquid/util-internal-hex"
import {BatchContext, BatchProcessorItem, SubstrateBatchProcessor} from "@subsquid/substrate-processor"
import {Store, TypeormDatabase} from "@subsquid/typeorm-store"
import {In} from "typeorm"

import * as lucky_raffle from "./abi/lucky_raffle"
import * as reward_manager from "./abi/reward_manager"

import {Account} from "./model/generated"
 
const database = new TypeormDatabase();
type Item = BatchProcessorItem<typeof ink_processor>
type Ctx = BatchContext<Store, Item>
type Context = BatchContext<Store, Item>;

const network = "shibuya";
const start_block = {"shibuya":3_964_500}

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
    amount: bigint
    //era: bigint
    blockNumber: bigint
}

async function getStoreAccounts(ctx:Ctx, accountIds:Set<string>){
    let accounts = await ctx.store.findBy(Account, {id: In([...accountIds])}).then(accounts => {
        return new Map(accounts.map(a => [a.id, a]))
    })
}
function getAccount(m: Map<string, Account>, id: string): Account {
    let acc = m.get(id)
    if (acc == null) {
        acc = new Account()
        acc.id = id
        m.set(id, acc)
    }
    return acc
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
                /*
                if (event.__kind === 'Transfer') {
                    records.push({
                        id: item.event.id,
                        from: event.from && ss58.codec(SS58_PREFIX).encode(event.from),
                        to: event.to && ss58.codec(SS58_PREFIX).encode(event.to),
                        amount: event.value,
                        block: block.header.height,
                        timestamp: new Date(block.header.timestamp)
                    })
                }*/

            }
            if (item.name === 'Contracts.ContractEmitted' && item.event.args.contract === RAFFLE_CONTRACT_ADDRESS) {
                const data = item.event.args.data;
                const event = lucky_raffle.decodeEvent(data)
                console.log(RAFFLE_CONTRACT_ADDRESS,event.__kind)
                /*
                if (event.__kind === 'Transfer') {
                    records.push({
                        id: item.event.id,
                        from: event.from && ss58.codec(SS58_PREFIX).encode(event.from),
                        to: event.to && ss58.codec(SS58_PREFIX).encode(event.to),
                        amount: event.value,
                        block: block.header.height,
                        timestamp: new Date(block.header.timestamp)
                    })
                }*/

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
            from: start_block[network]
        }
    } as const)

substrate_processor.run(database, async (ctx) => {
    // Process txs with dedicated fn
    const stakes: StakeRecord[] = [];
    for (const block of ctx.blocks) {
        //console.log("block",block);
        for (const item of block.items) {
            if (((item.name === "DappsStaking.BondAndStake"))){
                if (item.event.args[1].value === '0x5a91a4a61aaf75a2d8ad377339412bbcaf56898db47201da577a49503956e93f') {
                    
                    
                    const tx_from = ss58.codec("astar").encode(decodeHex(item.event.args[0]));
                    //const tx_to = ss58.codec("astar").encode(decodeHex(item.event.args[1].value));
                    //console.log(item,tx_from);
                    stakes.push({
                        id: item.event.id,  
                        account: tx_from,
                        amount: BigInt(item.event.args[2]),
                        //era: bigint
                        blockNumber: BigInt(block.header.height)
                    })
                }
            }
        }
    }
    console.log("stakes",stakes);
})

