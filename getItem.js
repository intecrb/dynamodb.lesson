let AWS = require('aws-sdk');
let proxy = require('proxy-agent');

AWS.config.update({
  httpOptions: { agent: proxy(process.env.http_proxy) },
  region: "ap-northeast-1"
});

var docClient = new AWS.DynamoDB.DocumentClient()
var params = {
    TableName: 'Users',
    Key:{
        "birthday": '2019-11-09 20:26:19',
        "userId": 9785
    }
};
docClient.get(params, function(err, data) {
    if (err) {
        console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        // console.log(JSON.stringify(data, null, 2));
        console.log(data.Item.friends.isActor)
    }
});