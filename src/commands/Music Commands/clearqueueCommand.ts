import { RunFunction } from "../../interfaces/Command";

export const run: RunFunction = async (client, message, args, prefix) => {
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
							"I am already connected to a voice channel!",
					},
					message
				)
			);
	}

	client.music.clearQueue(message);
	return await message.channel.send(
		client.embed(
			{
				description:
					"Successfully removed all songs from queue, current song will still resume.",
			},
			message
		)
	);
};

export const name: string = "clearqueue";
export const category: string = "Music";
export const description: string = "Clear the queue";
