const express = require("express"),
	app = express(),
	{ join } = require("path")

const getData = require("./routes/getData"),
	getRelated = require("./routes/getRelated"),
	getTag = require("./routes/getTag"),
	handleError = require("./routes/handleError")

const apicache = require("apicache").middleware,
	helmet = require("helmet"),
	cors = require("cors")

app.use(apicache("12 hours"))
app.use(helmet())
app.use(cors())
app.use("/src", express.static(join(__dirname, "frontend/src")))

app.use(getData)
app.use(getRelated)
app.use(getTag)

app.get("/", (req, res) =>
	res.json({
		success: true,
		available: ["/:id", "/:id/related", "/tag/:tag"]
	})
)

app.use(handleError)

app.listen(3000, () => null)