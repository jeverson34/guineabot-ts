import { RunFunction } from '../../interfaces/Command';
import db from 'quick.db';
import checkIfDisabled from '../../functions/checkIfDisabled';

export const run: RunFunction = async (client, message, args, prefix) => {
	if (checkIfDisabled(message, 'leveling') === true)
		return await message.channel.send(
			client.embed(
				{ description: 'Leveling commands are disabled in this server.' },
				message
			)
		);
	const all = db.all();
	let validUsers = [];
	let str: string = '';

	for (let i = 0; i < all.length; i++) {
		if (all[i].ID.includes(`-${message.guild.id}-level`)) {
			validUsers.push(all[i]);
		}
	}

	validUsers
		.sort(
			(a, b) =>
				b.data.level * b.data.level * 100 +
				b.data.xp -
				(a.data.level * a.data.level * 100 + a.data.xp)
		)
		.slice(0, 5)
		.forEach((user, index) => {
			const member = message.guild.members.cache.get(user.data.userID);
			str += `${index + 1}. ${member} - Level ${user.data.level} - ${
				user.data.xp
			} XP\n`;
		});
	return await message.channel.send(
		client.embed(
			{
				title: `${message.guild.name}'s most active members`,
				description: str,
			},
			message
		)
	);
};

export const name: string = 'leaderboard';
export const category: string = 'Leveling';
export const description: string = 'View most active members';
export const aliases: string[] = ['lb'];
