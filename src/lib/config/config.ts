import dotenv from 'dotenv';
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const SERVER_PORT = process.env.SERVER_PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || '';
const JWT_SECRET = process.env.JWT_SECRET || 'MY-SEC';

export const config = {
  jwt: {
    secret: JWT_SECRET,
  },
  server: {
    port: SERVER_PORT,
    env: NODE_ENV
  },
};
