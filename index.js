const express = require("express");
const app = express();
const router = require("./routes/restuarntRoutes");
require("dotenv").config();

const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));

const path = require("path");
app.use("/", router);
const public = path.join(__dirname, "public");
app.use(express.static(public));

const mustache = require("mustache-express");
app.engine("mustache", mustache());
app.set("view engine", "mustache");

const $PORT = process.env.PORT;
//const $PORT = 3001;

app.listen($PORT, () => {
	console.log(`Server atarted on port: ${$PORT}`);
});
