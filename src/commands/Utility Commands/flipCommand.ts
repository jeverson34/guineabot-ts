import { RunFunction } from "../../interfaces/Command";
import flip from "flip-text";

export const run: RunFunction = async (client, message, args, prefix) => {
	if (!args.length)
		return await message.channel.send(
			client.embed({ description: "Please input some text" }, message)
		);
	return await message.channel.send(
		client.embed({ description: flip(args.slice(0).join(" ")) }, message)
	);
};

export const name: string = "flip";
export const category: string = "Utility";
export const description: string = "Flip text upside down";
