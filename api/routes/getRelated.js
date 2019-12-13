const Route = require("express").Router(),
	Axios = require("axios")

const linkImage = require("./helpers/linkImage"),
	filterTag = require("./helpers/filterTag"),
	sanitize = require('./helpers/sanitize')

Route.get("/:id/related", async (req, res) => {
	let { id } = req.params,
		{ data } = await Axios(`https://nhentai.net/api/gallery/${id}/related`),
		related = []

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
                        "parsed": "${new Date(upload_date).toLocaleDateString(
							"en-US"
						)}"
                    }
                },
                "metadata": ${JSON.stringify(filterTag(tags))}
            }`)
			)
	)

	res.json(
		JSON.parse(`{
            "success": ${true},
            "related": ${JSON.stringify(related)}
        }`)
	)
})

module.exports = Route
