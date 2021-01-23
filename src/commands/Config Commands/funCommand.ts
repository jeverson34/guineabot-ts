import { RunFunction } from "../../interfaces/Command";
import db from "quick.db";

export const run: RunFunction = async (client, message, args, prefix) => {
	if (!message.member.permissions.has("ADMINISTRATOR"))
		return await message.channel.send(
			client.embed(
				{
					description: `You must have the administrator permission to run this command!`,
				},
				message
			)
		);

	const current = await db.get(`${message.guild.id}-fun`);
	if (!current) await db.set(`${message.guild.id}-fun`, "on");

	if (!args.length)
		return await message.channel.send(
			client.embed(
				{ description: `Fun commands are turned **${current}**.` },
				message
			)
		);
	if (args[0].toLowerCase() !== "on" && args[0].toLowerCase() !== "off")
		return await message.channel.send(
			client.embed(
				{ description: `Invalid option! Must be on or off.` },
				message
			)
		);
	if (args[0].toLowerCase() === current)
		return await message.channel.send(
			client.embed(
				{
					description: `Fun commands are already turned **${current}**!`,
				},
				message
			)
		);

	const newOption = await db.set(
		`${message.guild.id}-fun`,
		args[0].toLowerCase()
	);
	return await message.channel.send(
		client.embed(
			{
				description: `Successfully turned **${newOption}** fun commands.`,
			},
			message
		)
	);
};

export const name: string = "fun";
export const category: string = "Server Configuration";
export const description: string = "Enable/Disable fun commands.";
