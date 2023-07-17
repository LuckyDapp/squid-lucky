import {Abi, encodeCall, decodeResult} from "@subsquid/ink-abi"

export const metadata = {
  "source": {
    "hash": "0x6411ca08feb72feed218c91ebb3c03e05eee6b033f6a712d4a266469dbcb6493",
    "language": "ink! 4.2.0",
    "compiler": "rustc 1.69.0-nightly",
    "build_info": {
      "build_mode": "Release",
      "cargo_contract_version": "2.0.1",
      "rust_toolchain": "nightly-x86_64-unknown-linux-gnu",
      "wasm_opt_settings": {
        "keep_debug_symbols": false,
        "optimization_passes": "Z"
      }
    }
  },
  "contract": {
    "name": "lucky_raffle",
    "version": "0.2.0",
    "authors": [
      "guigou"
    ]
  },
  "spec": {
    "constructors": [
      {
        "args": [
          {
            "label": "dapps_staking_developer_address",
            "type": {
              "displayName": [
                "AccountId"
              ],
              "type": 3
            }
          },
          {
            "label": "random_generator_address",
            "type": {
              "displayName": [
                "AccountId"
              ],
              "type": 3
            }
          },
          {
            "label": "reward_manager_address",
            "type": {
              "displayName": [
                "AccountId"
              ],
              "type": 3
            }
          }
        ],
        "default": false,
        "docs": [],
        "label": "new",
        "payable": false,
        "returnType": {
          "displayName": [
            "ink_primitives",
            "ConstructorResult"
          ],
          "type": 11
        },
        "selector": "0x9bae9d5e"
      }
    ],
    "docs": [],
    "environment": {
      "accountId": {
        "displayName": [
          "AccountId"
        ],
        "type": 3
      },
      "balance": {
        "displayName": [
          "Balance"
        ],
        "type": 6
      },
      "blockNumber": {
        "displayName": [
          "BlockNumber"
        ],
        "type": 8
      },
      "chainExtension": {
        "displayName": [
          "ChainExtension"
        ],
        "type": 45
      },
      "hash": {
        "displayName": [
          "Hash"
        ],
        "type": 43
      },
      "maxEventTopics": 4,
      "timestamp": {
        "displayName": [
          "Timestamp"
        ],
        "type": 44
      }
    },
    "events": [
      {
        "args": [
          {
            "docs": [],
            "indexed": true,
            "label": "contract",
            "type": {
              "displayName": [
                "AccountId"
              ],
              "type": 3
            }
          },
          {
            "docs": [],
            "indexed": true,
            "label": "era",
            "type": {
              "displayName": [
                "u32"
              ],
              "type": 8
            }
          },
          {
            "docs": [],
            "indexed": false,
            "label": "pending_rewards",
            "type": {
              "displayName": [
                "Balance"
              ],
              "type": 6
            }
          },
          {
            "docs": [],
            "indexed": false,
            "label": "nb_winners",
            "type": {
              "displayName": [
                "u16"
              ],
              "type": 0
            }
          },
          {
            "docs": [],
            "indexed": false,
            "label": "nb_participants",
            "type": {
              "displayName": [
                "u16"
              ],
              "type": 0
            }
          },
          {
            "docs": [],
            "indexed": false,
            "label": "total_value",
            "type": {
              "displayName": [
                "Balance"
              ],
              "type": 6
            }
          }
        ],
        "docs": [
          "Event emitted when the Rafle is done"
        ],
        "label": "RaffleDone"
      }
    ],
    "lang_error": {
      "displayName": [
        "ink",
        "LangError"
      ],
      "type": 12
    },
    "messages": [
      {
        "args": [
          {
            "label": "participants",
            "type": {
              "displayName": [
                "Vec"
              ],
              "type": 13
            }
          }
        ],
        "default": false,
        "docs": [
          " add participants in the raffle and applied the filters",
          " a participant with a weight higher than another participant will have normally more chance to be selected in the raffle",
          " weight can represent the number of raffle tickets for this participant.",
          " weight can also represent the amount staked in dAppStaking, ..."
        ],
        "label": "add_participants_with_filters",
        "mutates": true,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 15
        },
        "selector": "0xfda0f140"
      },
      {
        "args": [
          {
            "label": "era",
            "type": {
              "displayName": [
                "u32"
              ],
              "type": 8
            }
          },
          {
            "label": "rewards",
            "type": {
              "displayName": [
                "Balance"
              ],
              "type": 6
            }
          }
        ],
        "default": false,
        "docs": [],
        "label": "run_raffle",
        "mutates": true,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 15
        },
        "selector": "0xe2b0a726"
      },
      {
        "args": [],
        "default": false,
        "docs": [],
        "label": "get_role_raffle_manager",
        "mutates": false,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 23
        },
        "selector": "0xa528dbca"
      },
      {
        "args": [],
        "default": false,
        "docs": [],
        "label": "get_role_participant_manager",
        "mutates": false,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 23
        },
        "selector": "0xeffbebd9"
      },
      {
        "args": [],
        "default": false,
        "docs": [],
        "label": "get_role_participant_filter_manager",
        "mutates": false,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 23
        },
        "selector": "0xca6d2b33"
      },
      {
        "args": [
          {
            "label": "address",
            "type": {
              "displayName": [
                "AccountId"
              ],
              "type": 3
            }
          }
        ],
        "default": false,
        "docs": [],
        "label": "set_dapps_staking_developer_address",
        "mutates": true,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 15
        },
        "selector": "0xb845797e"
      },
      {
        "args": [],
        "default": false,
        "docs": [],
        "label": "get_dapps_staking_developer_address",
        "mutates": true,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 24
        },
        "selector": "0xeb967e60"
      },
      {
        "args": [
          {
            "label": "address",
            "type": {
              "displayName": [
                "AccountId"
              ],
              "type": 3
            }
          }
        ],
        "default": false,
        "docs": [],
        "label": "set_random_generator_address",
        "mutates": true,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 15
        },
        "selector": "0x8895388e"
      },
      {
        "args": [],
        "default": false,
        "docs": [],
        "label": "get_random_generator_address",
        "mutates": true,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 24
        },
        "selector": "0xcfa0d403"
      },
      {
        "args": [
          {
            "label": "address",
            "type": {
              "displayName": [
                "AccountId"
              ],
              "type": 3
            }
          }
        ],
        "default": false,
        "docs": [],
        "label": "set_reward_manager_address",
        "mutates": true,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 15
        },
        "selector": "0xec03e31d"
      },
      {
        "args": [],
        "default": false,
        "docs": [],
        "label": "get_reward_manager_address",
        "mutates": true,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 24
        },
        "selector": "0x26685ebb"
      },
      {
        "args": [
          {
            "label": "new_code_hash",
            "type": {
              "displayName": [],
              "type": 4
            }
          }
        ],
        "default": false,
        "docs": [],
        "label": "upgrade_contract",
        "mutates": true,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 15
        },
        "selector": "0x1345543d"
      },
      {
        "args": [
          {
            "label": "value",
            "type": {
              "displayName": [
                "Balance"
              ],
              "type": 6
            }
          }
        ],
        "default": false,
        "docs": [],
        "label": "withdraw",
        "mutates": true,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 15
        },
        "selector": "0x410fcc9d"
      },
      {
        "args": [
          {
            "label": "participants",
            "type": {
              "displayName": [
                "participantmanager_external",
                "AddParticipantsInput1"
              ],
              "type": 13
            }
          }
        ],
        "default": false,
        "docs": [
          " add participants in the raffle",
          " a participant with a weight higher than another participant will have normally more chance to be selected in the raffle",
          " weight can represent the number of raffle tickets for this participant.",
          " weight can also represent the amount staked in dAppStaking, ..."
        ],
        "label": "ParticipantManager::add_participants",
        "mutates": true,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 26
        },
        "selector": "0xb94a7c71"
      },
      {
        "args": [],
        "default": false,
        "docs": [
          " Clear the data (participants and rewards)"
        ],
        "label": "ParticipantManager::clear_data",
        "mutates": true,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 26
        },
        "selector": "0x37df64b1"
      },
      {
        "args": [],
        "default": false,
        "docs": [],
        "label": "ParticipantManager::get_nb_participants",
        "mutates": false,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 28
        },
        "selector": "0x2c728b9e"
      },
      {
        "args": [
          {
            "label": "page",
            "type": {
              "displayName": [
                "participantmanager_external",
                "GetParticipantsInput1"
              ],
              "type": 5
            }
          }
        ],
        "default": false,
        "docs": [],
        "label": "ParticipantManager::get_participants",
        "mutates": false,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 29
        },
        "selector": "0x95499dd4"
      },
      {
        "args": [],
        "default": false,
        "docs": [],
        "label": "ParticipantManager::get_total_value",
        "mutates": false,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 31
        },
        "selector": "0x5575fa1d"
      },
      {
        "args": [
          {
            "label": "weight",
            "type": {
              "displayName": [
                "participantmanager_external",
                "GetParticipantInput1"
              ],
              "type": 6
            }
          }
        ],
        "default": false,
        "docs": [],
        "label": "ParticipantManager::get_participant",
        "mutates": false,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 24
        },
        "selector": "0x58038889"
      },
      {
        "args": [
          {
            "label": "ratio",
            "type": {
              "displayName": [
                "raffle_external",
                "SetRatioDistributionInput1"
              ],
              "type": 7
            }
          },
          {
            "label": "total_ratio",
            "type": {
              "displayName": [
                "raffle_external",
                "SetRatioDistributionInput2"
              ],
              "type": 6
            }
          }
        ],
        "default": false,
        "docs": [
          " Set the rate sharing by the winners",
          " First winner will receive : total_rewards * ratio[0] / total_ratio",
          " Second winner will receive : total_rewards * ratio[1] / total_ratio",
          " if ratio[n] equals to zero or is empty, tne winner n will receive nothing",
          " Sum(ratio[i]) <= total_ratio. Otherwise teh error IncorrectRatio is expected"
        ],
        "label": "Raffle::set_ratio_distribution",
        "mutates": true,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 32
        },
        "selector": "0x98737fd4"
      },
      {
        "args": [],
        "default": false,
        "docs": [],
        "label": "Raffle::get_last_era_done",
        "mutates": false,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 23
        },
        "selector": "0x83f23bb1"
      },
      {
        "args": [],
        "default": false,
        "docs": [],
        "label": "Raffle::get_ratio_distribution",
        "mutates": false,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 34
        },
        "selector": "0xda5dc8c5"
      },
      {
        "args": [],
        "default": false,
        "docs": [],
        "label": "Raffle::get_total_ratio_distribution",
        "mutates": false,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 31
        },
        "selector": "0x9b68910e"
      },
      {
        "args": [],
        "default": false,
        "docs": [],
        "label": "FilterLatestWinners::get_last_winners",
        "mutates": false,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 35
        },
        "selector": "0xad2bf9f6"
      },
      {
        "args": [
          {
            "label": "nb_filtered_winners",
            "type": {
              "displayName": [
                "filterlatestwinners_external",
                "SetNbWinnersFilteredInput1"
              ],
              "type": 0
            }
          }
        ],
        "default": false,
        "docs": [],
        "label": "FilterLatestWinners::set_nb_winners_filtered",
        "mutates": true,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 36
        },
        "selector": "0xf6059d22"
      },
      {
        "args": [],
        "default": false,
        "docs": [],
        "label": "FilterLatestWinners::get_nb_winners_filtered",
        "mutates": false,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 28
        },
        "selector": "0x0a88f283"
      },
      {
        "args": [
          {
            "label": "role",
            "type": {
              "displayName": [
                "accesscontrol_external",
                "GetRoleAdminInput1"
              ],
              "type": 8
            }
          }
        ],
        "default": false,
        "docs": [
          " Returns the admin role that controls `role`. See `grant_role` and `revoke_role`."
        ],
        "label": "AccessControl::get_role_admin",
        "mutates": false,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 23
        },
        "selector": "0x83da3bb2"
      },
      {
        "args": [
          {
            "label": "role",
            "type": {
              "displayName": [
                "accesscontrol_external",
                "RenounceRoleInput1"
              ],
              "type": 8
            }
          },
          {
            "label": "account",
            "type": {
              "displayName": [
                "accesscontrol_external",
                "RenounceRoleInput2"
              ],
              "type": 3
            }
          }
        ],
        "default": false,
        "docs": [
          " Revokes `role` from the calling account.",
          " Roles are often managed via `grant_role` and `revoke_role`: this function's",
          " purpose is to provide a mechanism for accounts to lose their privileges",
          " if they are compromised (such as when a trusted device is misplaced).",
          "",
          " On success a `RoleRevoked` event is emitted.",
          "",
          " # Errors",
          "",
          " Returns with `InvalidCaller` error if caller is not `account`.",
          " Returns with `MissingRole` error if `account` doesn't have `role`."
        ],
        "label": "AccessControl::renounce_role",
        "mutates": true,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 39
        },
        "selector": "0xeaf1248a"
      },
      {
        "args": [
          {
            "label": "role",
            "type": {
              "displayName": [
                "accesscontrol_external",
                "HasRoleInput1"
              ],
              "type": 8
            }
          },
          {
            "label": "address",
            "type": {
              "displayName": [
                "accesscontrol_external",
                "HasRoleInput2"
              ],
              "type": 3
            }
          }
        ],
        "default": false,
        "docs": [
          " Returns `true` if `account` has been granted `role`."
        ],
        "label": "AccessControl::has_role",
        "mutates": false,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 41
        },
        "selector": "0xc1d9ac18"
      },
      {
        "args": [
          {
            "label": "role",
            "type": {
              "displayName": [
                "accesscontrol_external",
                "RevokeRoleInput1"
              ],
              "type": 8
            }
          },
          {
            "label": "account",
            "type": {
              "displayName": [
                "accesscontrol_external",
                "RevokeRoleInput2"
              ],
              "type": 3
            }
          }
        ],
        "default": false,
        "docs": [
          " Revokes `role` from `account`.",
          "",
          " On success a `RoleRevoked` event is emitted.",
          "",
          " # Errors",
          "",
          " Returns with `MissingRole` error if caller can't grant the `role` or if `account` doesn't have `role`."
        ],
        "label": "AccessControl::revoke_role",
        "mutates": true,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 39
        },
        "selector": "0x6e4f0991"
      },
      {
        "args": [
          {
            "label": "role",
            "type": {
              "displayName": [
                "accesscontrol_external",
                "GrantRoleInput1"
              ],
              "type": 8
            }
          },
          {
            "label": "account",
            "type": {
              "displayName": [
                "accesscontrol_external",
                "GrantRoleInput2"
              ],
              "type": 3
            }
          }
        ],
        "default": false,
        "docs": [
          " Grants `role` to `account`.",
          "",
          " On success a `RoleGranted` event is emitted.",
          "",
          " # Errors",
          "",
          " Returns with `MissingRole` error if caller can't grant the role.",
          " Returns with `RoleRedundant` error `account` has `role`."
        ],
        "label": "AccessControl::grant_role",
        "mutates": true,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 39
        },
        "selector": "0x4ac062fd"
      }
    ]
  },
  "storage": {
    "root": {
      "layout": {
        "struct": {
          "fields": [
            {
              "layout": {
                "struct": {
                  "fields": [
                    {
                      "layout": {
                        "leaf": {
                          "key": "0x00000000",
                          "ty": 0
                        }
                      },
                      "name": "nb_participants"
                    },
                    {
                      "layout": {
                        "root": {
                          "layout": {
                            "leaf": {
                              "key": "0xbaed9900",
                              "ty": 1
                            }
                          },
                          "root_key": "0xbaed9900"
                        }
                      },
                      "name": "participants_1"
                    },
                    {
                      "layout": {
                        "leaf": {
                          "key": "0x00000000",
                          "ty": 6
                        }
                      },
                      "name": "total_value_1"
                    },
                    {
                      "layout": {
                        "root": {
                          "layout": {
                            "leaf": {
                              "key": "0xe54bf8a9",
                              "ty": 1
                            }
                          },
                          "root_key": "0xe54bf8a9"
                        }
                      },
                      "name": "participants_2"
                    },
                    {
                      "layout": {
                        "leaf": {
                          "key": "0x00000000",
                          "ty": 6
                        }
                      },
                      "name": "total_value_2"
                    },
                    {
                      "layout": {
                        "root": {
                          "layout": {
                            "leaf": {
                              "key": "0xdfc72956",
                              "ty": 1
                            }
                          },
                          "root_key": "0xdfc72956"
                        }
                      },
                      "name": "participants_3"
                    },
                    {
                      "layout": {
                        "leaf": {
                          "key": "0x00000000",
                          "ty": 6
                        }
                      },
                      "name": "total_value_3"
                    },
                    {
                      "layout": {
                        "root": {
                          "layout": {
                            "leaf": {
                              "key": "0x3967ac25",
                              "ty": 1
                            }
                          },
                          "root_key": "0x3967ac25"
                        }
                      },
                      "name": "participants_4"
                    },
                    {
                      "layout": {
                        "leaf": {
                          "key": "0x00000000",
                          "ty": 6
                        }
                      },
                      "name": "total_value_4"
                    },
                    {
                      "layout": {
                        "root": {
                          "layout": {
                            "leaf": {
                              "key": "0x5febf0ea",
                              "ty": 1
                            }
                          },
                          "root_key": "0x5febf0ea"
                        }
                      },
                      "name": "participants_5"
                    },
                    {
                      "layout": {
                        "leaf": {
                          "key": "0x00000000",
                          "ty": 6
                        }
                      },
                      "name": "total_value_5"
                    },
                    {
                      "layout": {
                        "root": {
                          "layout": {
                            "leaf": {
                              "key": "0xba822069",
                              "ty": 1
                            }
                          },
                          "root_key": "0xba822069"
                        }
                      },
                      "name": "participants_6"
                    },
                    {
                      "layout": {
                        "leaf": {
                          "key": "0x00000000",
                          "ty": 6
                        }
                      },
                      "name": "total_value_6"
                    }
                  ],
                  "name": "Data"
                }
              },
              "name": "participant_manager"
            },
            {
              "layout": {
                "struct": {
                  "fields": [
                    {
                      "layout": {
                        "leaf": {
                          "key": "0x00000000",
                          "ty": 7
                        }
                      },
                      "name": "ratio_distribution"
                    },
                    {
                      "layout": {
                        "leaf": {
                          "key": "0x00000000",
                          "ty": 6
                        }
                      },
                      "name": "total_ratio_distribution"
                    },
                    {
                      "layout": {
                        "leaf": {
                          "key": "0x00000000",
                          "ty": 8
                        }
                      },
                      "name": "last_era_done"
                    }
                  ],
                  "name": "Data"
                }
              },
              "name": "raffle"
            },
            {
              "layout": {
                "struct": {
                  "fields": [
                    {
                      "layout": {
                        "root": {
                          "layout": {
                            "leaf": {
                              "key": "0x6a2cd2b4",
                              "ty": 8
                            }
                          },
                          "root_key": "0x6a2cd2b4"
                        }
                      },
                      "name": "admin_roles"
                    },
                    {
                      "layout": {
                        "struct": {
                          "fields": [
                            {
                              "layout": {
                                "root": {
                                  "layout": {
                                    "leaf": {
                                      "key": "0x5d5db175",
                                      "ty": 9
                                    }
                                  },
                                  "root_key": "0x5d5db175"
                                }
                              },
                              "name": "members"
                            },
                            {
                              "layout": {
                                "enum": {
                                  "dispatchKey": "0x00000000",
                                  "name": "Option",
                                  "variants": {
                                    "0": {
                                      "fields": [],
                                      "name": "None"
                                    },
                                    "1": {
                                      "fields": [
                                        {
                                          "layout": {
                                            "leaf": {
                                              "key": "0x00000000",
                                              "ty": 9
                                            }
                                          },
                                          "name": "0"
                                        }
                                      ],
                                      "name": "Some"
                                    }
                                  }
                                }
                              },
                              "name": "_reserved"
                            }
                          ],
                          "name": "Members"
                        }
                      },
                      "name": "members"
                    },
                    {
                      "layout": {
                        "enum": {
                          "dispatchKey": "0x00000000",
                          "name": "Option",
                          "variants": {
                            "0": {
                              "fields": [],
                              "name": "None"
                            },
                            "1": {
                              "fields": [
                                {
                                  "layout": {
                                    "leaf": {
                                      "key": "0x00000000",
                                      "ty": 9
                                    }
                                  },
                                  "name": "0"
                                }
                              ],
                              "name": "Some"
                            }
                          }
                        }
                      },
                      "name": "_reserved"
                    }
                  ],
                  "name": "Data"
                }
              },
              "name": "access"
            },
            {
              "layout": {
                "enum": {
                  "dispatchKey": "0x00000000",
                  "name": "Option",
                  "variants": {
                    "0": {
                      "fields": [],
                      "name": "None"
                    },
                    "1": {
                      "fields": [
                        {
                          "layout": {
                            "leaf": {
                              "key": "0x00000000",
                              "ty": 3
                            }
                          },
                          "name": "0"
                        }
                      ],
                      "name": "Some"
                    }
                  }
                }
              },
              "name": "dapps_staking_developer_address"
            },
            {
              "layout": {
                "enum": {
                  "dispatchKey": "0x00000000",
                  "name": "Option",
                  "variants": {
                    "0": {
                      "fields": [],
                      "name": "None"
                    },
                    "1": {
                      "fields": [
                        {
                          "layout": {
                            "leaf": {
                              "key": "0x00000000",
                              "ty": 3
                            }
                          },
                          "name": "0"
                        }
                      ],
                      "name": "Some"
                    }
                  }
                }
              },
              "name": "random_generator_address"
            },
            {
              "layout": {
                "enum": {
                  "dispatchKey": "0x00000000",
                  "name": "Option",
                  "variants": {
                    "0": {
                      "fields": [],
                      "name": "None"
                    },
                    "1": {
                      "fields": [
                        {
                          "layout": {
                            "leaf": {
                              "key": "0x00000000",
                              "ty": 3
                            }
                          },
                          "name": "0"
                        }
                      ],
                      "name": "Some"
                    }
                  }
                }
              },
              "name": "reward_manager_address"
            },
            {
              "layout": {
                "struct": {
                  "fields": [
                    {
                      "layout": {
                        "leaf": {
                          "key": "0x00000000",
                          "ty": 0
                        }
                      },
                      "name": "nb_filtered_winners"
                    },
                    {
                      "layout": {
                        "leaf": {
                          "key": "0x00000000",
                          "ty": 10
                        }
                      },
                      "name": "last_winners"
                    }
                  ],
                  "name": "Data"
                }
              },
              "name": "filter_latest_winners"
            }
          ],
          "name": "Contract"
        }
      },
      "root_key": "0x00000000"
    }
  },
  "types": [
    {
      "id": 0,
      "type": {
        "def": {
          "primitive": "u16"
        }
      }
    },
    {
      "id": 1,
      "type": {
        "def": {
          "sequence": {
            "type": 2
          }
        }
      }
    },
    {
      "id": 2,
      "type": {
        "def": {
          "composite": {
            "fields": [
              {
                "name": "account",
                "type": 3,
                "typeName": "AccountId"
              },
              {
                "name": "value",
                "type": 6,
                "typeName": "Balance"
              }
            ]
          }
        },
        "path": [
          "lucky",
          "traits",
          "participant_manager",
          "Participant"
        ]
      }
    },
    {
      "id": 3,
      "type": {
        "def": {
          "composite": {
            "fields": [
              {
                "type": 4,
                "typeName": "[u8; 32]"
              }
            ]
          }
        },
        "path": [
          "ink_primitives",
          "types",
          "AccountId"
        ]
      }
    },
    {
      "id": 4,
      "type": {
        "def": {
          "array": {
            "len": 32,
            "type": 5
          }
        }
      }
    },
    {
      "id": 5,
      "type": {
        "def": {
          "primitive": "u8"
        }
      }
    },
    {
      "id": 6,
      "type": {
        "def": {
          "primitive": "u128"
        }
      }
    },
    {
      "id": 7,
      "type": {
        "def": {
          "sequence": {
            "type": 6
          }
        }
      }
    },
    {
      "id": 8,
      "type": {
        "def": {
          "primitive": "u32"
        }
      }
    },
    {
      "id": 9,
      "type": {
        "def": {
          "tuple": []
        }
      }
    },
    {
      "id": 10,
      "type": {
        "def": {
          "sequence": {
            "type": 3
          }
        }
      }
    },
    {
      "id": 11,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "fields": [
                  {
                    "type": 9
                  }
                ],
                "index": 0,
                "name": "Ok"
              },
              {
                "fields": [
                  {
                    "type": 12
                  }
                ],
                "index": 1,
                "name": "Err"
              }
            ]
          }
        },
        "params": [
          {
            "name": "T",
            "type": 9
          },
          {
            "name": "E",
            "type": 12
          }
        ],
        "path": [
          "Result"
        ]
      }
    },
    {
      "id": 12,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "index": 1,
                "name": "CouldNotReadInput"
              }
            ]
          }
        },
        "path": [
          "ink_primitives",
          "LangError"
        ]
      }
    },
    {
      "id": 13,
      "type": {
        "def": {
          "sequence": {
            "type": 14
          }
        }
      }
    },
    {
      "id": 14,
      "type": {
        "def": {
          "tuple": [
            3,
            6
          ]
        }
      }
    },
    {
      "id": 15,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "fields": [
                  {
                    "type": 16
                  }
                ],
                "index": 0,
                "name": "Ok"
              },
              {
                "fields": [
                  {
                    "type": 12
                  }
                ],
                "index": 1,
                "name": "Err"
              }
            ]
          }
        },
        "params": [
          {
            "name": "T",
            "type": 16
          },
          {
            "name": "E",
            "type": 12
          }
        ],
        "path": [
          "Result"
        ]
      }
    },
    {
      "id": 16,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "fields": [
                  {
                    "type": 9
                  }
                ],
                "index": 0,
                "name": "Ok"
              },
              {
                "fields": [
                  {
                    "type": 17
                  }
                ],
                "index": 1,
                "name": "Err"
              }
            ]
          }
        },
        "params": [
          {
            "name": "T",
            "type": 9
          },
          {
            "name": "E",
            "type": 17
          }
        ],
        "path": [
          "Result"
        ]
      }
    },
    {
      "id": 17,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "fields": [
                  {
                    "type": 18,
                    "typeName": "AccessControlError"
                  }
                ],
                "index": 0,
                "name": "AccessControlError"
              },
              {
                "fields": [
                  {
                    "type": 19,
                    "typeName": "RaffleError"
                  }
                ],
                "index": 1,
                "name": "RaffleError"
              },
              {
                "index": 2,
                "name": "RaffleAlreadyDone"
              },
              {
                "index": 3,
                "name": "CrossContractCallError1"
              },
              {
                "index": 4,
                "name": "CrossContractCallError2"
              },
              {
                "index": 5,
                "name": "CrossContractCallError2a"
              },
              {
                "index": 6,
                "name": "CrossContractCallError2b"
              },
              {
                "index": 7,
                "name": "TransferError"
              },
              {
                "index": 8,
                "name": "UpgradeError"
              },
              {
                "index": 9,
                "name": "LuckyOracleAddressMissing"
              },
              {
                "index": 10,
                "name": "RandomGeneratorAddressMissing"
              },
              {
                "index": 11,
                "name": "DappsStakingDeveloperAddressMissing"
              },
              {
                "index": 12,
                "name": "RewardManagerAddressMissing"
              },
              {
                "fields": [
                  {
                    "type": 22,
                    "typeName": "ParticipantManagerError"
                  }
                ],
                "index": 13,
                "name": "ParticipantManagerError"
              }
            ]
          }
        },
        "path": [
          "lucky_raffle",
          "raffle_contract",
          "ContractError"
        ]
      }
    },
    {
      "id": 18,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "index": 0,
                "name": "InvalidCaller"
              },
              {
                "index": 1,
                "name": "MissingRole"
              },
              {
                "index": 2,
                "name": "RoleRedundant"
              }
            ]
          }
        },
        "path": [
          "openbrush_contracts",
          "traits",
          "errors",
          "access_control",
          "AccessControlError"
        ]
      }
    },
    {
      "id": 19,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "index": 0,
                "name": "RaffleAlreadyDone"
              },
              {
                "index": 1,
                "name": "NoReward"
              },
              {
                "index": 2,
                "name": "NoRatioSet"
              },
              {
                "index": 3,
                "name": "IncorrectRatio"
              },
              {
                "index": 4,
                "name": "NoParticipant"
              },
              {
                "index": 5,
                "name": "NoSelectedParticipant"
              },
              {
                "index": 6,
                "name": "DivByZero"
              },
              {
                "index": 7,
                "name": "MulOverFlow"
              },
              {
                "index": 8,
                "name": "AddOverFlow"
              },
              {
                "fields": [
                  {
                    "type": 20,
                    "typeName": "RandomError"
                  }
                ],
                "index": 9,
                "name": "RandomError"
              },
              {
                "fields": [
                  {
                    "type": 18,
                    "typeName": "AccessControlError"
                  }
                ],
                "index": 10,
                "name": "AccessControlError"
              }
            ]
          }
        },
        "path": [
          "lucky",
          "traits",
          "raffle",
          "RaffleError"
        ]
      }
    },
    {
      "id": 20,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "index": 0,
                "name": "MissingAddress"
              },
              {
                "fields": [
                  {
                    "type": 21,
                    "typeName": "RandomGeneratorError"
                  }
                ],
                "index": 1,
                "name": "RandomGeneratorError"
              }
            ]
          }
        },
        "path": [
          "lucky",
          "traits",
          "random",
          "RandomError"
        ]
      }
    },
    {
      "id": 21,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "index": 0,
                "name": "DivByZero"
              },
              {
                "index": 1,
                "name": "MulOverFlow"
              },
              {
                "index": 2,
                "name": "AddOverFlow"
              },
              {
                "index": 3,
                "name": "SubOverFlow"
              },
              {
                "index": 4,
                "name": "MissingAddress"
              },
              {
                "fields": [
                  {
                    "type": 18,
                    "typeName": "AccessControlError"
                  }
                ],
                "index": 5,
                "name": "AccessControlError"
              }
            ]
          }
        },
        "path": [
          "lucky",
          "traits",
          "random_generator",
          "RandomGeneratorError"
        ]
      }
    },
    {
      "id": 22,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "index": 0,
                "name": "MaxSizeExceeded"
              },
              {
                "index": 1,
                "name": "PageNotFound"
              },
              {
                "fields": [
                  {
                    "type": 18,
                    "typeName": "AccessControlError"
                  }
                ],
                "index": 2,
                "name": "AccessControlError"
              }
            ]
          }
        },
        "path": [
          "lucky",
          "traits",
          "participant_manager",
          "ParticipantManagerError"
        ]
      }
    },
    {
      "id": 23,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "fields": [
                  {
                    "type": 8
                  }
                ],
                "index": 0,
                "name": "Ok"
              },
              {
                "fields": [
                  {
                    "type": 12
                  }
                ],
                "index": 1,
                "name": "Err"
              }
            ]
          }
        },
        "params": [
          {
            "name": "T",
            "type": 8
          },
          {
            "name": "E",
            "type": 12
          }
        ],
        "path": [
          "Result"
        ]
      }
    },
    {
      "id": 24,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "fields": [
                  {
                    "type": 25
                  }
                ],
                "index": 0,
                "name": "Ok"
              },
              {
                "fields": [
                  {
                    "type": 12
                  }
                ],
                "index": 1,
                "name": "Err"
              }
            ]
          }
        },
        "params": [
          {
            "name": "T",
            "type": 25
          },
          {
            "name": "E",
            "type": 12
          }
        ],
        "path": [
          "Result"
        ]
      }
    },
    {
      "id": 25,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "index": 0,
                "name": "None"
              },
              {
                "fields": [
                  {
                    "type": 3
                  }
                ],
                "index": 1,
                "name": "Some"
              }
            ]
          }
        },
        "params": [
          {
            "name": "T",
            "type": 3
          }
        ],
        "path": [
          "Option"
        ]
      }
    },
    {
      "id": 26,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "fields": [
                  {
                    "type": 27
                  }
                ],
                "index": 0,
                "name": "Ok"
              },
              {
                "fields": [
                  {
                    "type": 12
                  }
                ],
                "index": 1,
                "name": "Err"
              }
            ]
          }
        },
        "params": [
          {
            "name": "T",
            "type": 27
          },
          {
            "name": "E",
            "type": 12
          }
        ],
        "path": [
          "Result"
        ]
      }
    },
    {
      "id": 27,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "fields": [
                  {
                    "type": 9
                  }
                ],
                "index": 0,
                "name": "Ok"
              },
              {
                "fields": [
                  {
                    "type": 22
                  }
                ],
                "index": 1,
                "name": "Err"
              }
            ]
          }
        },
        "params": [
          {
            "name": "T",
            "type": 9
          },
          {
            "name": "E",
            "type": 22
          }
        ],
        "path": [
          "Result"
        ]
      }
    },
    {
      "id": 28,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "fields": [
                  {
                    "type": 0
                  }
                ],
                "index": 0,
                "name": "Ok"
              },
              {
                "fields": [
                  {
                    "type": 12
                  }
                ],
                "index": 1,
                "name": "Err"
              }
            ]
          }
        },
        "params": [
          {
            "name": "T",
            "type": 0
          },
          {
            "name": "E",
            "type": 12
          }
        ],
        "path": [
          "Result"
        ]
      }
    },
    {
      "id": 29,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "fields": [
                  {
                    "type": 30
                  }
                ],
                "index": 0,
                "name": "Ok"
              },
              {
                "fields": [
                  {
                    "type": 12
                  }
                ],
                "index": 1,
                "name": "Err"
              }
            ]
          }
        },
        "params": [
          {
            "name": "T",
            "type": 30
          },
          {
            "name": "E",
            "type": 12
          }
        ],
        "path": [
          "Result"
        ]
      }
    },
    {
      "id": 30,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "fields": [
                  {
                    "type": 1
                  }
                ],
                "index": 0,
                "name": "Ok"
              },
              {
                "fields": [
                  {
                    "type": 22
                  }
                ],
                "index": 1,
                "name": "Err"
              }
            ]
          }
        },
        "params": [
          {
            "name": "T",
            "type": 1
          },
          {
            "name": "E",
            "type": 22
          }
        ],
        "path": [
          "Result"
        ]
      }
    },
    {
      "id": 31,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "fields": [
                  {
                    "type": 6
                  }
                ],
                "index": 0,
                "name": "Ok"
              },
              {
                "fields": [
                  {
                    "type": 12
                  }
                ],
                "index": 1,
                "name": "Err"
              }
            ]
          }
        },
        "params": [
          {
            "name": "T",
            "type": 6
          },
          {
            "name": "E",
            "type": 12
          }
        ],
        "path": [
          "Result"
        ]
      }
    },
    {
      "id": 32,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "fields": [
                  {
                    "type": 33
                  }
                ],
                "index": 0,
                "name": "Ok"
              },
              {
                "fields": [
                  {
                    "type": 12
                  }
                ],
                "index": 1,
                "name": "Err"
              }
            ]
          }
        },
        "params": [
          {
            "name": "T",
            "type": 33
          },
          {
            "name": "E",
            "type": 12
          }
        ],
        "path": [
          "Result"
        ]
      }
    },
    {
      "id": 33,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "fields": [
                  {
                    "type": 9
                  }
                ],
                "index": 0,
                "name": "Ok"
              },
              {
                "fields": [
                  {
                    "type": 19
                  }
                ],
                "index": 1,
                "name": "Err"
              }
            ]
          }
        },
        "params": [
          {
            "name": "T",
            "type": 9
          },
          {
            "name": "E",
            "type": 19
          }
        ],
        "path": [
          "Result"
        ]
      }
    },
    {
      "id": 34,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "fields": [
                  {
                    "type": 7
                  }
                ],
                "index": 0,
                "name": "Ok"
              },
              {
                "fields": [
                  {
                    "type": 12
                  }
                ],
                "index": 1,
                "name": "Err"
              }
            ]
          }
        },
        "params": [
          {
            "name": "T",
            "type": 7
          },
          {
            "name": "E",
            "type": 12
          }
        ],
        "path": [
          "Result"
        ]
      }
    },
    {
      "id": 35,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "fields": [
                  {
                    "type": 10
                  }
                ],
                "index": 0,
                "name": "Ok"
              },
              {
                "fields": [
                  {
                    "type": 12
                  }
                ],
                "index": 1,
                "name": "Err"
              }
            ]
          }
        },
        "params": [
          {
            "name": "T",
            "type": 10
          },
          {
            "name": "E",
            "type": 12
          }
        ],
        "path": [
          "Result"
        ]
      }
    },
    {
      "id": 36,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "fields": [
                  {
                    "type": 37
                  }
                ],
                "index": 0,
                "name": "Ok"
              },
              {
                "fields": [
                  {
                    "type": 12
                  }
                ],
                "index": 1,
                "name": "Err"
              }
            ]
          }
        },
        "params": [
          {
            "name": "T",
            "type": 37
          },
          {
            "name": "E",
            "type": 12
          }
        ],
        "path": [
          "Result"
        ]
      }
    },
    {
      "id": 37,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "fields": [
                  {
                    "type": 9
                  }
                ],
                "index": 0,
                "name": "Ok"
              },
              {
                "fields": [
                  {
                    "type": 38
                  }
                ],
                "index": 1,
                "name": "Err"
              }
            ]
          }
        },
        "params": [
          {
            "name": "T",
            "type": 9
          },
          {
            "name": "E",
            "type": 38
          }
        ],
        "path": [
          "Result"
        ]
      }
    },
    {
      "id": 38,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "fields": [
                  {
                    "type": 18,
                    "typeName": "AccessControlError"
                  }
                ],
                "index": 0,
                "name": "AccessControlError"
              }
            ]
          }
        },
        "path": [
          "lucky",
          "traits",
          "participant_filter",
          "participant_filter",
          "ParticipantFilterError"
        ]
      }
    },
    {
      "id": 39,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "fields": [
                  {
                    "type": 40
                  }
                ],
                "index": 0,
                "name": "Ok"
              },
              {
                "fields": [
                  {
                    "type": 12
                  }
                ],
                "index": 1,
                "name": "Err"
              }
            ]
          }
        },
        "params": [
          {
            "name": "T",
            "type": 40
          },
          {
            "name": "E",
            "type": 12
          }
        ],
        "path": [
          "Result"
        ]
      }
    },
    {
      "id": 40,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "fields": [
                  {
                    "type": 9
                  }
                ],
                "index": 0,
                "name": "Ok"
              },
              {
                "fields": [
                  {
                    "type": 18
                  }
                ],
                "index": 1,
                "name": "Err"
              }
            ]
          }
        },
        "params": [
          {
            "name": "T",
            "type": 9
          },
          {
            "name": "E",
            "type": 18
          }
        ],
        "path": [
          "Result"
        ]
      }
    },
    {
      "id": 41,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "fields": [
                  {
                    "type": 42
                  }
                ],
                "index": 0,
                "name": "Ok"
              },
              {
                "fields": [
                  {
                    "type": 12
                  }
                ],
                "index": 1,
                "name": "Err"
              }
            ]
          }
        },
        "params": [
          {
            "name": "T",
            "type": 42
          },
          {
            "name": "E",
            "type": 12
          }
        ],
        "path": [
          "Result"
        ]
      }
    },
    {
      "id": 42,
      "type": {
        "def": {
          "primitive": "bool"
        }
      }
    },
    {
      "id": 43,
      "type": {
        "def": {
          "composite": {
            "fields": [
              {
                "type": 4,
                "typeName": "[u8; 32]"
              }
            ]
          }
        },
        "path": [
          "ink_primitives",
          "types",
          "Hash"
        ]
      }
    },
    {
      "id": 44,
      "type": {
        "def": {
          "primitive": "u64"
        }
      }
    },
    {
      "id": 45,
      "type": {
        "def": {
          "variant": {}
        },
        "path": [
          "ink_env",
          "types",
          "NoChainExtension"
        ]
      }
    }
  ],
  "version": "4"
}

const _abi = new Abi(metadata)

export function decodeEvent(hex: string): Event {
  return _abi.decodeEvent(hex)
}

export function decodeMessage(hex: string): Message {
    return _abi.decodeMessage(hex)
}

export function decodeConstructor(hex: string): Constructor {
    return _abi.decodeConstructor(hex)
}

export interface Chain {
    client: {
        call: <T=any>(method: string, params?: unknown[]) => Promise<T>
    }
}

export interface ChainContext {
    _chain: Chain
}

export class Contract {
    constructor(private ctx: ChainContext, private address: string, private blockHash?: string) { }

    get_role_raffle_manager(): Promise<Result<number, LangError>> {
        return this.stateCall('0xa528dbca', [])
    }

    get_role_participant_manager(): Promise<Result<number, LangError>> {
        return this.stateCall('0xeffbebd9', [])
    }

    get_role_participant_filter_manager(): Promise<Result<number, LangError>> {
        return this.stateCall('0xca6d2b33', [])
    }

    ParticipantManager_get_nb_participants(): Promise<Result<number, LangError>> {
        return this.stateCall('0x2c728b9e', [])
    }

    ParticipantManager_get_participants(page: GetParticipantsInput1): Promise<Result<Result<Participant[], ParticipantManagerError>, LangError>> {
        return this.stateCall('0x95499dd4', [page])
    }

    ParticipantManager_get_total_value(): Promise<Result<bigint, LangError>> {
        return this.stateCall('0x5575fa1d', [])
    }

    ParticipantManager_get_participant(weight: bigint): Promise<Result<(Uint8Array | undefined), LangError>> {
        return this.stateCall('0x58038889', [weight])
    }

    Raffle_get_last_era_done(): Promise<Result<number, LangError>> {
        return this.stateCall('0x83f23bb1', [])
    }

    Raffle_get_ratio_distribution(): Promise<Result<SetRatioDistributionInput1, LangError>> {
        return this.stateCall('0xda5dc8c5', [])
    }

    Raffle_get_total_ratio_distribution(): Promise<Result<bigint, LangError>> {
        return this.stateCall('0x9b68910e', [])
    }

    FilterLatestWinners_get_last_winners(): Promise<Result<Uint8Array[], LangError>> {
        return this.stateCall('0xad2bf9f6', [])
    }

    FilterLatestWinners_get_nb_winners_filtered(): Promise<Result<number, LangError>> {
        return this.stateCall('0x0a88f283', [])
    }

    AccessControl_get_role_admin(role: number): Promise<Result<number, LangError>> {
        return this.stateCall('0x83da3bb2', [role])
    }

    AccessControl_has_role(role: number, address: Uint8Array): Promise<Result<boolean, LangError>> {
        return this.stateCall('0xc1d9ac18', [role, address])
    }

    private async stateCall<T>(selector: string, args: any[]): Promise<T> {
        let input = _abi.encodeMessageInput(selector, args)
        let data = encodeCall(this.address, input)
        let result = await this.ctx._chain.client.call('state_call', ['ContractsApi_call', data, this.blockHash])
        let value = decodeResult(result)
        return _abi.decodeMessageOutput(selector, value)
    }
}

export type Event = Event_RaffleDone

export interface Event_RaffleDone {
    __kind: 'RaffleDone'
    contract: Uint8Array
    era: number
    pendingRewards: bigint
    nbWinners: number
    nbParticipants: number
    totalValue: bigint
}

export type Message = Message_add_participants_with_filters | Message_run_raffle | Message_get_role_raffle_manager | Message_get_role_participant_manager | Message_get_role_participant_filter_manager | Message_set_dapps_staking_developer_address | Message_get_dapps_staking_developer_address | Message_set_random_generator_address | Message_get_random_generator_address | Message_set_reward_manager_address | Message_get_reward_manager_address | Message_upgrade_contract | Message_withdraw | Message_ParticipantManager_add_participants | Message_ParticipantManager_clear_data | Message_ParticipantManager_get_nb_participants | Message_ParticipantManager_get_participants | Message_ParticipantManager_get_total_value | Message_ParticipantManager_get_participant | Message_Raffle_set_ratio_distribution | Message_Raffle_get_last_era_done | Message_Raffle_get_ratio_distribution | Message_Raffle_get_total_ratio_distribution | Message_FilterLatestWinners_get_last_winners | Message_FilterLatestWinners_set_nb_winners_filtered | Message_FilterLatestWinners_get_nb_winners_filtered | Message_AccessControl_get_role_admin | Message_AccessControl_renounce_role | Message_AccessControl_has_role | Message_AccessControl_revoke_role | Message_AccessControl_grant_role

/**
 *  add participants in the raffle and applied the filters
 *  a participant with a weight higher than another participant will have normally more chance to be selected in the raffle
 *  weight can represent the number of raffle tickets for this participant.
 *  weight can also represent the amount staked in dAppStaking, ...
 */
export interface Message_add_participants_with_filters {
    __kind: 'add_participants_with_filters'
    participants: [Uint8Array, bigint][]
}

export interface Message_run_raffle {
    __kind: 'run_raffle'
    era: number
    rewards: bigint
}

export interface Message_get_role_raffle_manager {
    __kind: 'get_role_raffle_manager'
}

export interface Message_get_role_participant_manager {
    __kind: 'get_role_participant_manager'
}

export interface Message_get_role_participant_filter_manager {
    __kind: 'get_role_participant_filter_manager'
}

export interface Message_set_dapps_staking_developer_address {
    __kind: 'set_dapps_staking_developer_address'
    address: Uint8Array
}

export interface Message_get_dapps_staking_developer_address {
    __kind: 'get_dapps_staking_developer_address'
}

export interface Message_set_random_generator_address {
    __kind: 'set_random_generator_address'
    address: Uint8Array
}

export interface Message_get_random_generator_address {
    __kind: 'get_random_generator_address'
}

export interface Message_set_reward_manager_address {
    __kind: 'set_reward_manager_address'
    address: Uint8Array
}

export interface Message_get_reward_manager_address {
    __kind: 'get_reward_manager_address'
}

export interface Message_upgrade_contract {
    __kind: 'upgrade_contract'
    newCodeHash: Uint8Array
}

export interface Message_withdraw {
    __kind: 'withdraw'
    value: bigint
}

/**
 *  add participants in the raffle
 *  a participant with a weight higher than another participant will have normally more chance to be selected in the raffle
 *  weight can represent the number of raffle tickets for this participant.
 *  weight can also represent the amount staked in dAppStaking, ...
 */
export interface Message_ParticipantManager_add_participants {
    __kind: 'ParticipantManager_add_participants'
    participants: [Uint8Array, bigint][]
}

/**
 *  Clear the data (participants and rewards)
 */
export interface Message_ParticipantManager_clear_data {
    __kind: 'ParticipantManager_clear_data'
}

export interface Message_ParticipantManager_get_nb_participants {
    __kind: 'ParticipantManager_get_nb_participants'
}

export interface Message_ParticipantManager_get_participants {
    __kind: 'ParticipantManager_get_participants'
    page: GetParticipantsInput1
}

export interface Message_ParticipantManager_get_total_value {
    __kind: 'ParticipantManager_get_total_value'
}

export interface Message_ParticipantManager_get_participant {
    __kind: 'ParticipantManager_get_participant'
    weight: bigint
}

/**
 *  Set the rate sharing by the winners
 *  First winner will receive : total_rewards * ratio[0] / total_ratio
 *  Second winner will receive : total_rewards * ratio[1] / total_ratio
 *  if ratio[n] equals to zero or is empty, tne winner n will receive nothing
 *  Sum(ratio[i]) <= total_ratio. Otherwise teh error IncorrectRatio is expected
 */
export interface Message_Raffle_set_ratio_distribution {
    __kind: 'Raffle_set_ratio_distribution'
    ratio: SetRatioDistributionInput1
    totalRatio: bigint
}

export interface Message_Raffle_get_last_era_done {
    __kind: 'Raffle_get_last_era_done'
}

export interface Message_Raffle_get_ratio_distribution {
    __kind: 'Raffle_get_ratio_distribution'
}

export interface Message_Raffle_get_total_ratio_distribution {
    __kind: 'Raffle_get_total_ratio_distribution'
}

export interface Message_FilterLatestWinners_get_last_winners {
    __kind: 'FilterLatestWinners_get_last_winners'
}

export interface Message_FilterLatestWinners_set_nb_winners_filtered {
    __kind: 'FilterLatestWinners_set_nb_winners_filtered'
    nbFilteredWinners: number
}

export interface Message_FilterLatestWinners_get_nb_winners_filtered {
    __kind: 'FilterLatestWinners_get_nb_winners_filtered'
}

/**
 *  Returns the admin role that controls `role`. See `grant_role` and `revoke_role`.
 */
export interface Message_AccessControl_get_role_admin {
    __kind: 'AccessControl_get_role_admin'
    role: number
}

/**
 *  Revokes `role` from the calling account.
 *  Roles are often managed via `grant_role` and `revoke_role`: this function's
 *  purpose is to provide a mechanism for accounts to lose their privileges
 *  if they are compromised (such as when a trusted device is misplaced).
 * 
 *  On success a `RoleRevoked` event is emitted.
 * 
 *  # Errors
 * 
 *  Returns with `InvalidCaller` error if caller is not `account`.
 *  Returns with `MissingRole` error if `account` doesn't have `role`.
 */
export interface Message_AccessControl_renounce_role {
    __kind: 'AccessControl_renounce_role'
    role: number
    account: Uint8Array
}

/**
 *  Returns `true` if `account` has been granted `role`.
 */
export interface Message_AccessControl_has_role {
    __kind: 'AccessControl_has_role'
    role: number
    address: Uint8Array
}

/**
 *  Revokes `role` from `account`.
 * 
 *  On success a `RoleRevoked` event is emitted.
 * 
 *  # Errors
 * 
 *  Returns with `MissingRole` error if caller can't grant the `role` or if `account` doesn't have `role`.
 */
export interface Message_AccessControl_revoke_role {
    __kind: 'AccessControl_revoke_role'
    role: number
    account: Uint8Array
}

/**
 *  Grants `role` to `account`.
 * 
 *  On success a `RoleGranted` event is emitted.
 * 
 *  # Errors
 * 
 *  Returns with `MissingRole` error if caller can't grant the role.
 *  Returns with `RoleRedundant` error `account` has `role`.
 */
export interface Message_AccessControl_grant_role {
    __kind: 'AccessControl_grant_role'
    role: number
    account: Uint8Array
}

export type Constructor = Constructor_new

export interface Constructor_new {
    __kind: 'new'
    dappsStakingDeveloperAddress: Uint8Array
    randomGeneratorAddress: Uint8Array
    rewardManagerAddress: Uint8Array
}

export type LangError = LangError_CouldNotReadInput

export interface LangError_CouldNotReadInput {
    __kind: 'CouldNotReadInput'
}

export type GetParticipantsInput1 = number

export interface Participant {
    account: Uint8Array
    value: bigint
}

export type ParticipantManagerError = ParticipantManagerError_MaxSizeExceeded | ParticipantManagerError_PageNotFound | ParticipantManagerError_AccessControlError

export interface ParticipantManagerError_MaxSizeExceeded {
    __kind: 'MaxSizeExceeded'
}

export interface ParticipantManagerError_PageNotFound {
    __kind: 'PageNotFound'
}

export interface ParticipantManagerError_AccessControlError {
    __kind: 'AccessControlError'
    value: AccessControlError
}

export type SetRatioDistributionInput1 = bigint[]

export type AccessControlError = AccessControlError_InvalidCaller | AccessControlError_MissingRole | AccessControlError_RoleRedundant

export interface AccessControlError_InvalidCaller {
    __kind: 'InvalidCaller'
}

export interface AccessControlError_MissingRole {
    __kind: 'MissingRole'
}

export interface AccessControlError_RoleRedundant {
    __kind: 'RoleRedundant'
}

export type Result<T, E> = {__kind: 'Ok', value: T} | {__kind: 'Err', value: E}
