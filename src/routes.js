import { Router } from 'express';
import { linnia, ipfs } from './linnia';
const Linnia = require('@linniaprotocol/linnia-js');
import logger from './logger';

const routes = Router();

routes.get('/records/:hash', async(req, res) => {
  const record = await linnia.getRecord(req.params.hash);

  res.send({
      hash: record.dataHash,
      owner: record.owner,
      dataUri: record.dataUri
  });
});

routes.get('/records/:hash/decrypt', async(req, res) => {
    const record = await linnia.getRecord(req.params.hash);
    const buffer = await ipfs.cat(record.dataUri);
    const encrypted = buffer.toString();
    const decrypted = await Linnia.util.decrypt(process.env.LINNIA_PRIVATE_KEY, encrypted);
    const plaintext = decrypted.toString();
    res.send(plaintext);
});

export default routes;
