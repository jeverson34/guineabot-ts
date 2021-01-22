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
	if (!message.guild.me.permissions.has('CONNECT'))
		return await message.channel.send(
			client.embed(
				{ description: 'I am missing the permission to `connect`.' },
				message
			)
		);
	if (!message.guild.me.permissions.has('SPEAK'))
		return await message.channel.send(
			client.embed(
				{ description: 'I am missing the permission to `speak`.' },
				message
			)
		);

	const search = args.join(' ');
	if (!search)
		return await message.channel.send(
			client.embed({ description: 'Please enter the search/url.' }, message)
		);

	try {
		await client.music.play(message, search, true);
	} catch (error) {
		client.logger.error(error);
		return await message.channel.send(
			client.embed(
				{ description: `An error occurred: ${error.message}` },
				message
			)
		);
	}
};

export const name: string = 'play';
export const category: string = 'Music';
export const description: string = 'Play a song in a voice channel';
export const aliases: string[] = ['p'];
