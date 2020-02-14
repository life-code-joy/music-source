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

 const dbo = client.db(dbName);

// add collection

dbo.createCollection("artists", function(err, res) {
 console.log("Collection created!");
});

dbo.collection("artists").findOne({}, (err, result) => {
 if(err) throw err;
 console.log(result);
});
 


 client.close();
 }
});



// create server

const server = http.createServer();

server.on('request', (req,res) => {
 var filename = "";
 var route = url.parse(req.url).pathname;
 console.log(route);

 if(route == "/") {
  filename = "./index.html";
 } else if (route == "/music"){
  filename = "./music/music.html";
 } else if (route == "/artist"){
  filename = "./artist/artist.html";
 }
 else {
  var filename = "./404.html";
 }

 console.log(filename);  

 if(filename != ""){
  //serve the file
  res.writeHead(200, "text/html");
  var fileStream = fs.createReadStream(filename);
  fileStream.pipe(res);
 }



});
server.listen(8000);
