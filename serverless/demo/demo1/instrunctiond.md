`sudo npm install -g serverless` 
 sudo install was success full on ubuntu 20

 configure serverless to use AWS credentials 

  `sls config credentials --provider aws --key YOUR_ACCESS_KEY --secret YOUR_SECRET_KEY --profile serverless`

list available templates

`sls create --help`

set up ne serverless project
 `sls create --template aws-nodejs-typescript --path udagram`

 
### Creating Dynamo db using AWS CLI
  generate skeleton 
  ` aws dynamodb create-table --generate-cli-skeleton`

create a table frame json `create_table.json` 
 deploy table to dynamo db
 `aws dynamodb create-table --cli-input-json create_table.json --region us-east-1` 
   *Though this had issues and I ended up using the web console to create it*
  
### Connect to dynamoDB 
achieved by `src/model/index.ts`

