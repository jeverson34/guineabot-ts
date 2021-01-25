import { RunFunction } from "../../interfaces/Command";

export const run: RunFunction = async (client, message, args, prefix) => {
	return await message.channel.send(
		client.embed(
			{
				description:
					args.slice(0).join(" ").replace(/\s/g, " 👏 ").length > 2048
						? args.slice(0).join(" ").replace(/\s/g, " 👏 ")
						: args
								.slice(0)
								.join(" ")
								.replace(/\s/g, " 👏 ")
								.substr(0, 2045) + "...",
			},
			message
		)
	);
};

export const name: string = "clap";
export const category: string = "Fun";
export const description: string = "Hello 👏 world";
