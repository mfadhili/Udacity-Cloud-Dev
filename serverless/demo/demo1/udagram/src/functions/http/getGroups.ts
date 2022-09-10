import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import "source-nap-support/register";
import * as AWS from "aws-sdk";
import { middyfy } from '../../libs/lambda';


const docClient = new AWS.DynamoDB.DocumentClient()

const groupsTable = process.env.GROUPS_TABLE

 const app1: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) : Promise<APIGatewayProxyResult> => {
    console.log('Processing event: ', event)

    const result = await docClient.scan({
        TableName: groupsTable
    }).promise()

    const items =result.Items

    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
            items
        })
    }
} 

export  const getGroup = middyfy(app1)