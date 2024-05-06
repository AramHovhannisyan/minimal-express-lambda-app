import { Request, Response, NextFunction } from 'express';
import { getData } from '../services/testService';
import problem from '../lib/errorHandling/problem';

// Controller handler Request and Response
const getTest = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await getData();
    if (!data.length) {
      return res.status(404).json({
        status: "Fail",
        message: "Not found",
      });
    }

    return res.status(200).json({
      status: 'success',
      data,
    });
  } catch (error) {
    console.error("error:", error);

    next(problem(1001, req));
  }
};

export { getTest };
