import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
//import "source-nap-support/register";
import * as AWS from "aws-sdk";
import * as uuid from "uuid";
import { middyfy } from '../../../libs/lambda';
import * as AWSXRay from "aws-xray-sdk";

//const XAWS = AWSXRay.captureAWS(AWS)

const s3 = new AWS.S3({
    signatureVersion: 'v4'
})
const docClient = new AWS.DynamoDB.DocumentClient()

const groupsTable = "groups" //process.env.GROUPS_TABLE
const imagesTable = "images" //process.ev.IMAGES_TABLE
const bucketName = process.env.IMAGES_S3_BUCKET || 'arn:aws:s3:::udagram-dev-serverlessdeploymentbucket-h1vzv724bmmf'
const urlExpiration = process.env.SIGNED_URL_EXPIRATION



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

const app3: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) : Promise<APIGatewayProxyResult> => {
    console.log('Caller event: ', event)
   
    const groupId = event.pathParameters.validGroupId
    const validGroupId = await groupExists(groupId)

    //check if the group Id exist
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
    
    // adding the new image item

    const imageId = uuid.v4()
    const newItem = await createImage(groupId, imageId, event)

    //upload image to s3 
    const url = getUploadUrl(imageId)

   
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
    return !!result.Item
}

async function createImage(groupId:string, imageId: string, event: any) {
    const timestamp = new Date().toISOString()
  const newImage = JSON.parse(event.body)

  const newItem = {
    groupId,
    timestamp,
    imageId,
    ...newImage,
    imageUrl: `https://${bucketName}.s3.amazonaws.com/${imageId}`
  }
  console.log('Storing new item: ', newItem)

  await docClient
    .put({
      TableName: imagesTable,
      Item: newItem
    })
    .promise()

  return newItem
}

async function getUploadUrl(imageId:string) {
    return s3.getSignedUrl('putObject', {
        Bucket: bucketName,
        Key: imageId,
        Expires: urlExpiration
      })
}

export  const main = middyfy(app3)