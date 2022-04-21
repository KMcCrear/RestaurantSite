const userDAO = require("../models/userModel");
const menuDAO = require("../models/menuModel");
const { response } = require("express");
const menuDB = new menuDAO();
const userDB = new userDAO();

menuDB.init();

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

exports.login = (req, res) => {
	res.send("<h1>Login</h1>");
	userDB.login(req.body.username, req.body.password);
};
