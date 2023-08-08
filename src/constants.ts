export interface Network {"shiden":string,"shibuya":string};
export interface ContractAddress {
    "shiden": string;
    "shibuya": string;
}
export const start_block = {
    "shiden":3_964_500,
    "shibuya":3_393_298
};
export const RAFFLE_CONTRACT_ADDRESS_SS58:ContractAddress = {
    shiden:'antwZPZH7fuhLwcjKQUT2cbpfjcKUJS1bt1Lnq2VxSszg8d',
    shibuya:'arobt7C1EEULtwsVhxSQnjA5ajrTsZnUBBU5fJV7z356Sp7'
};
export const REWARD_CONTRACT_ADDRESS_SS58:ContractAddress = {
    shiden:'X6yBHZm9MGzedCVBn6nGHHUDxEnjUNzSoN4aqAP4qooQpEU',
    shibuya:'WDtNnQgygsCXKfjdvL5TgimewWhcBhJgSSCkb5u5pzZJTpR'
};
export const DAPP_CONTRACT_ADDRESS_SS58:ContractAddress = {
    shiden:'X6ykUS6L6CH4EoZitZsYJsCxH2AGk2ky9G6a2xeu1W9ffTP',
    shibuya:'Xz3sHvmRgRY3mt3qQ3SjZ3aUPQTfHkj4rKeoQM6VJrenD3W'
}
export const DEVELOPPER_ADDRESS_SS58:ContractAddress = {
    shiden:'aqcmQUATZiaHmZtueE5chfSZRTvsvtSpmx57fZBhktDt4Rm',
    shibuya:'WayJSoeDvHLJ8rXPqrPyQQwznntbxvjwvmq1AKBpu9phYHr'
};
