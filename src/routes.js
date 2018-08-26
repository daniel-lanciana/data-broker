import { Router } from 'express';
import { linnia, ipfs } from './linnia';
const Linnia = require('@linniaprotocol/linnia-js');
import logger from './logger';

const routes = Router();

// https://github.com/ConsenSys/linnia-js

routes.get('/records/:hash', async(req, res) => {
  const record = await linnia.getRecord(req.params.hash);

  // Some record information (more available)
  res.send({
      hash: record.dataHash,
      owner: record.owner,
      dataUri: record.dataUri
  });
});

routes.get('/records/:hash/decrypt', async(req, res) => {
    // Get the Linnia record from the record hash
    const record = await linnia.getRecord(req.params.hash);
    // Get the encrypted data as a hex string
    const encrypted = (await ipfs.cat(record.dataUri)).toString();
    // Use the encryption private key to decrypt and convert to string
    const decrypted = (await Linnia.util.decrypt(process.env.LINNIA_PRIVATE_KEY, encrypted)).toString();

    res.send(decrypted);
});

export default routes;
