import { Request, Response, NextFunction } from 'express';
import problem from '../lib/errorHandling/problem';
import CreateLambdaEventDTO from '../lib/dtos/CreateLambdaEventDTO';
import { handler } from '../handlers/getTest';

// Controller handler Request and Response
const getTest = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const eventDTO = new CreateLambdaEventDTO(req);

    const { statusCode, body } = await handler(eventDTO);

    const bodyObj = JSON.parse(body);

    return res.status(statusCode).json(bodyObj);
  } catch (error) {
    console.error("error:", error);

    next(problem(1001, req));
  }
};

export { getTest };
