import assert from 'assert'
import {Chain, ChainContext, EventContext, Event, Result, Option} from './support'
import * as v7 from './v7'
import * as v13 from './v13'
import * as v27 from './v27'
import * as v49 from './v49'

export class DappsStakingBondAndStakeEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'DappsStaking.BondAndStake')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     *  Account has bonded and staked funds on a smart contract.
     */
    get isV7(): boolean {
        return this._chain.getEventHash('DappsStaking.BondAndStake') === '042590a56807e3351faf948dab2a22fe138af945cd9e46b379a3f568ede79c4d'
    }

    /**
     *  Account has bonded and staked funds on a smart contract.
     */
    get asV7(): [Uint8Array, v7.SmartContract, bigint] {
        assert(this.isV7)
        return this._chain.decodeEvent(this.event)
    }
}

export class DappsStakingNewDappStakingEraEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'DappsStaking.NewDappStakingEra')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     *  New dapps staking era. Distribute era rewards to contracts.
     */
    get isV7(): boolean {
        return this._chain.getEventHash('DappsStaking.NewDappStakingEra') === '0a0f30b1ade5af5fade6413c605719d59be71340cf4884f65ee9858eb1c38f6c'
    }

    /**
     *  New dapps staking era. Distribute era rewards to contracts.
     */
    get asV7(): number {
        assert(this.isV7)
        return this._chain.decodeEvent(this.event)
    }
}

export class DappsStakingNominationTransferEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'DappsStaking.NominationTransfer')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Nomination part has been transfered from one contract to another.
     * 
     * \(staker account, origin smart contract, amount, target smart contract\)
     */
    get isV49(): boolean {
        return this._chain.getEventHash('DappsStaking.NominationTransfer') === '4f17bfdd591d68aa34974d9299444b19ef6280de57f99b635a5179ef61aa5173'
    }

    /**
     * Nomination part has been transfered from one contract to another.
     * 
     * \(staker account, origin smart contract, amount, target smart contract\)
     */
    get asV49(): [Uint8Array, v49.SmartContract, bigint, v49.SmartContract] {
        assert(this.isV49)
        return this._chain.decodeEvent(this.event)
    }
}

export class DappsStakingRewardEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'DappsStaking.Reward')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     *  Reward paid to staker.
     */
    get isV11(): boolean {
        return this._chain.getEventHash('DappsStaking.Reward') === '23bebce4ca9ed37548947d07d4dc50e772f07401b9a416b6aa2f3e9cb5adcaf4'
    }

    /**
     *  Reward paid to staker.
     */
    get asV11(): [Uint8Array, bigint] {
        assert(this.isV11)
        return this._chain.decodeEvent(this.event)
    }

    /**
     *  Reward paid to staker or developer.
     */
    get isV13(): boolean {
        return this._chain.getEventHash('DappsStaking.Reward') === '8893e04840c35675d9756bedd440cb2cf3490c1aaae0bd1f0204c2fbcab411c8'
    }

    /**
     *  Reward paid to staker or developer.
     */
    get asV13(): [Uint8Array, v13.SmartContract, number, bigint] {
        assert(this.isV13)
        return this._chain.decodeEvent(this.event)
    }
}

export class DappsStakingUnbondAndUnstakeEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'DappsStaking.UnbondAndUnstake')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Account has unbonded & unstaked some funds. Unbonding process begins.
     */
    get isV27(): boolean {
        return this._chain.getEventHash('DappsStaking.UnbondAndUnstake') === '042590a56807e3351faf948dab2a22fe138af945cd9e46b379a3f568ede79c4d'
    }

    /**
     * Account has unbonded & unstaked some funds. Unbonding process begins.
     */
    get asV27(): [Uint8Array, v27.SmartContract, bigint] {
        assert(this.isV27)
        return this._chain.decodeEvent(this.event)
    }
}
