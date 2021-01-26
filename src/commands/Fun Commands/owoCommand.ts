const owo = require("owoify-js").default;
import { RunFunction } from "../../interfaces/Command";

export const run: RunFunction = async (client, message, args, prefix) => {
	if (!args.length)
		return await message.channel.send(
			client.embed({ description: "Please input some text" }, message)
		);
	return await message.channel.send(
		client.embed(
			{
				description:
					owo(args.slice(0).join(" ")).length > 2048
						? owo(args.slice(0).join(" ")).substr(0, 2045) + "..."
						: owo(args.slice(0).join(" ")),
			},
			message
		)
	);
};

export const name: string = "owo";
export const category: string = "Fun";
export const description: string = "Owoify everything";
