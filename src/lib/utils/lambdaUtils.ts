
import { IncomingHttpHeaders } from 'http';
import { APIGatewayProxyEventHeaders } from "aws-lambda";

// Define a function to transform IncomingHttpHeaders to APIGatewayProxyEventHeaders
const transformHeaders = (headers: IncomingHttpHeaders): APIGatewayProxyEventHeaders => {
  const transformedHeaders: APIGatewayProxyEventHeaders = {};
  for (const key in headers) {
    if (Array.isArray(headers[key])) {
      transformedHeaders[key] = (headers[key] as string[]).join(', ');
    } else {
      transformedHeaders[key] = headers[key] as string;
    }
  }
  return transformedHeaders;
};

const CreateQueryStringMultiParams = (url: string) => {
  const queryString = url.split('?')[1];
  const queryStringParams: { [key: string]: string[] } = {};

  if (queryString) {
    queryString.split('&').forEach(param => {
      const [key, value] = param.split('=');
      if (!queryStringParams[key]) {
        queryStringParams[key] = [value];
      } else {
        queryStringParams[key].push(value);
      }
    });
  }
};

export {
  transformHeaders,
  CreateQueryStringMultiParams
};
