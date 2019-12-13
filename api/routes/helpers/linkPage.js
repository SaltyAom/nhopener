const linkImage = require("./linkImage")

/**
 * Parameter's structure.
 * @typedef PageData
 * @type {object}
 * @property {ImageData} page
 * @property {string} media_id
 * @property {(string|number)} atPage Specify page's number
 * @property {string} prefix Subdomain's prefix
 */

 /**
  * @typedef LinkedPage
  * @type {object}
  * @property {string} link Parsed link
  * @property {ParsedInfo} info Parsed Info
  */

/**
 * Adjust image for easier usage
 * @param {PageData} pageData
 * @returns {LinkedPage} Parsed page's data
 */
const linkPage = (pageData) => {
    let { page, media_id, atPage, prefix = "i" } = pageData

	let { t, w, h } = page,
		type = {
			j: "jpg",
			p: "png",
			g: "gif"
		}

	return JSON.parse(`{
        "link": "https://${prefix}.nhentai.net/galleries/${media_id}/${atPage}.${type[t]}",
        "info": {
            "type": "${type[t]}",
            "width": ${w},
            "height": ${h}
        }
    }`)
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
  * Parsed page's information
  * @typedef ParsedInfo
  * @type {object}
  * @property {string} t Image's type
  * @property {number} w Image's width
  * @property {number} h Image's height
  */

module.exports = linkPage