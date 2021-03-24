//Index for the express

const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const express = require('express')
const app = express()
const AWS = require('aws-sdk');

const USERS_TABLE = process.env.USERS_TABLE;
let dynamoDB;
if(Is_OFFLINE === 'true') {
    dynamoDB = new AWS.DynamoDB.DocumentClient({
        region: 'localhost',
        endpoint: 'http://localhost:8000'
    })
    console.log(dynamoDB);
} else {
    dynamoDB = new AWS.DynamoDB.DocumentClient();
};
app.user(bodyPareser.json({strict:false}));

const dynamoDB = new AWS.DynamoDB.DocumentClient();
//https get req and res
app.get('/', function (req, res) {
  res.send('Hello World!')
})
//Get User Endpoint
app.get('/users/:UserId',function(req,res) {
    const params = {
        TableName: USERS_TABLE,
        KEY: {
            userId: req.params.userId,
        },
    }
    dynamoDB.get(params,(error,result)=> {
        if(error){
            console.log(error);
            res.status(400).json({error:'could not get user'})
        }
        if(result.item) {
            const {userId,name} = result.Item;
            res.json({userId,name});
        } else {
            res.status(404).json({error:"user not found"})
        }
    });
})
// create user endpoint 

app.post('user',function(req,res){
    const {userId,name} = req.body;
    if(typeof userId != 'string'){
        res.status(400).json({error: '"userId" must be string'});

    } else if (typeof name !== 'string') {
        res.status(400).json({error: '"name" must be a string'})
    }
    const params = {
        TableName: USERS_TABLE,
        Item : {
            userId: userId,
            name: name,
        },
    };
    dynamoDB.put(params,(error) => {
        if(error) {
            console.log(error);
            res.status(400).json({error: 'could not create user'})
        }
        res.json({userId,name})
    });
})
module.exports.handler = serverless(app);





