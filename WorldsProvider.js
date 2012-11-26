var config = require('./config');

WorldsProvider = function () {
	this.db = config.db;
};

WorldsProvider.prototype.getCollection = function(callback) {
	callback(this.db.collection('worlds'));
};

WorldsProvider.prototype.getList = function(callback) {
	this.getCollection(function (collection) {
		collection.find().toArray(function (err, arr) {
			if (err) callback(err);
			else callback(null, arr);
		});
	});
}

WorldsProvider.prototype.getOne = function(id, callback) {
	if (typeof id === 'function' || id == null) return;
	
	this.getCollection(function (collection) {
		collection.findOne({ id: id }, function (err, res) {
			if (err) callback(err);
			
			callback(null, res);
		});
	})
}

exports.WorldsProvider = new WorldsProvider();