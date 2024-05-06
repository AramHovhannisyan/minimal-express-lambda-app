import { Request, Response, NextFunction } from 'express';
import { validateTestQueryParams } from '../validators/validateTestQueryParams';

const validateAndSetTest = (req: Request, res: Response, next: NextFunction) => {
  const { error } = validateTestQueryParams(req.query);
  if (error) {
    console.info(error.details);

    return res
      .status(400)
      .json({
        status: 'Fail',
        message: 'Invalid Request',
      });
  }

  const { test } = req.query;
  

  res.locals.test = test;

  return next();
};

export default validateAndSetTest;
