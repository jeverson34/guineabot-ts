import { RunFunction } from "../../interfaces/Command";
import reverse from "../../functions/reverse";

export const run: RunFunction = async (client, message, args, prefix) => {
	if (!args.length)
		return await message.channel.send(
			client.embed({ description: "Please input some text" }, message)
		);
	return await message.channel.send(
		client.embed({ description: reverse(args.slice(0).join(" ")) }, message)
	);
};

export const name: string = "reverse";
export const category: string = "Utility";
export const description: string = "Make text backwards";
