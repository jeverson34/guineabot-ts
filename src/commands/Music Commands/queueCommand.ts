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
	const queue = await client.music.getQueue(message);
	if (!queue)
		return await message.channel.send(
			client.embed({ description: 'Nothing...' }, message)
		);
	let previousTracks: string = '';
	let tracks: string = '';

	for (let i = 0; i < queue.previousTracks.length; i++) {
		previousTracks += `${i + 1}. ${queue.previousTracks[i].title}\n`;
	}
	for (let i = 0; i < queue.tracks.length; i++) {
		tracks += `${i + 1}. ${queue.tracks[i].title}\n`;
	}

	message.channel.send(
		client
			.embed({}, message)
			.addField(
				'Previous Tracks:',
				previousTracks
					? previousTracks.length > 1024
						? previousTracks.substr(0, 1021) + '...'
						: previousTracks
					: 'None, yet...'
			)
			.addField(
				'Current Queue:',
				tracks
					? tracks.length > 1024
						? tracks.substr(0, 1021) + '...'
						: tracks
					: 'None, yet...'
			)
	);
};

export const name: string = 'queue';
export const category: string = 'Music';
export const description: string = 'View the music queue';
export const aliases: string[] = ['q'];
