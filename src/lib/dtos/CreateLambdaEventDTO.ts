import { Request } from "express";
import { transformHeaders, CreateQueryStringMultiParams } from "../utils/lambdaUtils";
import { APIGatewayProxyEventHeaders } from "aws-lambda";

class CreateLambdaEventDTO {
  body: string;
  headers: APIGatewayProxyEventHeaders;
  httpMethod: string;
  isBase64Encoded: boolean;
  path: string;
  pathParameters: any;
  queryStringParameters: any;
  multiValueQueryStringParameters: any;
  multiValueHeaders: any;
  requestContext: any;
  clientCert: any;
  resource: string;
  stageVariables: null;

  constructor(req: Request) {
    this.body = JSON.stringify(req.body);
    this.headers = transformHeaders(req.headers);
    this.httpMethod = req.method;
    this.isBase64Encoded = false; // Adjust as needed
    this.path = req.path;
    this.pathParameters = { ...req.params }; // Adjust as needed
    this.queryStringParameters = req.query; // Adjust as needed
    this.multiValueQueryStringParameters = CreateQueryStringMultiParams(req.url);
    this.multiValueHeaders = {};
    this.requestContext = {
      accountId: '',
      apiId: '',
      domainName: req.hostname,
      domainPrefix: '',
      httpMethod: req.method,
      identity: {
        accessKey: null,
        accountId: null,
        apiKey: null,
        apiKeyId: null,
        caller: null,
        cognitoAuthenticationProvider: null,
        cognitoAuthenticationType: null,
        cognitoIdentityId: null,
        cognitoIdentityPoolId: null,
        sourceIp: req.ip,
        user: null,
        userAgent: req.get('user-agent') || null,
        userArn: null,
        clientCert: null,
        principalOrgId: null,
      },
      path: req.path,
      protocol: req.protocol,
      requestId: '',
      requestTime: '',
      requestTimeEpoch: 0,
      resourceId: '',
      resourcePath: req.path,
    },
    this.resource = '';
    this.stageVariables = null;
  }
}

export default CreateLambdaEventDTO;