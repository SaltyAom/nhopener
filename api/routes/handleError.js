const Route = require("express").Router(),
	{ join } = require("path")

Route.get("*", (req, res) =>
	res.status(404).sendFile(join(__dirname, "../frontend/html/404.html"))
)

module.exports = Route