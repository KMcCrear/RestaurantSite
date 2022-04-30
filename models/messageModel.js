const nedb = require("nedb");

class Message {
	constructor(dbFilePath) {
		if (dbFilePath) {
			this.db = new nedb({
				filename: `../databases/${dbFilePath}`,
				autoload: true,
			});
			console.log("db:", dbFilePath);
		} else {
			this.db = new nedb();
		}
	}
	init() {
		this.db.insert({
			name: "Kyle",
			email: "kyle@gmail.com",
			message: "Hello there",
		});
		this.db.insert({
			name: "test",
			email: "test@gmail.com",
			message: "Well hello there",
		});
	}

	getAllMessages() {
		return new Promise((resolve, reject) => {
			this.db.find({}, (err, items) => {
				if (err) {
					reject(err);
				} else {
					resolve(items);
					//console.log("items", test);
				}
			});
		});
	}

	addMessage(name, email, message) {
		let conact = {
			name: name,
			email: email,
			message: message,
		};
		this.db.insert(conact, (err, doc) => {
			if (err) {
				console.log(err, "adding", conact);
			} else {
				console.log(conact, " Inserted");
			}
		});
	}
}

module.exports = Message;
