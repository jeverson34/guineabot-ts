import { RunFunction } from "../../interfaces/Command";
import db from "quick.db";

export const run: RunFunction = async (client, message, args, prefix) => {
	if (!message.member.permissions.has("ADMINISTRATOR"))
		return await message.channel.send(
			client.embed(
				{
					description:
						"You must have the administrator permission to run this command!",
				},
				message
			)
		);

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

	await db.set(`${target.id}-${message.guild.id}-level.xp`, 0);
	const newInfo2 = await db.set(
		`${target.id}-${message.guild.id}-level.level`,
		0
	);

	return await message.channel.send(
		client.embed(
			{
				description: `Successfully edited ${target}'s XP profile.\nXP set to 0.\nLevel set to 0.`,
			},
			message
		)
	);
};

export const name: string = "resetprofile";
export const category: string = "Leveling";
export const description: string = "Set an XP profile to 0";
