import { RunFunction } from '../../interfaces/Event';
import { Message } from 'discord.js';
import { Command } from '../../interfaces/Command';
import db from 'quick.db';
import ms from 'ms';
import checkIfDisabled from '../../functions/checkIfDisabled';

export const run: RunFunction = async (client, message: Message) => {
	if (message.author.bot || !message.guild) return;
	if (checkIfDisabled(message, 'leveling') === false) {
		const randomXp: number = Math.floor(Math.random() * 10) + 1;
		let currentLevel = await db.get(
			`${message.author.id}-${message.guild.id}-level`
		);
		if (!currentLevel) {
			const newProfile = {
				guildID: message.guild.id,
				userID: message.author.id,
				level: Math.floor(0.1 * Math.sqrt(randomXp)),
				xp: randomXp,
			};

			currentLevel = await db.set(
				`${message.author.id}-${message.guild.id}-level`,
				newProfile
			);
		}

		const appendXp = await db.set(
			`${message.author.id}-${message.guild.id}-level.xp`,
			currentLevel.xp + randomXp
		);
		if (
			Math.floor(0.1 * Math.sqrt((appendXp.xp -= randomXp))) > appendXp.level ||
			appendXp.xp >= (appendXp.level + 1) * (appendXp.level + 1) * 100
		) {
			message.channel.send(
				client.embed(
					{
						description: `LEVEL UP! Congratulations ${
							message.author
						} on leveling up to level **${appendXp.level + 1}**!`,
					},
					message
				)
			);
			await db.set(
				`${message.author.id}-${message.guild.id}-level.level`,
				appendXp.level + 1
			);
			await db.set(`${message.author.id}-${message.guild.id}-level.xp`, 0);
		}
	}

	let prefix: string = (await db.get(`${message.guild.id}-prefix`)) || 'g?';
	if (
		message.content.toLowerCase().startsWith(`<@!${client.user.id}>`) ||
		message.content.toLowerCase().startsWith(`<@${client.user.id}>`)
	)
		return message.channel.send(
			client.embed({ description: `My prefix is \`${prefix}\`` }, message)
		);
	if (!message.content.toLowerCase().startsWith(prefix)) return;

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
	command.run(client, message, args, prefix).catch((reason: any) => {
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
