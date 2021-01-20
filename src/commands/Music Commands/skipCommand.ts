import { RunFunction } from '../../interfaces/Command';

export const run: RunFunction = async (client, message, args, prefix) => {
	if (!message.member.voice.channel)
		return await message.channel.send(
			client.embed(
				{ description: 'You must be connected to a voice channel!' },
				message
			)
		);

	if (message.guild.me.voice.channel) {
		if (message.guild.me.voice.channel.id !== message.member.voice.channel.id)
			return await message.channel.send(
				client.embed(
					{
						description:
							'You must be connected to the same voice channel as me!',
					},
					message
				)
			);
	}

	const skippedSongQueue = await client.music.skip(message);

	return await message.channel.send(
		client.embed(
			{
				description: `Successfully skipped **${skippedSongQueue.tracks[0].title}**`,
			},
			message
		)
	);
};

export const name: string = 'skip';
export const category: string = 'Music';
export const description: string = 'Skip the current song;';
