import { RunFunction } from "../../interfaces/Command";
import db from "quick.db";
import bin from "sourcebin_js";

export const run: RunFunction = async (client, message, args, prefix) => {
	if (message.author.id !== client.config.bot_owner_id)
		return await message.channel.send(
			client.embed(
				{ description: "You are not permitted to run this command." },
				message
			)
		);

	if (args[0].toLowerCase() === "get") {
		if (!args[1])
			return await message.channel.send(
				client.embed(
					{ description: "Please enter the database ID" },
					message
				)
			);
		const results = await db.get((args as any[]).splice(1).join(" "));
		return await message.channel.send(
			client.embed(
				{
					description: `\`\`\`\n${JSON.stringify(
						results,
						null,
						4
					)}\n\`\`\``,
				},
				message
			)
		);
	} else if (args[0].toLowerCase() === "delete") {
		if (!args[1])
			return await message.channel.send(
				client.embed(
					{ description: "Please enter the database ID" },
					message
				)
			);
		const results = await db.delete((args as any[]).splice(1).join(" "));
		return await message.channel.send(
			client.embed(
				{
					title: `Successfully deleted ${(args as any[])
						.splice(1)
						.join(" ")}`,
				},
				message
			)
		);
	} else if (args[0].toLowerCase() === "set") {
		if (!args[1])
			return await message.channel.send(
				client.embed(
					{ description: "Please enter the database ID" },
					message
				)
			);

		if (!args[2])
			return await message.channel.send(
				client.embed(
					{ description: "Please enter the database ID" },
					message
				)
			);

		const results = await db.set(
			args[1],
			(args as any[]).splice(2).join(" ")
		);
		return await message.channel.send(
			client.embed(
				{
					description: `\`\`\`\n${JSON.stringify(
						results,
						null,
						4
					)}\n\`\`\``,
				},
				message
			)
		);
	} else if (args[0].toLowerCase() === "all") {
		const results = await db.all();
		const URL = await bin
			.create(
				[
					{
						name: "GuineaBot/Cy1der",
						content: JSON.stringify(results, null, 4),
						languageId: "JSON",
					},
				],
				{
					title: "Guineabot Database",
					description: " ",
				}
			)
			.then((bin) => {
				return bin.url;
			});
		return await message.channel.send(
			client.embed({ title: "Complete Database", url: URL }, message)
		);
	} else
		return await message.channel.send(
			client.embed(
				{
					description:
						"Invalid option. Must be `all`, `set`, `delete`, `get`.",
				},
				message
			)
		);
};

export const name: string = "database";
export const category: string = "Admin";
export const description: string = "Edit the database";
export const aliases: string[] = ["db"];
