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

	if (client.music.getQueue(message).loopMode) {
		await client.music.setLoopMode(message, false);
		return await message.channel.send(
			client.embed(
				{ description: 'Successfully turned off loop for the queue.' },
				message
			)
		);
	} else {
		await client.music.setLoopMode(message, true);
		return await message.channel.send(
			client.embed(
				{ description: 'Successfully set the queue on loop.' },
				message
			)
		);
	}
};

export const name: string = 'loop';
export const category: string = 'Music';
export const description: string = 'Loop the queue over and over';
