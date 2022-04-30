const nedb = require("nedb");
const bcrypt = require("bcrypt");
const saltRounds = 10;

class User {
	constructor(dbFilePath) {
		if (dbFilePath) {
			//creating a concrete db to access
			this.db = new nedb({
				filename: `../databases/${dbFilePath}`,
				autoload: true,
			});
			console.log(`DB Connected to ${dbFilePath}`);
		} else {
			//Creating a db in memory
			this.db = new nedb();
		}
	}
	init() {
		this.db.insert({
			user: "admin",
			password: "$2b$10$OImDjaq1WX9BEXc5hj0Lfe8wS6eGG0iWx.bNF4jaAw4qam4Av3ppe",
		});

		return this;
	}

	addUser(username, password) {
		const that = this;
		bcrypt.hash(password, saltRounds).then(function (hash) {
			var entry = {
				user: username,
				password: hash,
			};
			that.db.insert(entry, (err) => {
				if (err) {
					console.log("Can't insert user: ", username);
				} else {
					console.log("User successfully added: ", entry);
				}
			});
		});
	}

	findUsers() {
		return new Promise((resolve, reject) => {
			this.db.find({}, (err, result) => {
				if (err) {
					console.log(err);
					reject(err);
				} else {
					console.log("Found users: ", result);
					resolve(result);
				}
			});
		});
	}

	deleteUser(user) {
		return new Promise((resolve, reject) => {
			this.db.remove({ user: user }, (err, result) => {
				if (err) {
					console.log(err);
					reject(err);
				} else {
					resolve(result);
					console.log(`user ${user} successfully deleted`);
				}
			});
		});
	}

	find(user, cb) {
		this.db.find({ user: user }, (err, entries) => {
			if (err) {
				return cb(null, null);
			} else {
				if (entries.length == 0) {
					return cb(null, null);
				}
				return cb(null, entries[0]);
			}
		});
	}
}

const dao = new User();
dao.init();

module.exports = dao;
