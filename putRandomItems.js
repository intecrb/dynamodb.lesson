let AWS = require('aws-sdk');
let proxy = require('proxy-agent');

AWS.config.update({
  httpOptions: { agent: proxy(process.env.http_proxy) },
  region: "ap-northeast-1"
});

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

var docClient = new AWS.DynamoDB.DocumentClient()

var params = {
    TableName: 'mytable',
    Item: {
        "myPartitionKey": getRandom(1, 1000).toString(),
        "mySortKey": getRandom(1, 1000).toString(),
        'key': 'value'
    }
};

docClient.put(params, function(err, data) {
    if (err) {
        console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log(JSON.stringify(data, null, 2));
    }
});