const nedb = require("nedb");
const bcrypt = require("bcrypt");
const saltRounds = 10;

class User {
	constructor(dbFilePath) {
		if (dbFilePath) {
			//creating a concrete db to access
			this.db = new nedb({ filename: dbFilePath, autoload: true });
			console.log(`DB Connected to ${dbFilePath}`);
		} else {
			//Creating a db in memory
			this.db = new nedb();
		}
	}
	init() {
		this.db.insert({ username: "kylemccc", password: "password" });

		console.log(`db entry ${username} inserted`);
	}

	addUser(username, password) {
		bcrypt.hash(password, saltRounds).then(function (hash) {
			var entry = {
				user: username,
				password: hash,
			};
			this.db.insert(entry, (err) => {
				if (err) {
					console.log("Can't insert user: ", username);
				} else {
					console.log("User successfully added: ", entry);
				}
			});
		});
	}

	deleteUser(username) {
		return new Promise((resolve, reject) => {
			this.db.remove({ username: username }, (err, result) => {
				if (err) {
					console.log(err);
					reject(err);
				} else {
					resolve(result);
					console.log(`user ${username} successfully deleted`);
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

const dao = User();
dao.init();

module.exports = User;
