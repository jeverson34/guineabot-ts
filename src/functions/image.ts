import cheerio from "cheerio";
import request from "request";

function image(message, client, query) {
	var options = {
		url: "http://results.dogpile.com/serp?qc=images&q=" + query,
		method: "GET",
		headers: {
			Accept: "text/html",
			"User-Agent": "Chrome",
		},
	};

	request(options, async function (error, response, responseBody) {
		if (error) return;

		let $ = cheerio.load(responseBody);

		var links = $(".image a.link");
		var urls = new Array(links.length)
			.fill(0)
			.map((v, i) => links.eq(i).attr("href"));

		if (!urls.length) return;

		return await message.channel.send(
			client
				.embed(
					{ title: `Showing search result for "${query}"` },
					message
				)
				.setImage(urls[Math.floor(Math.random() * urls.length)])
		);
	});
}

export default image;
