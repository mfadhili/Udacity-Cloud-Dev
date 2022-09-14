import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
//import "source-nap-support/register";
import * as AWS from "aws-sdk";

import { middyfy } from '../../../libs/lambda';


const docClient = new AWS.DynamoDB.DocumentClient()

const groupsTable = "groups" //process.env.GROUPS_TABLE
const imagesTable = "images" //process.env.IMAGES_TABLE


const app2: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) : Promise<APIGatewayProxyResult> => {
    console.log('Caller event: ', event)
    const groupId = event.pathParameters.groupId

    // check if groupId exists

    const validGroupId = await groupExists(groupId)
    
    if (!validGroupId) {
        return {
          statusCode: 404,
          headers: {
            'Access-Control-Allow-Origin': '*'
          },
          body: JSON.stringify({
            error: 'Group does not exist'
          })
        }
      }

      const images = await getImagesPerGroup(groupId) 



   return {
       statusCode: 200,
       headers: {
           'Access-Control-Allow-Origin': '*'
       },
       body: JSON.stringify({
           items: images
       })
   }
} 

async function groupExists(groupId:string) {
    const result = await docClient
    .get({
      TableName: groupsTable,
      Key: {
        id: groupId
      }
    })
    .promise()

    console.log('Get group: ', result)
    return !!result.Item // if it exists returns a boolean
}

async function getImagesPerGroup(groupId:string) {
    const result = await docClient.query({
        TableName: imagesTable,
        KeyConditionExpression: 'groupId = :groupId',
        ExpressionAttributeValues: {
          ':groupId': groupId
        },
        ScanIndexForward: false // reverses sort order
      }).promise()
    
    return result.Items
}


export  const main = middyfy(app2)