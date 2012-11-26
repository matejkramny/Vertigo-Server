var config = require('../config');
var worldProvider = config.WorldsProvider;
var fs = require('fs');

exports.getAll = function(req, res) {
	worldProvider.getList(function (err, result) {
		res.set("Content-Type","text/plain");
		res.set("Connection","close");
		res.set(200);
		
		var out = "";
		for (i=0; i < result.length; i++) {
			out += result[i].id+"\n";
		}
		
		res.send(out);
		res.end();
	});
};

exports.getOne = function (req, res) {
	var id = req.params.id;
	
	worldProvider.getOne(id, function (err, result) {
		if (err || result == null) {
			res.set("Content-Type", "text/plain");
			res.set("Connection","close");
			res.set(404);
			res.send("404 Requested ID Not found");
			res.end();
			
			return;
		}
		
		res.set("Content-Type", "text/plain");
		res.set("Connection","close");
		res.set(200);
		
		delete result._id;
		
		res.send(result);
		res.end();
	});
};

exports.downloadWorld = function (req, res) {
	var id = req.params.id;
	
	worldProvider.getOne(id, function (err, result) {
		if (err || result == null) {
			res.set("Content-Type", "text/plain");
			res.set("Connection","close");
			res.set(404);
			res.send("404 Requested ID Not found");
			res.end();
			
			return;
		}
		
		var filename = config.path.join(process.cwd(), "worlds", result.id+".vertigo.world.json");
		
		fs.exists(filename, function(exists) {
			if (!exists) {
				res.set("Content-Type", "text/plain");
				res.set("Connection","close");
				res.set(500);
				res.send("500 File not found");
				res.end();
			
				return;
			}
			
			res.set("Content-Type", "application/json");
			res.set("Connection", "close");
			res.set(200);
			
			var stream = fs.createReadStream(filename);
			stream.pipe(res);
		});
	})
}
