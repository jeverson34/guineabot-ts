import { RunFunction } from "../../interfaces/Command";
import axios from "axios";

export const run: RunFunction = async (client, message, args, prefix) => {
	if (!args.length)
		return await message.channel.send(
			client.embed(
				{ description: "Please enter the search query" },
				message
			)
		);
	let URL =
		"https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=";

	var options = {
		method: "GET",
		url: URL + args.slice(0).join(" "),
	};

	axios.request(options as any).then(async (res) => {
		let names = [];
		let urls = [];
		let str = "";

		for (let i = 1; i < res.data[1].length; i++) {
			names.push(res.data[1][i]);
		}

		for (let j = 1; j < res.data[3].length; j++) {
			urls.push(res.data[3][j]);
		}

		for (let k = 0; k < names.length && k < urls.length; k++) {
			str += `[${names[k]}](${urls[k]})\n`;
		}

		if (str.length > 2048) str = str.substr(0, 2048);

		return await message.channel.send(
			client.embed(
				{
					title: `Showing search results for ${res.data[0]}`,
					description: str,
					url: res.data[3][0],
				},
				message
			)
		);
	});
};

export const name: string = "wikipedia";
export const category: string = "Utility";
export const description: string = "Wikipedia information";
export const aliases: string[] = ["wiki"]
