const Web3 = require('web3');
const Linnia = require('@linniaprotocol/linnia-js');
const IPFS = require('ipfs-api');
import logger from './logger';

// Ganache (local)
// const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));

// Ropsten (testnet)
let web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/6d6c8269aa7d4438bc50f06cf0ca4be8'));

const ipfs = new IPFS({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https'
});

const hubAddress = '0x177bf15e7e703f4980b7ef75a58dc4198f0f1172';
const linnia = new Linnia(web3, ipfs, { hubAddress });

// linnia.getContractInstances().then((instances) => {
//     let users = instances.users;
//     let records = instances.records;
//     let permissions = instances.permissions;
// });

// get record (endpoint)
// decrypt record (endpoint)

// get the deployed contracts
//const { _, users, records, permissions } = await linnia.getContractInstances()

export { linnia, ipfs };
