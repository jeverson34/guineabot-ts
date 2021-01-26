import { RunFunction } from "../../interfaces/Command";
import cheerio from "cheerio";
import request from "request";

export const run: RunFunction = async (client, message, args, prefix) => {
	if (!args.length)
		return await message.channel.send(
			client.embed({ description: "Please enter a query." }, message)
		);
	let search: string = args.slice(0).join(" ");
	function image(message) {
		var options = {
			url: "http://results.dogpile.com/serp?qc=images&q=" + search,
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
						{ title: `Showing results for "${search}"` },
						message
					)
					.setImage(urls[Math.floor(Math.random() * urls.length)])
			);
		});
	}
	image(message);
};

export const name: string = "image";
export const category: string = "Fun";
export const description: string = "Search for an image";
export const aliases: string[] = ["i"];
