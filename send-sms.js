var express = require('express');
var bodyParser = require('body-parser');

var app=express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.post('/sendsms', function(req, res){

	const accountSid = 'AC8e72a6c9d673d234772c0852f89b37bf';
	const authToken = '601447d24368480edc2cf7e1227ddd32'
https://blackboard.towson.edu/bbcswebdav/pid-4570452-dt-content-rid-29849578_2/xid-29849578_2
	const client = require('twilio')(accountSid, authToken);

	client.messages.create({
		to: req.body.phone,
    	from: '+14433907955',
    	body: req.body.sendmsg
	})
	.then((message) => console.log("Sent Message ID: " + message.sid));

	var inputMessage = [
	{ type: "TO", name: req.body.name, phone: req.body.phone, message: req.body.sendmsg}
	];

	insertDB(inputMessage);
	
	///Returns 204 no content so we stay on the same html page 
	res.status(204).send({});
	res.end();
});

//Split out for readability, this inserts the message into our MongoDB 
function insertDB(inputMessage) {

	var MongoClient = require('mongodb').MongoClient;
	var url = "mongodb://localhost:27017/ctmDB";

	MongoClient.connect(url, function(err, db) {
		if (err) {
			throw err;
		}
	
		dbo = db.db("mydb");

		dbo.collection("messages").insert(inputMessage, function(err, del) {
			if (err) throw err;
			console.log("Inserted a message into DB");
		db.close();
		})
	})
}

var server = app.listen(8888, function(){
        var host = server.address().address;
        var port = server.address().port;
        console.log("Example app listening at http://%s:%s", host, port);
});
