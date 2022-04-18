const userDAO = require("../models/userModel");
const menuDAO = require("../models/menuModel");
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

exports.getDinnerMenu = (req, res) => {
	menuDB
		.getDinnerMenu()
		.then((response) => {
			res.render("dinnerMenu", { title: "Dinner", items: response });
			console.log("Promise Resolved");
		})
		.catch((err) => {
			console.log("Promise Rejected", err);
		});
};

exports.getLunchMenu = (req, res) => {
	res.render("lunchMenu");
	menuDB.getLunchMenu();
};

exports.login = (req, res) => {
	res.send("<h1>Login</h1>");
	userDB.login(req.body.username, req.body.password);
};
