const userDAO = require("../models/userModel");
const menuDAO = require("../models/menuModel");
const { response } = require("express");
const menuDB = new menuDAO();
const userDB = new userDAO();

menuDB.init();

exports.displayLogin = (req, res) => {
	res.render("admin/login");
};

exports.handleLogin = (req, res) => {
	res.render("admin/adminPage", { title: "Admin Page", user: "user" });
};

exports.displayRegister = (req, res) => {
	res.render("admin/addUser");
};

exports.postNewUser = (req, res) => {
	const user = req.body.username;
	const password = req.body.password;

	if (!user || !password) {
		res.send(401, "No Username or Password");
		return;
	}
	userDB.find(user, (err, u) => {
		if (u) {
			res.send(401, "User exists: ", user);
			return;
		}
		userDB.addUser(user, password);
		console.log("Register user", user, "Password", password);
		res.redirect("/login");
	});
};

exports.getHome = (req, res) => {
	res.render("home");
};

exports.getMenus = (req, res) => {
	res.render("menus");
	menuDB.getAllItems();
};

exports.getDinner = (req, res) => {
	menuDB
		.getDinnerMenu()
		.then((response) => {
			res.render("dinnerMenu", { title: "Dinner", items: response });
			console.log("Promise Resolved", response);
		})
		.catch((err) => {
			console.log("Promise Rejected", err);
		});
};

exports.getLunchMenu = (req, res) => {
	menuDB
		.getLunchMenu()
		.then((response) => {
			res.render("lunchMenu", { title: "Lunch Menu", items: response });
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
			req.body.assigned_menu
		);
		res.redirect("/menus");
	}
};

exports.getEditItem = (req, res) => {
	menuDB.getAllItems().then((response) => {
		res.render("editItem", { title: "Edit Menu Item", items: response });
	});
};

exports.postEditItem = (req, res) => {
	if (!req.body.name) {
		response.status(400).send("Name required to edit item");
	} else {
		menuDB.updateAvailability(req.body.name, JSON.parse(req.body.isAvailable));
		res.redirect("/menus");
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

exports.postDeleteItem = (req, res) => {
	if (!req.body.name) {
		response.status(400).send("Select an Item to delete");
	} else {
		menuDB.deleteItem(req.body.name);
		console.log("delete");
		res.redirect("/menus");
	}
};

exports.login = (req, res) => {
	res.send("<h1>Login</h1>");
	userDB.login(req.body.username, req.body.password);
};
