import type { AWS } from '@serverless/typescript';

import {app}  from '@functions/http/getGroups';

const serverlessConfiguration: AWS = {
  service: 'udagram',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
    iam: {
      role: {
        statements: [{
          Effect: "Allow",
          Action: [
            "dynamodb:DescribeTable",
            "dynamodb: Query",
            "dynamodb: Scan",
            "dynamodb: GetItem",
            "dynamodb: PutItem",
            "dynamodb: UpdateItem",
            "dynamodb: DeleteItem"
          ],
          Resource: "arn:aws:dynamodb:us-east-1:491297492276:table/groups",
        }],
      },
    },
  },
  // import the function via paths
  functions: { app },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
    dynamodb: {
      start: {
        port: 5000,
        inMemory: true,
        migrate: true,
      },
      stages: "dev"
    }
  },
  
};

module.exports = serverlessConfiguration;
