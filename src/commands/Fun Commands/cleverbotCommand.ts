import { RunFunction } from "../../interfaces/Command";
import cleverbot from "cleverbot-free";

export const run: RunFunction = async (client, message, args, prefix) => {
	if (!args.length)
		return await message.channel.send(
			client.embed({ description: "Please input some text." }, message)
		);
	return await cleverbot(args.slice(0).join(" ")).then(async (response) => {
		return await message.channel.send(
			client.embed({ description: response }, message)
		);
	});
};

export const name: string = "cleverbot";
export const category: string = "Fun";
export const description: string = "Smart chat bot (no context)";
export const aliases: string[] = ["clever"];
