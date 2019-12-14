const Route = require("express").Router(),
	Axios = require("axios")

const linkImage = require("./helpers/linkImage"),
	filterTag = require("./helpers/filterTag"),
	sanitize = require("./helpers/sanitize")

Route.get("/:id/related", async (req, res, next) => {
	let { id } = req.params

	if (parseInt(id.length) > 6 || isNaN(parseInt(id))) return next()

	try {
		let { data } = await Axios(
			`https://nhentai.net/api/gallery/${id}/related`
		)
		return res.json(calculate(data))
	} catch (err) {
		return res.json({
			success: false,
			info: `${id} isn't existed`
		})
	}
})

const calculate = data => {
	let related = []

	data.result.map(
		({
			id,
			title,
			media_id,
			images,
			num_pages,
			num_favorites,
			upload_date,
			tags
		}) =>
			related.push(
				JSON.parse(`{
				"id": "${id}",
				"title": {
					"display": "${sanitize(title.pretty)}",
					"english": "${sanitize(title.english)}",
					"japanese": "${sanitize(title.japanese)}"
				},
				"images": ${JSON.stringify(
					linkImage(images, media_id, {
						includePages: false
					})
				)},
				"info": {
					"amount": ${num_pages},
					"favorites": ${num_favorites},
					"upload": {
						"original": ${upload_date},
						"parsed": "${new Date(upload_date).toLocaleDateString("en-US")}"
					}
				},
				"metadata": ${JSON.stringify(filterTag(tags))}
			}`)
			)
	)

	return JSON.parse(`{
		"success": ${true},
		"related": ${JSON.stringify(related)}
	}`)
}

module.exports = Route
