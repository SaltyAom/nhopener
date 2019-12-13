/**
 * Adjust tags for easier usage.
 * @param {Tags[]} tags
 * @returns {FilteredTag}
 */
const filterTag = tags => {
	let artist = "", language = "", parsedTag = []

	tags.filter((tag) => {
		let { type = "", name = "", url = "", count = 0 } = tag

		if (type === "artist" || type === "group")
			return artist = JSON.parse(`{
                "name": "${name}",
                "count": ${count},
                "url": "https://nhentai.net${url}"
            }`)

        if (type === "language")
            return language = name

        if (type === "tag")
            return parsedTag.push(
                JSON.parse(`{
                    "name": "${name}",
                    "count": ${count},
                    "url": "https://nhentai.net${url}"
                }`)
            )
    })
    
	return JSON.parse(`{
        "artist": ${JSON.stringify(artist)},
        "tags": ${JSON.stringify(parsedTag)},
        "language": "${language}"
    }`)
}

/**
 * @typedef Tags Tag's structure
 * @type {object}
 * @property {string} url
 * @property {number} count
 * @property {string} type
 * @property {number} id
 * @property {string} name
 */

 /**
 * @typedef ParsedTag Parsed tag's metadata
 * @type {object}
 * @property {string} name
 * @property {number} count
 * @property {string} url
 */

/**
  * @typedef FilteredTag Filtered tags' data
  * @type {object}
  * @property {ParsedTag} artist Artist's data
  * @property {ParsedTag[]} tags Parsed tags' metadata
  * @property {(string | null)} language Displayed language - Return null on undefined
  */

module.exports = filterTag