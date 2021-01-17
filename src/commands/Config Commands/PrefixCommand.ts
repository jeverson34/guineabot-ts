import { RunFunction } from '../../interfaces/Command';
import db from "quick.db";

export const name: string = 'prefix';
export const category: string = 'Server Configuration';

export const run: RunFunction = async (client, message, args) => {
	if (!args.length)
		return await message.channel.send(
			client.embed(
				{
					description: `**Current Prefix:** ${
						db.get(`${message.guild.id}-prefix`) || 'g?'
					}`,
				},
				message
			)
		);
	if (!message.member.permissions.has('ADMINISTRATOR'))
		return await message.channel.send(
			client.embed(
				{
					description: `You must have the administrator permission to run this command!`,
				},
				message
			)
		);
	if (args[0].length > 3)
		return await message.channel.send(
			client.embed(
				{ description: `The prefix must not be over 3 characters long!` },
				message
			)
		);
	if (args[1])
		return await message.channel.send(
			client.embed(
				{ description: `The prefix must not include a whitespace!` },
				message
			)
		);

	await db.set(`${message.guild.id}-prefix`, args[0].toLowerCase())
	return await message.channel.send(
		client.embed(
			{
				description: `Done! The prefix is now set to ${args[0].toLowerCase()}`,
			},
			message
		)
	);
};
