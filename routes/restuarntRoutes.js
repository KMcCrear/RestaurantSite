const express = require("express");
const router = express.Router();
const controller = require("../controllers/restaurantController");
const { login } = require("../auth/auth");
const { verify } = require("../auth/auth");

router.get("/login", controller.displayLogin); //Need to implement
router.post("/login", login, controller.handleLogin); //Need to Implement
router.get("/addUser", controller.displayRegister); //Need to implement
router.post("/addUser", controller.postNewUser); // Need to implement
router.get("/", controller.getHome);
router.get("/menus", controller.getMenus);
router.get("/menus/dinner", controller.getDinner);
router.get("/menus/lunch", controller.getLunchMenu);
router.get("/menus/additem", controller.getMenuItem);
router.post("/additem", controller.postMenuItem);
router.get("/menus/deleteItem", controller.getDeleteItem);
router.post("/deleteitem", controller.postDeleteItem);
router.get("/menus/editItem", controller.getEditItem);
router.post("/editItem", controller.postEditItem);

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
