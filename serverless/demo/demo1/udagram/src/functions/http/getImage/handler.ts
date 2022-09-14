import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
//import "source-nap-support/register";
import * as AWS from "aws-sdk";
import { middyfy } from '../../../libs/lambda';


const docClient = new AWS.DynamoDB.DocumentClient()

const imagesTable = "images" //process.env.IMAGES_TABLE
const imageIdIndex = "imageIndex"   // process.env.IMAGE_ID_INDEX


const app2: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) : Promise<APIGatewayProxyResult> => {
    console.log('Caller event: ', event)
    const imageId = event.pathParameters.imageId
   
    // image query by imageId
    const result = await docClient.query({
      TableName : imagesTable,
      IndexName : imageIdIndex,
      KeyConditionExpression: 'imageId = :imageId',
      ExpressionAttributeValues: {
          ':imageId': imageId
      }
    }).promise()

    //check number of items 
    if (result.Count !== 0) {
      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(result.Items[0])
      }
    }
    else {
      return {
        statusCode: 404,
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        body: ''
    }
    }


  
} 




export  const main = middyfy(app2)