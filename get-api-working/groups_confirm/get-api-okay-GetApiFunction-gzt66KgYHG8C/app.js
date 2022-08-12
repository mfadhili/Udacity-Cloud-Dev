'use strict'
const AWS = require('aws-sdk')

const docClient = new AWS.DynamoDB.DocumentClient()

const groupsTable = process.env.GROUPS_TABLE|| groups

exports.handler = async (event) => {
  console.log('Processing event: ', event)

  const result = await docClient.scan({
    TableName: groupsTable
  }).promise()

  const items = result.items
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      items: items
    })
  }
}
