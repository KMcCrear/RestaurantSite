const express = require("express");
const router = express.Router();
const controller = require("../controllers/restaurantController");

router.get("/", controller.getMenus);

router.get("/menus/alacarte", controller.getLaCarte);

router.get("/menusdrinkmenu", controller.getSetMenu);

router.get("/menus/drinksmenu", controller.getDrinksMenu);

router.get("/login", controller.login);

module.exports = router;
