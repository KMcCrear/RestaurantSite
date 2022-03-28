const express = require("express");
const app = express();
const router = require("./routes/restuarntRoutes");

app.use(express.urlencoded({ extended: false }));

const path = require("path");
app.use("/", router);

const $PORT = 3001;

app.listen($PORT, () => {
	console.log(`Server atarted on port: ${$PORT}`);
});
