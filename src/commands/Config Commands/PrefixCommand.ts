import { RunFunction } from '../../interfaces/Command';

export const name: string = 'prefix';
export const category: string = 'Server Configuration';

export const run: RunFunction = async (client, message, args) => {
	const guildConfigSchema = await client.db.load('guildConfig');
	const guildConfig = await guildConfigSchema.findOne({
		guild: message.guild.id,
	});

	if (!args.length)
		return await message.channel.send(
			client.embed(
				{
					description: `**Current Prefix:** ${
						(guildConfig as any)?.prefix || 'g?'
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

	await guildConfigSchema.update(
		{ guild: message.guild.id },
		{ prefix: args[0].toLowerCase() }
	);
	return await message.channel.send(
		client.embed(
			{
				description: `Done! The prefix is now set to ${args[0].toLowerCase()}`,
			},
			message
		)
	);
};
