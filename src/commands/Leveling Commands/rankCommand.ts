import { RunFunction } from '../../interfaces/Command';
import db from 'quick.db';
import createBar from 'string-progressbar';
import { userInfo } from 'os';

export const run: RunFunction = async (client, message, args, prefix) => {
	const target = message.mentions.users.first() || message.author;
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
	const progress = createBar(
		(userInfo.level + 1) * (userInfo.level + 1) * 100,
		userInfo.xp === 0 ? 1 : userInfo.xp,
		40,
		'—',
		'🔵'
	);

	const percent = progress[1];

	return await message.channel.send(
		client.embed(
			{
				title: `${target.username}'s rank`,
				description: `**Current XP count:** ${
					userInfo.xp
				}\n**Current Level:** ${userInfo.level}\n**XP required to reach level ${
					userInfo.level + 1
				}:** ${
					(userInfo.level + 1) * (userInfo.level + 1) * 100 - userInfo.xp
				}\n\n\`${userInfo.level}〚${progress[0]}〛${
					userInfo.level + 1
				} (${parseFloat(percent as string).toFixed(1)} %)\``,
			},
			message
		)
	);
};

export const name: string = 'rank';
export const category: string = 'Leveling';
export const description: string = 'Display what level you are';
export const aliases: string[] = ['level'];
