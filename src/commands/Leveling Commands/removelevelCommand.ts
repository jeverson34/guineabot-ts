import { RunFunction } from '../../interfaces/Command';
import db from 'quick.db';

export const run: RunFunction = async (client, message, args, prefix) => {
	if (!message.member.permissions.has('ADMINISTRATOR'))
		return await message.channel.send(
			client.embed(
				{
					description:
						'You must have the administrator permission to run this command!',
				},
				message
			)
		);

	const target = message.mentions.users.first() || message.author;
	const amount = parseInt(
		target === message.mentions.users.first() ? args[1] : args[0]
	);
	if (!amount)
		return await message.channel.send(
			client.embed(
				{ description: 'Please enter the amount of levels to remove' },
				message
			)
		);

	var userInfo = await db.get(`${target.id}-${message.guild.id}-level`);
	if (!userInfo) {
		const newProfile = {
			guildID: message.guild.id,
			userID: message.author.id,
			level: 0,
			xp: 0,
		};

		userInfo = await db.set(
			`${target.id}-${message.guild.id}-level`,
			newProfile
		);
	}

	if ((userInfo.level -= amount) < 0)
		return await message.channel.send(
			client.embed(
				{ description: 'Invalid number, result will be negative' },
				message
			)
		);

	const newInfo1 = await db.set(
		`${target.id}-${message.guild.id}-level.level`,
		(userInfo.level -= amount)
	);
	const newInfo2 = await db.set(
		`${target.id}-${message.guild.id}-level.xp`,
		newInfo1.level * newInfo1.level * 100
	);

	return await message.channel.send(
		client.embed(
			{
				description: `Successfully edited ${target}'s XP profile.\nLevel set to ${newInfo2.level}.\nXP set to ${newInfo2.xp} to accommodate.`,
			},
			message
		)
	);
};

export const name: string = 'removelevel';
export const category: string = 'Leveling';
export const description: string = "Remove levels to someone's XP profile";
export const aliases: string[] = ['-lvl'];
