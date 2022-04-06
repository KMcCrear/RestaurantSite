const express = require("express");
const router = express.Router();
const controller = require("../controllers/restaurantController");

router.get("/", controller.getMenus);
router.get("/menus/alacarte", controller.getLaCarte);
router.get("/menusdrinkmenu", controller.getLunchMenu);
router.get("/menus/drinksmenu", controller.getDrinksMenu);
router.get("/login", controller.login);

router.use(function (req, res) {
	res.status(404);
	res.type("text/plain");
	res.send("404 Not found.");
});
router.use(function (err, req, res, next) {
	res.status(500);
	res.type("text/plain");
	res.send("Internal Server Error.");
});

module.exports = router;
