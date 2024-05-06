import express from 'express';
import { getTest } from '../controllers/testController';
import validateAndSetTest from '../lib/middlewares/testMiddleware';

const testRouter = express.Router();
testRouter.route('/').get(validateAndSetTest, getTest);

export { testRouter };
