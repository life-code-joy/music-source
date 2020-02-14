const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const assert = require('assert');
const http = require('http');
const url = require('url');
const fs = require('fs');

const mongo_url = 'mongodb://localhost:27017';

const client = new MongoClient(mongo_url);

client.connect((err)=> {
 if(err != null) {
  console.log('Can not connect to the database!');
 } else {
  console.log('Connected ok ok !!!!');

  // Database name 
 const dbName = 'music';

 // get database 

 const db = client.db(dbName);
 client.close();
 }
});



// create server

http.createServer((req,res) => {
 var fileName = "./index.html";
 res.writeHead(200, 'text/html' );

 var fileStream = fs.createReadStream(fileName);
 fileStream.pipe(res);

}).listen(8000);

console.log('after connect');
