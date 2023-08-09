# Lucky squid

This is a squid for indexing Lucky dApp contracts, for the Astar, Shiden and Shibuya network.

Lucky dApp is available here: https://lucky.substrate.fi/

this index get events from substrate or !ink events on 3 different contract, you can found these contracts here: [https://github.com/GuiGou12358/lucky-contracts/tree/main/contracts]()

## Event list

- dapps_staking_developer (substrate events)
  - DappsStaking.BondAndStake
  - DappsStaking.UnbondAndUnstake
  - DappsStaking.NominationTransfer
  - DappsStaking.Reward
  - DappsStaking.NewDappStakingEra
- lucky_raffle (!ink event)
  - RaffleDone
- reward_manager (!ink event)
  - PendingReward
  - RewardsClaimed

check [processor.ts](src/processor.ts) for events handling

## Query

#### Accounts

Get informations from a specific account

```
{
  accountById(id: "WAs...z4f") {
    totalClaimed
    totalPending
    totalRewards
    totalStake
    id
  }
}
```

Get the 10 accounts with the higher stake amount

```
{
  accounts(limit: 10, orderBy: totalStake_DESC) {
    id
    totalStake
  }
}
```

All Accounts with pending rewards

```
{
  accounts(where: {totalPending_gt: "0"}) {
    totalPending
    id
  }
}
```

#### Stakes

Last 100 stake activity

```
{
  stakes(limit: 100, orderBy: blockNumber_DESC) {
    amount
    blockNumber
    era
    type
    account {
      id
    }
  }
}
```

Note that the stake entity store stake, unstake, and transfer activity
This is specified in the 'type' field

#### Rewards

last 100 Rewards won from the raffle contract

```
{
  rewards(limit: 100, orderBy: era_DESC) {
    account {
      id
    }
    amount
    era
  }
}
```

#### RewardsClaimed

Last 100 rewardsClaimed by raffle winners

```
{
  rewardsClaimeds(limit: 100, orderBy: timestamp_DESC) {
    account {
      id
    }
    amount
    blockNumber
    timestamp
  }
}
```

#### DeveloperRewards

Last 10 DeveloperRewards distributed to developer address

```
{
  developerRewards(limit: 10, orderBy: era_DESC) {
    amount
    era
  }
}
```

## Quickstart

Dependencies: Node.js, Docker.

```bash
# 0. Install @subsquid/cli a.k.a. the sqd command globally
npm i -g @subsquid/cli

# 1. clone the repo
git clone https://github.com/LuckyDapp/squid-lucky
cd squid-lucky

# 2. Install dependencies
npm ci

# 3. Start a Postgres database container and detach
sqd up

# 4. Start the processor
#    default network is shibuya
#    to change it, set NETWORK in .env 
#    or manually change `network` var default value in processor.ts
sqd process

# 5. The command above will block the terminal
#    being busy with fetching the chain data, 
#    transforming and storing it in the target database.
#
#    To start the graphql server open the separate terminal
#    and run
sqd serve
```

## Deploy

current available networks are Shibuya and Shiden
to deploy a version on a network, use the corresponding yml file when deploying

eg, for shiden:
`sqd deploy -m squid-shiden.yaml .`

the deployed index for production can be found here:

- https://squid.subsquid.io/squid-lucky-shibuya/graphql
- https://squid.subsquid.io/squid-lucky-shiden/graphql
