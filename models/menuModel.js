const nedb = require("nedb");

class Menu {
	constructor(dbFilePath) {
		if (dbFilePath) {
			this.db = new nedb({ filename: dbFilePath, autoload: true });
		} else {
			this.db = new nedb();
		}
	}

	init() {
		this.db.insert({
			name: "Burger",
			description: "Cheese Burger on a bun",
			price: 10,
			allergens: "Wheat, Gltuen",
			ingrdients: "Beef, Cheese, Lettuce, Tomato, Mustard",
			assigned_menu: "dinner",
		});
		console.log("Burger added");
	}

	getAllItems() {
		return new Promise((resolve, reject) => {
			this.db.find({}, (err, items) => {
				if (err) {
					reject(err);
				} else {
					resolve(items);
					console.log("items", items);
				}
			});
		});
	}

	getDinnerMenu() {
		return new Promise((resolve, reject) => {
			this.db.find({ assigned_menu: "dinner" }, (err, items) => {
				if (err) {
					reject(err);
				} else {
					resolve(items);
					console.log("menus", items);
				}
			});
		});
	}

	getLunchMenu() {
		return new Promise((resolve, reject) => {
			this.db.find({ assigned_menu: "lunch" }, (err, items) => {
				if (err) {
					reject(err);
				} else {
					resolve(items);
					console.log("menus", items);
				}
			});
		});
	}
}
module.exports = Menu;
