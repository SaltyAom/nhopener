const Route = require("express").Router(),
	Axios = require("axios")

const linkImage = require("./helpers/linkImage"),
	filterTag = require("./helpers/filterTag"),
	sanitize = require("./helpers/sanitize")

Route.get("/:id", async (req, res) => {
	let { id } = req.params,
		{ data } = await Axios(`https://nhentai.net/api/gallery/${id}`)

	let {
		title,
		media_id,
		images,
		num_pages,
		num_favorites,
		upload_date,
		tags
	} = data

	return res.json(
		JSON.parse(`{
            "success": ${true},
            "id": "${id}",
            "title": {
                "display": "${sanitize(title.pretty)}",
                "english": "${sanitize(title.english)}",
                "japanese": "${sanitize(title.japanese)}"
            },
            "images": ${JSON.stringify(
				linkImage(images, media_id, {
					includePages: true
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
})

module.exports = Route
