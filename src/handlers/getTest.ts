import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { getData } from '../services/testService';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  let statusCode = 200;

  const data = await getData();

  if (!data.length) {
    statusCode = 404;
  }

  return {
    statusCode,
    body: JSON.stringify(data)
  };
};