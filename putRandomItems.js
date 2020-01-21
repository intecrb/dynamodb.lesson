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

for (let i=0; i<100; i++) {
    const date = new Date().toISOString().
                replace(/T/, ' ').      // replace T with a space
                replace(/\..+/, '')     // delete the dot and everything after
    const params = {
        TableName: 'Users',
        Item: {
            "birthday": date,
            "userId": getRandom(1, 10000).toString(),
            "rating": 1
        }
    };
    docClient.put(params, function(err, data) {
        if (err) {
            console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log(JSON.stringify(data, null, 2));
        }
    });
}
