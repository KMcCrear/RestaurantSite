const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");

exports.login = (req, res, next) => {
	let username = req.body.username;
	let password = req.body.password;

	userModel.find(username, (err, user) => {
		if (err) {
			console.log("error finding user", err);
			return res.status(401).send();
		}
		if (!user) {
			console.log("User ", username, " not found!");
			return res.render("admin/register");
		}
		bcrypt.compare(password, user.password, (err, result) => {
			if (result) {
				let payload = { username: username };
				let accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
					expiresIn: 300,
				});
				res.cookie("jwt", accessToken);
				next();
			} else {
				return res.render("admin/login");
			}
		});
	});
};

exports.verify = (req, res, next) => {
	let accessToken = req.cookies.jwt;
	if (!accessToken) {
		return res.status(403).send();
	}
	let payload;
	try {
		payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
		next();
	} catch (e) {
		res.status(401).send();
	}
};
