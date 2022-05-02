const userDAO = require("../models/userModel");
const menuDAO = require("../models/menuModel");
const messageDAO = require("../models/messageModel");
const { response } = require("express");
const menuDB = new menuDAO("menu.db");
const messageDB = new messageDAO("message.db");

menuDB.init();
messageDB.init();

exports.displayLogin = (req, res) => {
	res.render("admin/login");
};

exports.handleLogin = (req, res) => {
	console.log("admin");
	res.render("admin/adminPage", { title: "Admin Page", user: "user" });
};

exports.displayRegister = (req, res) => {
	res.render("admin/register");
};

exports.postNewUser = (req, res) => {
	const user = req.body.username;
	const password = req.body.password;

	if (!user || !password) {
		res.send(401, "No Username or Password");
		return;
	}
	userDAO.find(user, (err, u) => {
		if (u) {
			res.status(401).send("user exists");
			return;
		}
		userDAO.addUser(user, password);
		console.log("Register user", user, "Password", password);
		res.redirect("/admin");
	});
};

exports.displayAdmin = (req, res) => {
	res.render("admin/adminPage", { title: "Admin Page", user: "user" });
};

exports.getHome = (req, res) => {
	res.render("home");
};

exports.getMenus = (req, res) => {
	res.render("menus", { title: "Our Menus" });
};

exports.getDinner = (req, res) => {
	let starters = [];
	let mains = [];
	let desserts = [];
	menuDB
		.getDinnerMenu()
		.then((response) => {
			for (let i = 0; i < response.length; i++) {
				if (response[i].course == "starter") {
					starters.push(response[i]);
				}
				if (response[i].course == "main") {
					mains.push(response[i]);
				}
				if (response[i].course == "dessert") {
					desserts.push(response[i]);
				}
			}
			res.render("dinnerMenu", {
				title: "Dinner",
				starters: starters,
				mains: mains,
				desserts: desserts,
			});
			console.log("Promise Resolved", response);
		})
		.catch((err) => {
			console.log("Promise Rejected", err);
		});
};

exports.getLunchMenu = (req, res) => {
	let starters = [];
	let mains = [];
	let desserts = [];
	menuDB
		.getLunchMenu()
		.then((response) => {
			for (let i = 0; i < response.length; i++) {
				if (response[i].course == "starter") {
					starters.push(response[i]);
				}
				if (response[i].course == "main") {
					mains.push(response[i]);
				}
				if (response[i].course == "dessert") {
					desserts.push(response[i]);
				}
			}
			res.render("lunchMenu", {
				title: "Lunch Menu",
				starters: starters,
				mains: mains,
				desserts: desserts,
			});
		})
		.catch((err) => {
			console.log("Promise Rejected", err);
		});
};

exports.getMenuItem = (req, res) => {
	res.render("addMenuItem");
};

exports.postMenuItem = (req, res) => {
	if (!req.body.name) {
		response.status(400).send("New Items must have a name");
		return;
	} else {
		menuDB.addMenuItem(
			req.body.name,
			req.body.description,
			req.body.price,
			req.body.allergens,
			req.body.ingredients,
			req.body.assigned_menu,
			req.body.course,
			JSON.parse(req.body.isAvailable)
		);
		res.redirect("/menus");
	}
};

exports.selectItem = (req, res) => {
	menuDB.getAllItems().then((response) => {
		res.render("selectEditItem", {
			title: "Select Menu Item",
			items: response,
		});
	});
};

exports.postSelectItem = (req, res) => {
	menuDB.find(req.body.name).then((response) => {
		res.render("editItem", { title: "Edit Menu Item", items: response });
	});
};

exports.postEditItem = (req, res) => {
	if (!req.body.name) {
		response.status(400).send("Name required to edit item");
	} else {
		menuDB.updateItem(
			req.body.name,
			req.body.description,
			req.body.price,
			req.body.allergens,
			req.body.ingredients,
			req.body.assigned_menu,
			req.body.course,
			JSON.parse(req.body.isAvailable)
		);
		res.redirect("/admin");
	}
};

exports.getAddToSpecials = (req, res) => {
	menuDB.getAllItems().then((response) => {
		res.render("addToSpecials", { title: "Add to Speiclas", items: response });
	});
};

exports.handleSaveToSpecials = (req, res) => {
	console.log("Finding item", req.body.name);
	if (!req.body.name) {
		response.status(400).send("New Items must have a name");
		return;
	} else {
		menuDB.find(req.body.name).then((response) => {
			menuDB.addMenuItem(
				response[0].name,
				response[0].description,
				response[0].price,
				response[0].allergens,
				response[0].ingredients,
				"specials",
				response[0].course,
				response[0].isAvailable
			);
			console.log("Item saved to specials");
		});
		res.redirect("/admin");
	}
};

exports.getDeleteItem = (req, res) => {
	menuDB
		.getAllItems()
		.then((response) => {
			res.render("deleteItem", { title: "Delete Menu Item", items: response });
		})
		.catch((err) => {
			console.log("Respones Rejected", err);
		});
};

exports.getDeleteUser = (req, res) => {
	userDAO
		.findUsers()
		.then((response) => {
			res.render("deleteUser", { title: "Delete User", users: response });
		})
		.catch((err) => {
			console.log("Response Rejected", err);
		});
};

exports.postDeleteUser = (req, res) => {
	if (!req.body.user) {
		response.status(400).send("Must select a user");
		return;
	} else {
		userDAO.deleteUser(req.body.user);
		console.log(req.body.user, "has been deleted");
		res.redirect("/admin");
	}
};

exports.postDeleteItem = (req, res) => {
	if (!req.body.name) {
		response.status(400).send("Select an Item to delete");
	} else {
		menuDB.deleteItem(req.body.name);
		console.log("delete");
		res.redirect("/menus");
	}
};

exports.getSpecials = (req, res) => {
	let starters = [];
	let mains = [];
	let desserts = [];
	menuDB.getChefSpecials().then((response) => {
		for (let i = 0; i < response.length; i++) {
			if (response[i].course == "starter") {
				starters.push(response[i]);
			}
			if (response[i].course == "main") {
				mains.push(response[i]);
			}
			if (response[i].course == "dessert") {
				desserts.push(response[i]);
			}
		}
		res.render("specials", {
			title: "Chef Specials",
			starters: starters,
			mains: mains,
			desserts: desserts,
		});
	});
};

exports.getContact = (req, res) => {
	res.render("contactUs", { title: "Contact Us" });
};
exports.handleContact = (req, res) => {
	if (!req.body.name) {
		response.status(400).send("Please enter a name to message us");
		return;
	} else {
		messageDB.addMessage(req.body.name, req.body.email, req.body.message);
		res.redirect("/contact");
	}
};

exports.viewMessages = (req, res) => {
	messageDB
		.getAllMessages()
		.then((response) => {
			res.render("viewMessages", {
				title: "View User Messages",
				messages: response,
			});
		})
		.catch((err) => {
			console.log("Respones Rejected", err);
		});
};

exports.logout = (req, res) => {
	res.clearCookie("jwt").status(200).redirect("/");
};
