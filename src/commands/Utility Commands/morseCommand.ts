import { RunFunction } from "../../interfaces/Command";
import morse from "../../functions/morse";

export const run: RunFunction = async (client, message, args, prefix) => {
	if (!args.length)
		return await message.channel.send(
			client.embed(
				{
					description:
						"Please input the function of `encode` or `decode`.",
				},
				message
			)
		);

	let choice = ["encode", "decode"];
	if (!choice.includes(args[0].toLowerCase()))
		return await message.channel.send(
			client.embed(
				{
					description:
						"Please input the function of `encode` or `decode`.",
				},
				message
			)
		);

	let textIn = args.slice(1).join(" ");
	if (!textIn)
		return await message.channel.send(
			client.embed({ description: "Please input some text." }, message)
		);

	return await message.channel.send(
		client.embed(
			{ description: await morse[args[0].toLowerCase()](client, textIn) },
			message
		)
	);
};

export const name: string = "morse";
export const category: string = "Utility";
export const description: string = "Encode or decode text to morse code";
