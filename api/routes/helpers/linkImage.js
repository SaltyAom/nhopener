const linkPage = require("./linkPage")

/**
 * Adjust image for easier usage
 * @param {ImageCollection} images 
 * @param {(string|number)} media_id
 * @param {LinkImageOptions} options
 */
const linkImage = (images, media_id, options) => {
	let { pages, cover } = images,
		parsed = {
			pages: [],
			cover
		}

	let { includePages } = options

	if(includePages)
		pages.map((page, index) =>
			parsed.pages.push(
				linkPage({
					page: page,
					media_id: media_id,
					atPage: index + 1
				})
			)
		)

	parsed.cover = linkPage({
		page: cover,
		media_id: media_id,
		atPage: "cover",
		prefix: "t"
	})

	return parsed
}

/**
 * Required property of 'images'
 * @typedef ImageCollection - Collection of image's data
 * @type {object}
 * @property {ImageData[]} pages
 * @property {ImageData} cover 
 */

 /**
  * Image's data
  * @typedef ImageData Image's inner data
  * @type {object}
  * @property {string} t Image's type
  * @property {number} w Image's width
  * @property {number} h Image's height
  */

/**
 * Link Image's function options.
 * @typedef LinkImageOptions
 * @property {boolean} includePages Include normal pages
 */

module.exports = linkImage
