import { RunFunction } from "../../interfaces/Command";
import axios from "axios";

export const run: RunFunction = async (client, message, args, prefix) => {
	axios
		.get("https://useless-facts.sameerkumar.website/api")
		.then(async (response) => {
			return await message.channel.send(
				client.embed({ description: response.data.data }, message)
			);
		});
};

export const name: string = "fact";
export const category: string = "Fun";
export const description: string = "Get a random useless fact";
