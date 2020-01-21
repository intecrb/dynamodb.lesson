let AWS = require('aws-sdk');
let proxy = require('proxy-agent');

AWS.config.update({
  httpOptions: { agent: proxy(process.env.http_proxy) },
  region: "ap-northeast-1"
});

const dynamodb = new AWS.DynamoDB();

var params = {
    TableName: 'Users',
    KeySchema: [
        { AttributeName: "birthday", KeyType: "HASH"},  // Partition key
        { AttributeName: "userId", KeyType: "RANGE" }  // Sort key
    ],
    AttributeDefinitions: [
        { AttributeName: "birthday", AttributeType: "S" },
        { AttributeName: "userId", AttributeType: "S" }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 10,
        WriteCapacityUnits: 10
    }
};

dynamodb.createTable(params, function(err, data) {
    if (err) {
        console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log(JSON.stringify(data, null, 2));
    }
});