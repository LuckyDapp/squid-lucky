import {sts, Result, Option, Bytes, BitSequence} from './support'

export const EraIndex = sts.number()

export const Balance = sts.bigint()

export const SmartContract: sts.Type<SmartContract> = sts.closedEnum(() => {
    return  {
        Evm: H160,
        Wasm: AccountId,
    }
})

export const H160 = sts.bytes()

export type SmartContract = SmartContract_Evm | SmartContract_Wasm

export interface SmartContract_Evm {
    __kind: 'Evm'
    value: H160
}

export interface SmartContract_Wasm {
    __kind: 'Wasm'
    value: AccountId
}

export type AccountId = Bytes

export type H160 = Bytes

export const AccountId = sts.bytes()
