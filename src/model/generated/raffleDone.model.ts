import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_} from "typeorm"
import * as marshal from "./marshal"

@Entity_()
export class RaffleDone {
    constructor(props?: Partial<RaffleDone>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    era!: bigint

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    totalRewards!: bigint

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    nbWinners!: bigint

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    nbParticipants!: bigint

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    totalValue!: bigint
}
