# Lucky squid

This is a squid for indexing Lucky dApp contracts, for the Astar, Shiden and Shibuya network.

Lucky dApp is available here: https://lucky.substrate.fi/

this index get events from substrate or !ink events on 3 different contract, you can found these contracts here: https://github.com/GuiGou12358/lucky-contracts/tree/main/contracts

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
sqd process

# 5. The command above will block the terminal
#    being busy with fetching the chain data, 
#    transforming and storing it in the target database.
#
#    To start the graphql server open the separate terminal
#    and run
sqd serve
```
