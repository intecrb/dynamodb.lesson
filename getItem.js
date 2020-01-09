let AWS = require('aws-sdk');
let proxy = require('proxy-agent');

AWS.config.update({
  httpOptions: { agent: proxy(process.env.http_proxy) },
  region: "ap-northeast-1"
});

// const dynamodb = new AWS.DynamoDB();
// dynamodb.describeTable({TableName: 'mytable'}, (error, data) => {
//     console.log(data);
// });

var docClient = new AWS.DynamoDB.DocumentClient()
var params = {
    TableName: 'mytable',
    Key:{
        "myPartitionKey": '0001',
        "mySortKey": '0008'
    }
};
docClient.get(params, function(err, data) {
    if (err) {
        console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log(JSON.stringify(data, null, 2));
    }
});