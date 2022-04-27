const express = require("express");
const router = express.Router();
const controller = require("../controllers/restaurantController");
const { login } = require("../auth/auth");
const { verify } = require("../auth/auth");

router.get("/login", controller.displayLogin); //Need to implement view
router.post("/login", login, controller.handleLogin); //Need to implement view
router.get("/adduser", controller.displayRegister); //Need to implement view
router.post("/adduser", controller.postNewUser); // Need to implement view
router.get("/", controller.getHome);
router.get("/menus", controller.getMenus);
router.get("/menus/dinner", controller.getDinner);
router.get("/menus/lunch", controller.getLunchMenu);
router.get("/menus/additem", verify, controller.getMenuItem);
router.post("/additem", verify, controller.postMenuItem);
router.get("/menus/deleteItem", verify, controller.getDeleteItem);
router.post("/deleteitem", verify, controller.postDeleteItem);
router.get("/menus/editItem", verify, controller.getEditItem);
router.post("/editItem", verify, controller.postEditItem);
router.get("/admin", verify, controller.displayAdmin);
router.get("/logout", controller.logout);

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
