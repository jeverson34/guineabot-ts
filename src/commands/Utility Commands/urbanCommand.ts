import { RunFunction } from "../../interfaces/Command";
import urban from "relevant-urban";

export const run: RunFunction = async (client, message, args, prefix) => {
	if (!args.length)
		return await message.channel.send(
			client.embed(
				{ description: "Please specify the word phrase" },
				message
			)
		);
	let result = await urban(args.slice(0).join(" ")).catch(async () => {
		return await message.channel.send(
			client.embed({ description: "No results found" }, message)
		);
	});
	let definition = result.definition.replace(/\[/g, "").replace(/\]/g, "");
	let example = result.example.replace(/\[/g, "").replace(/\]/g, "");

	let embed = client
		.embed(
			{
				title: result.word,
				url: result.urbanURL,
				description: `**Definition:**\n${definition}\n\n**Example:**\n${example}`,
			},
			message
		)
		.addFields(
			{
				name: "Author",
				value: result.author,
				inline: true,
			},
			{
				name: "Rating",
				value: `👍 ${result.thumbsUp.toLocaleString()} | 👎 ${result.thumbsDown.toLocaleString()}`,
			}
		);

	if (result.tags.length > 0) {
		embed.addField(
			"Tags",
			result.tags.join(", ").length > 1024
				? result.tags.join(", ").substr(0, 1021) + "..."
				: result.tags.join(", ")
		);
	}

	return await message.channel.send(embed);
};

export const name: string = "urban";
export const category: string = "Utility";
export const description: string = "Urban dictionary";
