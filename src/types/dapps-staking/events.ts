import {sts, Block, Bytes, Option, Result, EventType, RuntimeCtx} from '../support'
import * as v7 from '../v7'
import * as v11 from '../v11'
import * as v13 from '../v13'
import * as v27 from '../v27'
import * as v49 from '../v49'

export const bondAndStake =  {
    name: 'DappsStaking.BondAndStake',
    /**
     *  Account has bonded and staked funds on a smart contract.
     */
    v7: new EventType(
        'DappsStaking.BondAndStake',
        sts.tuple([v7.AccountId, v7.SmartContract, v7.Balance])
    ),
}

export const newDappStakingEra =  {
    name: 'DappsStaking.NewDappStakingEra',
    /**
     *  New dapps staking era. Distribute era rewards to contracts.
     */
    v7: new EventType(
        'DappsStaking.NewDappStakingEra',
        v7.EraIndex
    ),
}

export const reward =  {
    name: 'DappsStaking.Reward',
    /**
     *  Reward paid to staker.
     */
    v11: new EventType(
        'DappsStaking.Reward',
        sts.tuple([v11.AccountId, v11.Balance])
    ),
    /**
     *  Reward paid to staker or developer.
     */
    v13: new EventType(
        'DappsStaking.Reward',
        sts.tuple([v13.AccountId, v13.SmartContract, v13.EraIndex, v13.Balance])
    ),
}

export const unbondAndUnstake =  {
    name: 'DappsStaking.UnbondAndUnstake',
    /**
     * Account has unbonded & unstaked some funds. Unbonding process begins.
     */
    v27: new EventType(
        'DappsStaking.UnbondAndUnstake',
        sts.tuple([v27.AccountId32, v27.SmartContract, sts.bigint()])
    ),
}

export const nominationTransfer =  {
    name: 'DappsStaking.NominationTransfer',
    /**
     * Nomination part has been transfered from one contract to another.
     * 
     * \(staker account, origin smart contract, amount, target smart contract\)
     */
    v49: new EventType(
        'DappsStaking.NominationTransfer',
        sts.tuple([v49.AccountId32, v49.SmartContract, sts.bigint(), v49.SmartContract])
    ),
}
