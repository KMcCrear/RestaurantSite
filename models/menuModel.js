const nedb = require("nedb");

class Menu {
	constructor(dbFilePath) {
		if (dbFilePath) {
			this.db = new nedb({
				filename: `../databases/${dbFilePath}`,
				autoload: true,
			});
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
			course: "main",
			isAvailable: true,
		});
		console.log("Burger added");

		this.db.insert({
			name: "Pasta",
			description: "Pasta",
			price: 10,
			allergens: "Wheat, Gltuen",
			ingredients: "Pasta",
			assigned_menu: "dinner",
			course: "main",
			isAvailable: true,
		});
		this.db.insert({
			name: "Steak",
			description: "Steak",
			price: 20,
			allergens: "Wheat, Gltuen",
			ingredients: "Beef, Cheese, Lettuce, Tomato, Mustard",
			assigned_menu: "dinner",
			course: "main",
			isAvailable: true,
		});

		this.db.insert({
			name: "Cheese Toastie",
			description: "Toastie with chedder cheese",
			price: 5,
			allergens: "Wheat, Gltuen",
			ingredients: "Cheese",
			assigned_menu: "lunch",
			course: "main",
			isAvailable: true,
		});
		this.db.insert({
			name: "Garlic Bread",
			description: "Garlic Bread",
			price: 3,
			allergens: "Wheat, Gltuen",
			ingredients: "Bread Garlic",
			assigned_menu: "dinner",
			course: "starter",
			isAvailable: true,
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
					//console.log("items", test);
				}
			});
		});
	}

	getDinnerMenu() {
		return new Promise((resolve, reject) => {
			this.db.find(
				{ assigned_menu: "dinner", isAvailable: true },
				(err, items) => {
					if (err) {
						reject(err);
					} else {
						resolve(items);
						console.log("Dinner Menu", items);
					}
				}
			);
		});
	}

	find(name) {
		return new Promise((resolve, reject) => {
			this.db.find({ name: name }, (err, items) => {
				if (err) {
					reject(err);
				} else {
					resolve(items);
					console.log("Found Item: ", items);
				}
			});
		});
	}

	getLunchMenu() {
		return new Promise((resolve, reject) => {
			this.db.find(
				{ assigned_menu: "lunch", isAvailable: true },
				(err, items) => {
					if (err) {
						reject(err);
					} else {
						resolve(items);
						console.log("Lunch Menu", items);
					}
				}
			);
		});
	}

	getChefSpecials() {
		return new Promise((resolve, reject) => {
			this.db.find(
				{ assigned_menu: "specials", isAvailable: true },
				(err, items) => {
					if (err) {
						reject(err);
					} else {
						resolve(items);
						console.log("Chef Specials", items);
					}
				}
			);
		});
	}

	updateAvailability(name, isAvailable) {
		return new Promise((resolve, reject) => {
			this.db.update(
				{ name: name },
				{ $set: { isAvailable: isAvailable } },
				(err, item) => {
					if (err) {
						reject(err);
					} else {
						resolve(item);
						console.log("Successfully updated", name);
					}
				}
			);
		});
	}

	addMenuItem(
		name,
		description,
		price,
		allergens,
		ingredients,
		assigned_menu,
		course,
		isAvailable
	) {
		let item = {
			name: name,
			description: description,
			price: price,
			allergens: allergens,
			ingredients: ingredients,
			assigned_menu: assigned_menu,
			course: course,
			isAvailable: isAvailable,
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

	deleteItem(name) {
		return new Promise((resolve, reject) => {
			this.db.remove({ name: name }, (err, result) => {
				if (err) {
					console.log("error", err);
					reject(err);
				} else {
					resolve(result);
					console.log(`Item ${name} successfully deleted`);
				}
			});
		});
	}
}
module.exports = Menu;
