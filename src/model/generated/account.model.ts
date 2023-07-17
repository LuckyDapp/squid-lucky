import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, OneToMany as OneToMany_} from "typeorm"
import * as marshal from "./marshal"
import {Stake} from "./stake.model"
import {Reward} from "./reward.model"
import {RewardsClaimed} from "./rewardsClaimed.model"

@Entity_()
export class Account {
    constructor(props?: Partial<Account>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @OneToMany_(() => Stake, e => e.account)
    stakes!: Stake[]

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    totalStake!: bigint

    @OneToMany_(() => Reward, e => e.account)
    rewards!: Reward[]

    @OneToMany_(() => RewardsClaimed, e => e.account)
    rewardsClaimed!: RewardsClaimed[]

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    totalRewards!: bigint

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    totalClaimed!: bigint

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    totalPending!: bigint
}
