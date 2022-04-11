const userDAO = require("../models/userModel");
const menuDAO = require("../models/menuModel");
const menuDB = new menuDAO();
const userDB = new userDAO();

menuDB.init();

exports.getMenus = (req, res) => {
	res.send("<h1>test</h1>");
	menuDB.getAllMenus();
};

exports.getDinnerMenu = (req, res) => {
	res.send("<h1>A La Carte</h1>");
	menuDB.getDinnerMenu();
};

exports.getLunchMenu = (req, res) => {
	res.send("<h1>Set Menu</h1>");
	menuDB.getLunchMenu();
};

exports.login = (req, res) => {
	res.send("<h1>Login</h1>");
	userDB.login(req.body.username, req.body.password);
};
