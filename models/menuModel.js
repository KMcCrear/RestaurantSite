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
			ingredients: "Beef, Cheese, Lettuce, Tomato, Mustard",
			assigned_menu: "dinner",
		});
		console.log("Burger added");

		this.db.insert({
			name: "Pasta",
			description: "Pasta",
			price: 10,
			allergens: "Wheat, Gltuen",
			ingredients: "Pasta",
			assigned_menu: "dinner",
		});

		this.db.insert({
			name: "Cheese Toastie",
			description: "Toastie with chedder cheese",
			price: 5,
			allergens: "Wheat, Gltuen",
			ingredients: "Cheese",
			assigned_menu: "lunch",
		});
		console.log("Cheese Toastie added");
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

	addMenuItem(name, description, price, allergens, ingredients, assigned_menu) {
		let item = {
			name: name,
			description: description,
			price: price,
			allergens: allergens,
			ingredients: ingredients,
			assigned_menu: assigned_menu,
		};
		console.log("item created, item");
		this.db.insert(item, (err, doc) => {
			if (err) {
				console.log("error inserting document", err);
			} else {
				console.log("item inserted into db", doc);
			}
		});
	}
}
module.exports = Menu;
