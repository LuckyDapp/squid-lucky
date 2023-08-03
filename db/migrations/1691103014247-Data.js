module.exports = class Data1691103014247 {
    name = 'Data1691103014247'

    async up(db) {
        await db.query(`CREATE TABLE "stake" ("id" character varying NOT NULL, "type" text NOT NULL, "amount" numeric NOT NULL, "era" numeric NOT NULL, "block_number" numeric NOT NULL, "account_id" character varying, CONSTRAINT "PK_8cfd82a65916af9d517d25a894e" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_48a0a4f6ef7ee7a7395cdce1a2" ON "stake" ("account_id") `)
        await db.query(`CREATE TABLE "reward" ("id" character varying NOT NULL, "era" numeric NOT NULL, "amount" numeric NOT NULL, "account_id" character varying, CONSTRAINT "PK_a90ea606c229e380fb341838036" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_4a8843fdb7840bfd00f8e4f7b3" ON "reward" ("account_id") `)
        await db.query(`CREATE TABLE "rewards_claimed" ("id" character varying NOT NULL, "amount" numeric NOT NULL, "block_number" numeric NOT NULL, "timestamp" text NOT NULL, "account_id" character varying, CONSTRAINT "PK_1cd951d72b1ba32f8ae09fe8dbd" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_40b47fbfeda6b6132002cf4762" ON "rewards_claimed" ("account_id") `)
        await db.query(`CREATE TABLE "account" ("id" character varying NOT NULL, "total_stake" numeric NOT NULL, "total_rewards" numeric NOT NULL, "total_claimed" numeric NOT NULL, "total_pending" numeric NOT NULL, CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id"))`)
        await db.query(`CREATE TABLE "developer_reward" ("id" character varying NOT NULL, "era" numeric NOT NULL, "amount" numeric NOT NULL, "account_id" character varying, CONSTRAINT "PK_22da28e4dc19dd82e6d45ce3e62" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_883d7277226a28633acff4c323" ON "developer_reward" ("account_id") `)
        await db.query(`CREATE TABLE "pallet_info" ("id" character varying NOT NULL, "current_era" numeric NOT NULL, CONSTRAINT "PK_892378654c486fc01b6c159d5d3" PRIMARY KEY ("id"))`)
        await db.query(`CREATE TABLE "dapp_staking_era" ("id" character varying NOT NULL, "era" numeric NOT NULL, "block_number" numeric NOT NULL, CONSTRAINT "PK_1faba99841e275ed6ec89bbd0c0" PRIMARY KEY ("id"))`)
        await db.query(`CREATE TABLE "raffle_done" ("id" character varying NOT NULL, "era" numeric NOT NULL, "total_rewards" numeric NOT NULL, "nb_winners" numeric NOT NULL, "nb_participants" numeric NOT NULL, "total_value" numeric NOT NULL, CONSTRAINT "PK_17cb8dc780006591d18c7c59558" PRIMARY KEY ("id"))`)
        await db.query(`ALTER TABLE "stake" ADD CONSTRAINT "FK_48a0a4f6ef7ee7a7395cdce1a2a" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "reward" ADD CONSTRAINT "FK_4a8843fdb7840bfd00f8e4f7b36" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "rewards_claimed" ADD CONSTRAINT "FK_40b47fbfeda6b6132002cf4762b" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "developer_reward" ADD CONSTRAINT "FK_883d7277226a28633acff4c323d" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    }

    async down(db) {
        await db.query(`DROP TABLE "stake"`)
        await db.query(`DROP INDEX "public"."IDX_48a0a4f6ef7ee7a7395cdce1a2"`)
        await db.query(`DROP TABLE "reward"`)
        await db.query(`DROP INDEX "public"."IDX_4a8843fdb7840bfd00f8e4f7b3"`)
        await db.query(`DROP TABLE "rewards_claimed"`)
        await db.query(`DROP INDEX "public"."IDX_40b47fbfeda6b6132002cf4762"`)
        await db.query(`DROP TABLE "account"`)
        await db.query(`DROP TABLE "developer_reward"`)
        await db.query(`DROP INDEX "public"."IDX_883d7277226a28633acff4c323"`)
        await db.query(`DROP TABLE "pallet_info"`)
        await db.query(`DROP TABLE "dapp_staking_era"`)
        await db.query(`DROP TABLE "raffle_done"`)
        await db.query(`ALTER TABLE "stake" DROP CONSTRAINT "FK_48a0a4f6ef7ee7a7395cdce1a2a"`)
        await db.query(`ALTER TABLE "reward" DROP CONSTRAINT "FK_4a8843fdb7840bfd00f8e4f7b36"`)
        await db.query(`ALTER TABLE "rewards_claimed" DROP CONSTRAINT "FK_40b47fbfeda6b6132002cf4762b"`)
        await db.query(`ALTER TABLE "developer_reward" DROP CONSTRAINT "FK_883d7277226a28633acff4c323d"`)
    }
}
