let AWS = require('aws-sdk');
let proxy = require('proxy-agent');

AWS.config.update({
  httpOptions: { agent: proxy(process.env.http_proxy) },
  region: "ap-northeast-1"
});

var docClient = new AWS.DynamoDB.DocumentClient()
var params = {
    TableName: 'Users',
    Key: {
        "birthday": '2020-01-21 03:56:43',
        "userId": '1092'
    },
    UpdateExpression: "set rating = rating + :val",
    ExpressionAttributeValues:{
        ":val": 1
    },
    ReturnValues:"UPDATED_NEW"
};

for (let i=0; i<10000; i++) {
    docClient.update(params, function(err, data) {
        if (err) {
            console.error("Error JSON:", JSON.stringify(err, null, 2));
            setTimeout(docClient.update(params, (err, data) => {
                console.log("---------------------------------------------------------------RETRY")
                if (err) {
                    console.log("---------------------------------------------------------------RETRY やばい")
                    console.error("Error JSON:", JSON.stringify(err, null, 2));
                } else {
                    console.log(JSON.stringify(data, null, 2));
                }
            }), 5000);
        } else {
            console.log(JSON.stringify(data, null, 2));
        }
    });
}
