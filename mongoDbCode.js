var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/ctmDB";

MongoClient.connect(url, function(err, db) {
	if (err) {
		throw err;
	}
	
	dbo = db.db("mydb");

	dbo.collection("messages").find().toArray(function(err, res) {
		if (err) throw err;
		console.log(res);
		db.close();
	})
})