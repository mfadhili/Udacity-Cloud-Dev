import type { AWS } from '@serverless/typescript';

import getGroups from "@functions/http/getGroups";
import createGroups from "@functions/http/createGroups";
import getImages  from "@functions/http/getImages";
import getImage from "@functions/http/getImage";
import createImage from "@functions/http/createImages";
//import { v1 } from 'uuid';

const serverlessConfiguration: AWS = {
  service: 'udagram',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild', 'serverless-reqvalidator-plugin', 'serverless-aws-documentation'],
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
      IMAGES_S3_BUCKET: 'arn:aws:s3:::udagram-dev-serverlessdeploymentbucket-h1vzv724bmmf',
      SIGNED_URL_EXPIRATION: '300'
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
          Resource: "arn:aws:dynamodb:us-east-1:*:table/*",
        },
        {
          Effect: "Allow",
          Action: [
            "s3:PutObject",
            "s3:GetObject",            
          ],
          Resource: "arn:aws:s3:::udagram-dev-serverlessdeploymentbucket-h1vzv724bmmf",
        }
      ],
      },
    },
  },
  // import the function via paths
  functions: { getGroups,createGroups, getImages, getImage, createImage },
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
    },
    documentation: {
      api:{
        info: {
          version: 'v1.0.0',
          title: 'Udagram Api',
          description: 'Serverless application for images sharing'
        },
        models: [{
          name: 'GroupRequest',
          contentType: 'application/json',
          schema: '${file(models/create-group-request.json)}'
        }]
      }
    }
  },
  resources: {
    Resources:{
      
    }
  }
  
  
};

module.exports = serverlessConfiguration;
