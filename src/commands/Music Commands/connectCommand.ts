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
					{ description: 'I am already connected to a voice channel!' },
					message
				)
			);
	}

	if (!message.guild.me.permissions.has('CONNECT'))
		return await message.channel.send(
			client.embed(
				{ description: 'I am missing the permission to `connect`.' },
				message
			)
		);

	await message.member.voice.channel.join();
	return await message.channel.send(
		client.embed(
			{
				description: `Successfully connected to ${message.member.voice.channel.name}`,
			},
			message
		)
	);
};

export const name: string = 'connect';
export const category: string = 'Music';
export const description: string = 'Connect to a voice channel';
export const aliases: string[] = ['join'];
