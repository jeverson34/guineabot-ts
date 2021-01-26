import { RunFunction } from "../../interfaces/Command";
import image from "../../functions/image";

export const run: RunFunction = async (client, message, args, prefix) => {
	if (!args.length)
		return await message.channel.send(
			client.embed({ description: "Please enter a query." }, message)
		);
	let search: string = args.slice(0).join(" ");
	image(message, client, search);
};

export const name: string = "image";
export const category: string = "Fun";
export const description: string = "Search for an image";
export const aliases: string[] = ["i"];
