import { RunFunction } from "../../interfaces/Command";
import checkIfDisabled from "../../functions/checkIfDisabled";

export const run: RunFunction = async (client, message, args, prefix) => {
	if (checkIfDisabled(message, "music") === true)
		return await message.channel.send(
			client.embed(
				{ description: "Music commands are disabled in this server." },
				message
			)
		);
	if (!message.member.voice.channel)
		return await message.channel.send(
			client.embed(
				{ description: "You must be connected to a voice channel!" },
				message
			)
		);

	if (message.guild.me.voice.channel) {
		if (
			message.guild.me.voice.channel.id !==
			message.member.voice.channel.id
		)
			return await message.channel.send(
				client.embed(
					{
						description:
							"You must be connected to the same voice channel as me!",
					},
					message
				)
			);
	}

	message.member.voice.channel.leave();
	return await message.channel.send(
		client.embed(
			{
				description: `Successfully disconnected from ${message.member.voice.channel.name}`,
			},
			message
		)
	);
};

export const name: string = "disconnect";
export const category: string = "Music";
export const description: string = "Disconnects from the voice channel";
export const aliases: string[] = ["dc", "leave"];
