const express = require("express");
const router = express.Router();
const controller = require("../controllers/restaurantController");
const { login } = require("../auth/auth");
const { verify } = require("../auth/auth");

// Admin Pages
router.get("/login", controller.displayLogin);
router.post("/login", login, controller.handleLogin);
router.get("/adduser", controller.displayRegister);
router.post("/adduser", controller.postNewUser);
router.get("/addtospecials", controller.getAddToSpecials);
router.post("/addtospecials", controller.handleSaveToSpecials);
router.get("/logout", controller.logout);
router.get("/menus/additem", verify, controller.getMenuItem);
router.post("/additem", verify, controller.postMenuItem);
router.get("/menus/deleteItem", verify, controller.getDeleteItem);
router.post("/deleteitem", verify, controller.postDeleteItem);
router.get("/menus/selectitem", verify, controller.selectItem);
router.post("/selectitem", verify, controller.postSelectItem);
router.post("/edititem", controller.postEditItem);
router.get("/admin", verify, controller.displayAdmin);
router.get("/deleteuser", verify, controller.getDeleteUser);
router.post("/deleteuser", verify, controller.postDeleteUser);
router.get("/viewmessages", verify, controller.viewMessages);

//User Pages
router.get("/", controller.getHome);
router.get("/menus", controller.getMenus);
router.get("/menus/dinner", controller.getDinner);
router.get("/menus/lunch", controller.getLunchMenu);
router.get("/menus/specials", controller.getSpecials);
router.get("/aboutus", (req, res) => {
	res.render("aboutUs", { title: "About us" });
});
router.get("/contact", controller.getContact);
router.post("/contact", controller.handleContact);

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
