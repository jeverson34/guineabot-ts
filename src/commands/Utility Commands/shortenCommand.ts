import { RunFunction } from "../../interfaces/Command";
import request from "request";
import ms from "ms";

export const run: RunFunction = async (client, message, args, prefix) => {
	if (!args.length)
		return await message.channel.send(
			client.embed({ description: "Please enter the URL" }, message)
		);
	let linkregex = /(http|https):\/\/[^ "]+/g;
	if (linkregex.test(args.slice(0).join(" "))) {
		const options = {
			method: "POST",
			url: "https://url-shortener-service.p.rapidapi.com/shorten",
			headers: {
				"content-type": "application/x-www-form-urlencoded",
				"x-rapidapi-key": client.config.rapid_api_key,
				"x-rapidapi-host": "url-shortener-service.p.rapidapi.com",
				useQueryString: true,
			},
			form: {
				url: args.join(" "),
			},
		};

		request(options, function (error, response, body) {
			if (error)
				return message.channel.send(
					client.embed(
						{ description: `An error occurred: ${error.message}` },
						message
					)
				);
			let url = JSON.parse(body);
			let msg = "";

			if (url.hasOwnProperty("result_url"))
				msg = "<" + url.result_url + ">";
			else if (url.hasOwnProperty("error")) msg = url.error;

			return message.channel.send(
				client.embed({ description: msg }, message)
			);
		});
	} else
		return await message.channel.send(
			client.embed(
				{
					description:
						"For safety reasons, please include the URL's protocol (all in lowercase letters).",
				},
				message
			)
		);
};

export const name: string = "shorten";
export const category: string = "Utility";
export const description: string = "Shorten a URL";
export const cooldown: number = ms("1m");
