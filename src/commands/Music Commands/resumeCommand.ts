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

	if (!client.music.getQueue(message).paused)
		return await message.channel.send(
			client.embed({ description: 'The queue is already playing!' }, message)
		);
	else {
		await client.music.resume(message);
		return await message.channel.send(
			client.embed({ description: 'Successfully resumed the queue.' }, message)
		);
	}
};

export const name: string = 'resume';
export const category: string = 'Music';
export const description: string = 'Resume the music';
