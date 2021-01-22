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

	if (!client.music.isPlaying(message))
		return await message.channel.send(
			client.embed({ description: 'No song is being played.' }, message)
		);

	const options: string[] = [
		'bassboost',
		'8D',
		'vaporwave',
		'nightcore',
		'phaser',
		'tremolo',
		'vibrato',
		'reverse',
		'treble',
		'normalizer',
		'surrounding',
		'pulsator',
		'subboost',
		'karaoke',
		'flanger',
		'gate',
		'haas',
		'mcompand',
		'mono',
		'none',
	];

	let currentOptions = client.music.getQueue(message).filters;

	const allOff = {
		bassboost: false,
		'8D': false,
		vaporwave: false,
		nightcore: false,
		phaser: false,
		tremolo: false,
		vibrato: false,
		reverse: false,
		treble: false,
		normalizer: false,
		surrounding: false,
		pulsator: false,
		subboost: false,
		karaoke: false,
		flanger: false,
		gate: false,
		haas: false,
		mcompand: false,
		mono: false,
	};

	if (options.indexOf(args[0]) != -1) {
		if (options[options.indexOf(args[0])] === 'none') {
			await client.music.setFilters(message, allOff);
			return await message.channel.send(
				client.embed(
					{ description: 'Successfully turned **off** all audio effects.' },
					message
				)
			);
		} else {
			const newOption =
				currentOptions[options[options.indexOf(args[0])]] === true
					? (currentOptions[options[options.indexOf(args[0])]] = false)
					: (currentOptions[options[options.indexOf(args[0])]] = true);
			currentOptions[options[options.indexOf(args[0])]] = newOption;
			await client.music.setFilters(message, currentOptions);
			return await message.channel.send(
				client.embed(
					{
						description: `Successfully turned **${
							newOption === true ? 'on' : 'off'
						}** the **${options[options.indexOf(args[0])]}** audio effect`,
					},
					message
				)
			);
		}
	} else
		return await message.channel.send(
			client
				.embed(
					{
						title: 'Invalid option',
						description:
							'Make sure your choice is exactly to one of the available options (CASE SENSITIVE).',
					},
					message
				)
				.addField('Available Options', '`' + options.join('`, `') + '`')
		);
};

export const name: string = 'effect';
export const category: string = 'Music';
export const description: string = 'Apply audio effects to your tracks.';
