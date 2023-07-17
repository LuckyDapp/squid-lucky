import {Abi, encodeCall, decodeResult} from "@subsquid/ink-abi"

export const metadata = {
  "source": {
    "hash": "0xde76e2fe202e942906e9ff6eb899f5988ae12e767ad7743db60ed6943fe6f240",
    "language": "ink! 4.0.1",
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
    "name": "reward_manager",
    "version": "0.1.0",
    "authors": [
      "guigou"
    ]
  },
  "spec": {
    "constructors": [
      {
        "args": [],
        "docs": [],
        "label": "new",
        "payable": false,
        "returnType": {
          "displayName": [
            "ink_primitives",
            "ConstructorResult"
          ],
          "type": 3
        },
        "selector": "0x9bae9d5e"
      }
    ],
    "docs": [],
    "events": [
      {
        "args": [
          {
            "docs": [],
            "indexed": true,
            "label": "account",
            "type": {
              "displayName": [
                "AccountId"
              ],
              "type": 19
            }
          },
          {
            "docs": [],
            "indexed": false,
            "label": "era",
            "type": {
              "displayName": [
                "u32"
              ],
              "type": 1
            }
          },
          {
            "docs": [],
            "indexed": false,
            "label": "amount",
            "type": {
              "displayName": [
                "Balance"
              ],
              "type": 0
            }
          }
        ],
        "docs": [
          " Event emitted when a reward is pending"
        ],
        "label": "PendingReward"
      },
      {
        "args": [
          {
            "docs": [],
            "indexed": true,
            "label": "account",
            "type": {
              "displayName": [
                "AccountId"
              ],
              "type": 19
            }
          },
          {
            "docs": [],
            "indexed": false,
            "label": "amount",
            "type": {
              "displayName": [
                "Balance"
              ],
              "type": 0
            }
          }
        ],
        "docs": [
          " Event emitted when a user claim rewards"
        ],
        "label": "RewardsClaimed"
      }
    ],
    "lang_error": {
      "displayName": [
        "ink",
        "LangError"
      ],
      "type": 4
    },
    "messages": [
      {
        "args": [
          {
            "label": "new_code_hash",
            "type": {
              "displayName": [],
              "type": 5
            }
          }
        ],
        "docs": [],
        "label": "upgrade_contract",
        "mutates": true,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 7
        },
        "selector": "0x1345543d"
      },
      {
        "args": [],
        "docs": [],
        "label": "get_role_reward_manager",
        "mutates": false,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 12
        },
        "selector": "0xe37044e4"
      },
      {
        "args": [],
        "docs": [],
        "label": "get_role_reward_viewer",
        "mutates": false,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 12
        },
        "selector": "0x3c40d3be"
      },
      {
        "args": [],
        "docs": [
          " claim all pending rewards for the current account",
          " After claiming, there is not anymore pending rewards for this account"
        ],
        "label": "Psp22Reward::claim",
        "mutates": true,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 13
        },
        "selector": "0x51be5832"
      },
      {
        "args": [],
        "docs": [
          " return true if the current account has pending rewards"
        ],
        "label": "Psp22Reward::has_pending_rewards",
        "mutates": false,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 15
        },
        "selector": "0x4fa2ad68"
      },
      {
        "args": [
          {
            "label": "era",
            "type": {
              "displayName": [
                "psp22reward_external",
                "FundRewardsAndAddWinnersInput1"
              ],
              "type": 1
            }
          },
          {
            "label": "accounts",
            "type": {
              "displayName": [
                "psp22reward_external",
                "FundRewardsAndAddWinnersInput2"
              ],
              "type": 17
            }
          }
        ],
        "docs": [
          " Add the accounts in the list of winners for a given era",
          " accounts contains the list of winners and the rewards by account"
        ],
        "label": "Psp22Reward::fund_rewards_and_add_winners",
        "mutates": true,
        "payable": true,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 13
        },
        "selector": "0xc218e5ba"
      },
      {
        "args": [
          {
            "label": "from",
            "type": {
              "displayName": [
                "psp22reward_external",
                "GetPendingRewardsFromInput1"
              ],
              "type": 19
            }
          }
        ],
        "docs": [
          " return the pending rewards for a given account."
        ],
        "label": "Psp22Reward::get_pending_rewards_from",
        "mutates": true,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 20
        },
        "selector": "0xf53a4041"
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
              "type": 1
            }
          },
          {
            "label": "address",
            "type": {
              "displayName": [
                "accesscontrol_external",
                "HasRoleInput2"
              ],
              "type": 19
            }
          }
        ],
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
          "type": 15
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
                "GetRoleAdminInput1"
              ],
              "type": 1
            }
          }
        ],
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
          "type": 12
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
                "GrantRoleInput1"
              ],
              "type": 1
            }
          },
          {
            "label": "account",
            "type": {
              "displayName": [
                "accesscontrol_external",
                "GrantRoleInput2"
              ],
              "type": 19
            }
          }
        ],
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
          "type": 23
        },
        "selector": "0x4ac062fd"
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
              "type": 1
            }
          },
          {
            "label": "account",
            "type": {
              "displayName": [
                "accesscontrol_external",
                "RevokeRoleInput2"
              ],
              "type": 19
            }
          }
        ],
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
          "type": 23
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
                "RenounceRoleInput1"
              ],
              "type": 1
            }
          },
          {
            "label": "account",
            "type": {
              "displayName": [
                "accesscontrol_external",
                "RenounceRoleInput2"
              ],
              "type": 19
            }
          }
        ],
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
          "type": 23
        },
        "selector": "0xeaf1248a"
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
                        "root": {
                          "layout": {
                            "leaf": {
                              "key": "0xe2b0cbca",
                              "ty": 0
                            }
                          },
                          "root_key": "0xe2b0cbca"
                        }
                      },
                      "name": "pending_rewards"
                    }
                  ],
                  "name": "Data"
                }
              },
              "name": "reward"
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
                              "ty": 1
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
                                      "ty": 2
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
                                              "ty": 2
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
                                      "ty": 2
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
          "primitive": "u128"
        }
      }
    },
    {
      "id": 1,
      "type": {
        "def": {
          "primitive": "u32"
        }
      }
    },
    {
      "id": 2,
      "type": {
        "def": {
          "tuple": []
        }
      }
    },
    {
      "id": 3,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "fields": [
                  {
                    "type": 2
                  }
                ],
                "index": 0,
                "name": "Ok"
              },
              {
                "fields": [
                  {
                    "type": 4
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
            "type": 2
          },
          {
            "name": "E",
            "type": 4
          }
        ],
        "path": [
          "Result"
        ]
      }
    },
    {
      "id": 4,
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
      "id": 5,
      "type": {
        "def": {
          "array": {
            "len": 32,
            "type": 6
          }
        }
      }
    },
    {
      "id": 6,
      "type": {
        "def": {
          "primitive": "u8"
        }
      }
    },
    {
      "id": 7,
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
                    "type": 4
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
            "type": 4
          }
        ],
        "path": [
          "Result"
        ]
      }
    },
    {
      "id": 8,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "fields": [
                  {
                    "type": 2
                  }
                ],
                "index": 0,
                "name": "Ok"
              },
              {
                "fields": [
                  {
                    "type": 9
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
            "type": 2
          },
          {
            "name": "E",
            "type": 9
          }
        ],
        "path": [
          "Result"
        ]
      }
    },
    {
      "id": 9,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "fields": [
                  {
                    "type": 10,
                    "typeName": "RewardError"
                  }
                ],
                "index": 0,
                "name": "RewardError"
              },
              {
                "fields": [
                  {
                    "type": 11,
                    "typeName": "AccessControlError"
                  }
                ],
                "index": 1,
                "name": "AccessControlError"
              },
              {
                "index": 2,
                "name": "UpgradeError"
              }
            ]
          }
        },
        "path": [
          "reward_manager",
          "reward_manager",
          "ContractError"
        ]
      }
    },
    {
      "id": 10,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "index": 0,
                "name": "InsufficientTransferredBalance"
              },
              {
                "index": 1,
                "name": "TransferError"
              },
              {
                "index": 2,
                "name": "AddOverFlow"
              },
              {
                "index": 3,
                "name": "NoReward"
              },
              {
                "fields": [
                  {
                    "type": 11,
                    "typeName": "AccessControlError"
                  }
                ],
                "index": 4,
                "name": "AccessControlError"
              }
            ]
          }
        },
        "path": [
          "lucky",
          "traits",
          "reward",
          "psp22_reward",
          "RewardError"
        ]
      }
    },
    {
      "id": 11,
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
      "id": 12,
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
                    "type": 4
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
            "type": 4
          }
        ],
        "path": [
          "Result"
        ]
      }
    },
    {
      "id": 13,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "fields": [
                  {
                    "type": 14
                  }
                ],
                "index": 0,
                "name": "Ok"
              },
              {
                "fields": [
                  {
                    "type": 4
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
            "type": 14
          },
          {
            "name": "E",
            "type": 4
          }
        ],
        "path": [
          "Result"
        ]
      }
    },
    {
      "id": 14,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "fields": [
                  {
                    "type": 2
                  }
                ],
                "index": 0,
                "name": "Ok"
              },
              {
                "fields": [
                  {
                    "type": 10
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
            "type": 2
          },
          {
            "name": "E",
            "type": 10
          }
        ],
        "path": [
          "Result"
        ]
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
                    "type": 4
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
            "type": 4
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
          "primitive": "bool"
        }
      }
    },
    {
      "id": 17,
      "type": {
        "def": {
          "sequence": {
            "type": 18
          }
        }
      }
    },
    {
      "id": 18,
      "type": {
        "def": {
          "tuple": [
            19,
            0
          ]
        }
      }
    },
    {
      "id": 19,
      "type": {
        "def": {
          "composite": {
            "fields": [
              {
                "type": 5,
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
      "id": 20,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "fields": [
                  {
                    "type": 21
                  }
                ],
                "index": 0,
                "name": "Ok"
              },
              {
                "fields": [
                  {
                    "type": 4
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
            "type": 21
          },
          {
            "name": "E",
            "type": 4
          }
        ],
        "path": [
          "Result"
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
                "fields": [
                  {
                    "type": 22
                  }
                ],
                "index": 0,
                "name": "Ok"
              },
              {
                "fields": [
                  {
                    "type": 10
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
            "type": 22
          },
          {
            "name": "E",
            "type": 10
          }
        ],
        "path": [
          "Result"
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
                "name": "None"
              },
              {
                "fields": [
                  {
                    "type": 0
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
            "type": 0
          }
        ],
        "path": [
          "Option"
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
                    "type": 24
                  }
                ],
                "index": 0,
                "name": "Ok"
              },
              {
                "fields": [
                  {
                    "type": 4
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
            "type": 24
          },
          {
            "name": "E",
            "type": 4
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
                    "type": 2
                  }
                ],
                "index": 0,
                "name": "Ok"
              },
              {
                "fields": [
                  {
                    "type": 11
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
            "type": 2
          },
          {
            "name": "E",
            "type": 11
          }
        ],
        "path": [
          "Result"
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

    get_role_reward_manager(): Promise<Result<number, LangError>> {
        return this.stateCall('0xe37044e4', [])
    }

    get_role_reward_viewer(): Promise<Result<number, LangError>> {
        return this.stateCall('0x3c40d3be', [])
    }

    Psp22Reward_has_pending_rewards(): Promise<Result<boolean, LangError>> {
        return this.stateCall('0x4fa2ad68', [])
    }

    AccessControl_has_role(role: number, address: Uint8Array): Promise<Result<boolean, LangError>> {
        return this.stateCall('0xc1d9ac18', [role, address])
    }

    AccessControl_get_role_admin(role: number): Promise<Result<number, LangError>> {
        return this.stateCall('0x83da3bb2', [role])
    }

    private async stateCall<T>(selector: string, args: any[]): Promise<T> {
        let input = _abi.encodeMessageInput(selector, args)
        let data = encodeCall(this.address, input)
        let result = await this.ctx._chain.client.call('state_call', ['ContractsApi_call', data, this.blockHash])
        let value = decodeResult(result)
        return _abi.decodeMessageOutput(selector, value)
    }
}

export type Event = Event_PendingReward | Event_RewardsClaimed

export interface Event_PendingReward {
    __kind: 'PendingReward'
    account: Uint8Array
    era: number
    amount: Balance
}

export interface Event_RewardsClaimed {
    __kind: 'RewardsClaimed'
    account: Uint8Array
    amount: Balance
}

export type Message = Message_upgrade_contract | Message_get_role_reward_manager | Message_get_role_reward_viewer | Message_Psp22Reward_claim | Message_Psp22Reward_has_pending_rewards | Message_Psp22Reward_fund_rewards_and_add_winners | Message_Psp22Reward_get_pending_rewards_from | Message_AccessControl_has_role | Message_AccessControl_get_role_admin | Message_AccessControl_grant_role | Message_AccessControl_revoke_role | Message_AccessControl_renounce_role

export interface Message_upgrade_contract {
    __kind: 'upgrade_contract'
    newCodeHash: Uint8Array
}

export interface Message_get_role_reward_manager {
    __kind: 'get_role_reward_manager'
}

export interface Message_get_role_reward_viewer {
    __kind: 'get_role_reward_viewer'
}

/**
 *  claim all pending rewards for the current account
 *  After claiming, there is not anymore pending rewards for this account
 */
export interface Message_Psp22Reward_claim {
    __kind: 'Psp22Reward_claim'
}

/**
 *  return true if the current account has pending rewards
 */
export interface Message_Psp22Reward_has_pending_rewards {
    __kind: 'Psp22Reward_has_pending_rewards'
}

/**
 *  Add the accounts in the list of winners for a given era
 *  accounts contains the list of winners and the rewards by account
 */
export interface Message_Psp22Reward_fund_rewards_and_add_winners {
    __kind: 'Psp22Reward_fund_rewards_and_add_winners'
    era: number
    accounts: FundRewardsAndAddWinnersInput2
}

/**
 *  return the pending rewards for a given account.
 */
export interface Message_Psp22Reward_get_pending_rewards_from {
    __kind: 'Psp22Reward_get_pending_rewards_from'
    from: Uint8Array
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
 *  Returns the admin role that controls `role`. See `grant_role` and `revoke_role`.
 */
export interface Message_AccessControl_get_role_admin {
    __kind: 'AccessControl_get_role_admin'
    role: number
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

export type Constructor = Constructor_new

export interface Constructor_new {
    __kind: 'new'
}

export type LangError = LangError_CouldNotReadInput

export interface LangError_CouldNotReadInput {
    __kind: 'CouldNotReadInput'
}

export type Balance = bigint

export type FundRewardsAndAddWinnersInput2 = [Uint8Array, Balance][]

export type Result<T, E> = {__kind: 'Ok', value: T} | {__kind: 'Err', value: E}
