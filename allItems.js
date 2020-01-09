let AWS = require('aws-sdk');
let proxy = require('proxy-agent');

AWS.config.update({
  httpOptions: { agent: proxy(process.env.http_proxy) },
  region: "ap-northeast-1"
});

var docClient = new AWS.DynamoDB.DocumentClient()
params = {
    TableName: 'mytable'
}
docClient.scan(params, (e, d) => {
    console.log(d)
})