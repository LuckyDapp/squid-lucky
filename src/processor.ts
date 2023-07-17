import { lookupArchive } from "@subsquid/archive-registry"
import * as ss58 from "@subsquid/ss58"
import {toHex} from "@subsquid/util-internal-hex"
import {BatchContext, BatchProcessorItem, SubstrateBatchProcessor} from "@subsquid/substrate-processor"
import {Store, TypeormDatabase} from "@subsquid/typeorm-store"
import {In} from "typeorm"

import * as lucky_raffle from "./abi/lucky_raffle"
import * as reward_manager from "./abi/reward_manager"

import {Account} from "./model/generated"
 
/*
const RAFFLE_CONTRACT_ADDRESS_SS58 = 'Xz3sHvmRgRY3mt3qQ3SjZ3aUPQTfHkj4rKeoQM6VJrenD3W' // Shibuya
const RAFFLE_CONTRACT_ADDRESS = toHex(ss58.decode(RAFFLE_CONTRACT_ADDRESS_SS58).bytes)
const RAFFLE_SS58_PREFIX = ss58.decode(RAFFLE_CONTRACT_ADDRESS_SS58).prefix
*/

const REWARD_CONTRACT_ADDRESS_SS58 = 'WDtNnQgygsCXKfjdvL5TgimewWhcBhJgSSCkb5u5pzZJTpR' // Shibuya
const REWARD_CONTRACT_ADDRESS = toHex(ss58.decode(REWARD_CONTRACT_ADDRESS_SS58).bytes)
const REWARD_SS58_PREFIX = ss58.decode(REWARD_CONTRACT_ADDRESS_SS58).prefix


// Create instance of processor
const processor = new SubstrateBatchProcessor()
    // connect to shibuya archive  
    .setDataSource({
        archive: lookupArchive("shibuya", { release: "FireSquid" })
    })
    // Subscribe to our contract
    .addContractsContractEmitted(REWARD_CONTRACT_ADDRESS, {
        data: {
            event: {args: true}
        },
        range: {
            from: 3000000
        }
    } as const)
    /*
    .addContractsContractEmitted(REWARD_CONTRACT_ADDRESS, {
        data: {
            event: {args: true}
        }
    } as const)
    */
 
type Item = BatchProcessorItem<typeof processor>
type Ctx = BatchContext<Store, Item>

processor.run(new TypeormDatabase(), async ctx => {
    
    // Process txs with dedicated fn
    const txs = extractAccountRecords(ctx)
 
})
 
interface AccountRecord {
    id: string  
    totalStake: bigint
    totalRewards: bigint // claimed + pending
    totalClaimed: bigint
    totalPending: bigint
}
 
function extractAccountRecords(ctx: Ctx): AccountRecord[] {
    const records: AccountRecord[] = []
    for (const block of ctx.blocks) {
        console.log("block",block)
        for (const item of block.items) {
            console.log("item",item)
            if (item.name === 'Contracts.ContractEmitted' && item.event.args.contract === REWARD_CONTRACT_ADDRESS) {
                const data = item.event.args.data;
                const event = lucky_raffle.decodeEvent(data)
                console.log("event",event)
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

