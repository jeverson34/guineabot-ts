import { RunFunction } from '../../interfaces/Event';
import { Message } from 'discord.js';
import { Command } from '../../interfaces/Command';
import ms from 'ms';

export const run: RunFunction = async (client, message: Message) => {
	const guildConfigSchema = await client.db.load('guildConfig');
	const guildConfig = await guildConfigSchema.findOne({
		guild: message.guild.id,
	});
	let prefix: string = 'g?';
	if ((guildConfig as any)?.prefix) {
		prefix = (guildConfig as any).prefix;
	}
	if (
		message.author.bot ||
		!message.guild ||
		!message.content.toLowerCase().startsWith(prefix)
	)
		return;

	const args: string[] = message.content
		.slice(prefix.length)
		.trim()
		.split(/ +/g);
	const cmd: string = args.shift();
	const command: Command =
		client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
	if (!command) return;
	if (client.cooldowns.has(`${message.author.id}-${command.name}`))
		return await message.channel.send(
			client.embed(
				{
					description: `You must wait ${ms(
						client.cooldowns.get(`${message.author.id}-${command.name}`) -
							Date.now(),
						{ long: true }
					)} before using this command again!`,
				},
				message
			)
		);
	command.run(client, message, args).catch((reason: any) => {
		message.channel.send(
			client.embed({ description: `An error occurred: ${reason}` }, message)
		);
		return client.logger.error(reason);
	});
	client.cooldowns.set(
		`${message.author.id}-${command.name}`,
		Date.now() + command.cooldown
	);
	setTimeout(() => {
		client.cooldowns.delete(`${message.author.id}-${command.name}`);
	}, command.cooldown);
};

export const name: string = 'message';
