import { RunFunction } from "../../interfaces/Command";
import cheerio from "cheerio";
import request from "request";

export const run: RunFunction = async (client, message, args, prefix) => {
	function image(message) {
		var options = {
			url: "http://results.dogpile.com/serp?qc=images&q=" + "guinea pig",
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

			let randomize = [
				"Piggy!",
				"awww",
				"Guinea pig!",
				"🐹",
				"r/guineapigs",
				"Snuggle time!",
				"G u i n e a p i g",
				"P i g g y",
				"Guinea pog",
			];
			let messageTitle: string;
			let randomTitle = Math.floor(Math.random() * randomize.length);
			messageTitle = randomize[randomTitle];

			return await message.channel.send(
				client
					.embed({ title: messageTitle }, message)
					.setImage(urls[Math.floor(Math.random() * urls.length)])
			);
		});
	}
	image(message);
};

export const name: string = "guineapig";
export const category: string = "Fun";
export const description: string = "Random picture of a Guinea Pig";
export const aliases: string[] = ["pig"];
