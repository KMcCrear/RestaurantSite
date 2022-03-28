const nedb = require("nedb");

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
		return new Promise((resolve, reject) => {
			this.db.insert({ username: username, password: password }, (err, res) => {
				if (err) {
					console.log(err);
					reject(err);
				} else {
					resolve(res);
					console.log(`User ${username} successfully added to db`);
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

	login(username, password) {
		return new Promise((resolve, reject) => {
			this.db.find(
				{ username: username, password: password },
				(err, result) => {
					if (err) {
						console.log(err);
						reject(err);
					} else {
						resolve(result);
						console.log("Logged in");
					}
				}
			);
		});
	}
}

module.exports = User;
