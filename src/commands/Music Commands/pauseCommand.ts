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
					{
						description:
							'You must be connected to the same voice channel as me!',
					},
					message
				)
			);
	}

	if (client.music.getQueue(message).paused)
		return await message.channel.send(
			client.embed({ description: 'The queue is already paused!' }, message)
		);
	else {
		await client.music.pause(message);
		return await message.channel.send(
			client.embed({ description: 'Successfully paused the queue.' }, message)
		);
	}
};

export const name: string = 'pause';
export const category: string = 'Music';
export const description: string = 'Pause the track';
