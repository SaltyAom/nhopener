const Route = require("express").Router(),
	Axios = require("axios")

const linkImage = require("./helpers/linkImage"),
	filterTag = require("./helpers/filterTag"),
	sanitize = require("./helpers/sanitize")

Route.get("/tag", async (req, res) =>
	res.json({
		success: false,
		info: "parameter :tag is required eg: /tag/tailjob"
	})
)

Route.get("/tag/:tag", async (req, res) => {
	let { tag } = req.params

	try {
		let { data } = await Axios(
			`https://nhentai.net/api/galleries/search?query=${tag}`
		)
		return res.json(calculate(data))
	} catch (err) {
		return es.json({
			success: false,
			info: `${tag} isn't existed`
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
                        "parsed": "${new Date(upload_date).toLocaleDateString(
							"en-US"
						)}"
                    }
                },
                "metadata": ${JSON.stringify(filterTag(tags))}
            }`)
			)
	)

	return JSON.parse(`{
            "success": ${true},
            "stories": ${JSON.stringify(related)}
        }`)
}

module.exports = Route
