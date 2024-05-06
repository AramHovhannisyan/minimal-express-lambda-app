import express, { Request, Response, NextFunction } from 'express';
import rateLimit from 'express-rate-limit';
import helmet from "helmet";
import hpp from 'hpp';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import logger from 'morgan';
import cors from 'cors';
import path from 'path';
import { config } from "./lib/config/config";
import { Err } from "./lib/types/ErrorTypes";
import problem from './lib/errorHandling/problem';
import { testRouter } from './routes/testRouter';

const app = express();

// Middlewares

// Implement CORS

app.use(cors({
  "origin": "*",
  "methods": "GET,POST",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
}));

// Security http headers
app.use(helmet());

if(config.server.env === 'dev'){
  app.use(logger('dev'));
}

// Allow only 100 request in 1h from 1 IP
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too Many Requests Whit This Ip, Please Try Again Later'
});
app.use('/api', limiter);

// Body Parser, reading data from body into req.body
app.use(express.json({limit: '10kb'}));
app.use(express.urlencoded({extended: true, limit: '10kb'}));
app.use(cookieParser());

app.use(hpp({
  whitelist: []
}));

app.use(compression());
app.use('/public', express.static(path.join(process.cwd(), 'public')));

/**
 * Routes
 * Mounting Routes
 */
app.get('/health', (req, res) => res.sendStatus(200));
app.get('/favicon.ico', (req, res) => res.sendStatus(204));

app.use('/api/v1/test', testRouter);

app.use((req, res, next) => next(problem(1002, req)));

app.use((err: Err, req: Request, res: Response, next: NextFunction) => {
  const { status, body } = err;
  res.setHeader('Content-Type', 'application/problem+json');
  res.status(status || 500);
  res.json(body);
});

const port = config.server.port || 80;

app.listen(port, () => {
  console.info(`listening on port ${port}`);
});