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
	const amount = parseInt(
		target === message.mentions.users.first() ? args[1] : args[0]
	);
	if (!amount)
		return await message.channel.send(
			client.embed(
				{ description: "Please enter the amount of xp to remove" },
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

	if ((userInfo.xp -= amount) < 0)
		return await message.channel.send(
			client.embed(
				{ description: "Invalid number, result will be negative" },
				message
			)
		);

	const newInfo1 = await db.set(
		`${target.id}-${message.guild.id}-level.xp`,
		(userInfo.xp -= amount)
	);
	const newInfo2 = await db.set(
		`${target.id}-${message.guild.id}-level.level`,
		Math.floor(0.1 * Math.sqrt(newInfo1.xp))
	);

	return await message.channel.send(
		client.embed(
			{
				description: `Successfully edited ${target}'s XP profile.\nXP set to ${newInfo2.xp}.\nLevel set to ${newInfo2.level} to accommodate.`,
			},
			message
		)
	);
};

export const name: string = "removexp";
export const category: string = "Leveling";
export const description: string = "Remove XP to someone's XP profile";
export const aliases: string[] = ["-xp"];
