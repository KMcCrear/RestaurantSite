const userDAO = require("../models/userModel");
const menuDAO = require("../models/menuModel");
const menuDB = new menuDAO();
const userDB = new userDAO();

menuDB.init();

exports.getMenus = (req, res) => {
	res.send("<h1>test</h1>");
	menuDB.getAllMenus();
};

exports.getLaCarte = (req, res) => {
	res.send("<h1>A La Carte</h1>");
	menuDB.getALaCarte();
};

exports.getSetMenu = (req, res) => {
	res.send("<h1>Set Menu</h1>");
	menuDB.getLunchMenu();
};

exports.getDrinksMenu = (req, res) => {
	res.send("<h1>Drinks</h1>");
	menuDB.getDrinksMenu();
};

exports.login = (req, res) => {
	res.send("<h1>Login</h1>");
	userDB.login(req.body.username, req.body.password);
};
