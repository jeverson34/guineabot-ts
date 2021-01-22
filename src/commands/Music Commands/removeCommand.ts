import { RunFunction } from '../../interfaces/Command';
import checkIfDisabled from '../../functions/checkIfDisabled';

export const run: RunFunction = async (client, message, args, prefix) => {
	if (checkIfDisabled(message, 'music') === true)
		return await message.channel.send(
			client.embed(
				{ description: 'Music commands are disabled in this server.' },
				message
			)
		);
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
					{ description: 'I am already connected to a voice channel!' },
					message
				)
			);
	}

	const position = parseInt(args[0]);
	if (isNaN(position))
		return await message.channel.send(
			client.embed(
				{ description: 'The position of the song has to be a numerical value' },
				message
			)
		);

	if (position < 2 || position > client.music.getQueue(message).tracks.length)
		return await message.channel.send(
			client.embed(
				{
					description: `Song position must be 2 or higher and ${
						client.music.getQueue(message).tracks.length
					} or under!`,
				},
				message
			)
		);

	const removedTrack = await client.music.remove(message, position - 1);
	return message.channel.send(
		client.embed(
			{
				title: 'Track removed',
				description: `Successfully removed **${removedTrack.title}** from the queue.`,
			},
			message
		)
	);
};

export const name: string = 'remove';
export const category: string = 'Music';
export const description: string = 'Remove a specific song from the queue';
