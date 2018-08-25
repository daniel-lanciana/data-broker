import { Router } from 'express';
import linnia from './linnia';
import logger from './logger';

const routes = Router();

/**
 * GET home page
 */
routes.get('/records/:hash', (req, res) => {
    //'0xe2c2b2de424f2bd720b11503b3ec547d7fb672152085c3bd8ff6c6bbe300e980'
    linnia.getRecord(req.params.hash)
        .then((record) => {
          console.log(record.contracts);
          // res.send(JSON.stringify(record));
          res.send('hello');


        //record.decryptData(privKey, uriResolver)
        })
        .catch((error) => {
            logger.error(error.message);
            res.send(404);
        });
});

/**
 * GET /list
 *
 * This is a sample route demonstrating
 * a simple approach to error handling and testing
 * the global error handler. You most certainly want to
 * create different/better error handlers depending on
 * your use case.
 */
routes.get('/list', (req, res, next) => {
  const { title } = req.query;

  if (title == null || title === '') {
    // You probably want to set the response HTTP status to 400 Bad Request
    // or 422 Unprocessable Entity instead of the default 500 of
    // the global error handler (e.g check out https://github.com/kbariotis/throw.js).
    // This is just for demo purposes.
    next(new Error('The "title" parameter is required'));
    return;
  }

  res.render('index', { title });
});

export default routes;
