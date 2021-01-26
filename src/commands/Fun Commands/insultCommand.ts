import { RunFunction } from "../../interfaces/Command";
import axios from "axios";

export const run: RunFunction = async (client, message, args, prefix) => {
	var options: any = {
		method: "GET",
		url: "https://evilinsult.com/generate_insult.php?lang=en&amp;type=json",
	};

	axios.request(options).then(async (response) => {
		return await message.channel.send(
			client.embed({ description: response.data }, message)
		);
	});
};

export const name: string = "insult";
export const category: string = "Fun";
export const description: string = "Insult someone";
export const aliases: string[] = ["roast"];
