const express = require("express");
const app = express();
const router = require("./routes/restuarntRoutes");

app.use(express.urlencoded({ extended: false }));

const path = require("path");
app.use("/", router);
const public = path.join(__dirname, "public");

const mustache = require("mustache-express");
app.engine("mustache", mustache());
app.set("view engine", "mustache");

const $PORT = 3001;

app.listen($PORT, () => {
	console.log(`Server atarted on port: ${$PORT}`);
});
