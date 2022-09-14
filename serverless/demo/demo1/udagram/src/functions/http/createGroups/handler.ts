import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
//import "source-nap-support/register";
import * as AWS from "aws-sdk";
import * as uuid from "uuid";
import { middyfy } from '../../../libs/lambda';



const docClient = new AWS.DynamoDB.DocumentClient()

const groupsTable = "groups" //process.env.GROUPS_TABLE



 const app2: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) : Promise<APIGatewayProxyResult> => {
     console.log('Processing event: ', event)
    // console.log(`${event}`)
    const itemId = uuid.v4()

    const parsedBody = event //JSON.parse("{\"name\":\"test_group\",\"description\":\"Trial\"}")
    
    const newItem = {
        id: itemId,
        ...parsedBody
    }
    // const newItem = event

    await docClient.put({
        TableName: groupsTable,
        Item: newItem
    }).promise()

    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
            newItem
        })
    }
} 



export  const main = middyfy(app2)