import { RunFunction } from "../../interfaces/Command";
import axios from "axios";

export const run: RunFunction = async (client, message, args, prefix) => {
	var options: any = {
		url: "https://v2.jokeapi.dev/joke/Any?safe-mode?type=twopart",
		method: "GET",
	};
	axios.request(options).then(async (response) => {
		return await message.channel.send(
			client.embed(
				{
					description: `${response.data.setup}\n\n||${response.data.delivery}||`,
				},
				message
			)
		);
	});
};

export const name: string = "joke";
export const category: string = "Fun";
export const description: string = "Get a random joke";
