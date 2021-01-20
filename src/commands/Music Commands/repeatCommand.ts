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

	if (client.music.getQueue(message).repeatMode) {
		await client.music.setRepeatMode(message, false);
		return await message.channel.send(
			client.embed(
				{
					description: 'Successfully turned off repeat for the current track.',
				},
				message
			)
		);
	} else {
		await client.music.setRepeatMode(message, true);
		return await message.channel.send(
			client.embed(
				{
					description: 'Successfully set the current track on repeat.',
				},
				message
			)
		);
	}
};

export const name: string = 'repeat';
export const category: string = 'Music';
export const description: string = 'Repeat the song over and over';
