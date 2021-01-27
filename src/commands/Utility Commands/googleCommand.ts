import { RunFunction } from "../../interfaces/Command";
import search from "../../functions/searchGoogle";
import ms from "ms";

export const run: RunFunction = async (client, message, args, prefix) => {
	if (!args.length)
		return await message.channel.send(
			client.embed(
				{ description: "Please enter a search query" },
				message
			)
		);
	const results = await search(client, args.join(" "));
	if (!results)
		return await message.channel.send(
			client.embed({ description: "No results found." }, message)
		);
	return await message.channel.send(
		client
			.embed(
				{
					title: results.title,
					description: results.snippet,
					url: results.link,
				},
				message
			)
			.setImage(
				results.pagemap ? results.pagemap.cse_thumbnail[0].src : null
			)
	);
};

export const name: string = "google";
export const category: string = "Utility";
export const description: string = "Surf the web";
export const cooldown: number = ms("30s");
