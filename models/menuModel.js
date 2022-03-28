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
			menu: {
				a_la_carte: {
					courses: {
						starter: {
							items: [
								{
									name: "Burger",
									description: "Cheese Burger on a bun",
									price: 10,
									allergens: "Wheat, Gltuen",
									ingrdients: "Beef, Cheese, Lettuce, Tomato, Mustard",
								},
							],
						},
						mains: { items: [] },
						desert: { items: [] },
					},
				},
				set_menu: {
					courses: {
						starter: { items: [] },
						mains: { items: [] },
						desert: { items: [] },
					},
				},
				drinks: {
					courses: {
						draught: { items: [] },
						bottles: { items: [] },
						cocktails: { items: [] },
					},
				},
			},
		});
	}

	getAllMenus() {
		return new Promise((resolve, reject) => {
			this.db.find({}, (err, menus) => {
				if (err) {
					reject(err);
				} else {
					resolve(menus);
					console.log("menus", menus[0].menu);
				}
			});
		});
	}

	getALaCarte() {
		return new Promise((resolve, reject) => {
			this.db.find({}, (err, menus) => {
				if (err) {
					reject(err);
				} else {
					resolve(menus);
					console.log("menus", menus[0].menu.a_la_carte);
				}
			});
		});
	}

	getSetMenu() {
		return new Promise((resolve, reject) => {
			this.db.find({}, (err, menus) => {
				if (err) {
					reject(err);
				} else {
					resolve(menus);
					console.log("menus", menus[0].menu.set_menu);
				}
			});
		});
	}

	getDrinksMenu() {
		return new Promise((resolve, reject) => {
			this.db.find({}, (err, menus) => {
				if (err) {
					reject(err);
				} else {
					resolve(menus);
					console.log("menus", menus[0].menu.drinks);
				}
			});
		});
	}
}
module.exports = Menu;
