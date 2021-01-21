import { RunFunction } from '../../interfaces/Command';
import tictactoe from 'discord-tictactoe';
import checkIfDisabled from '../../functions/checkIfDisabled';

export const run: RunFunction = async (client, message, args, prefix) => {
	if (checkIfDisabled(message, 'games') === true)
		return await message.channel.send(
			client.embed(
				{ description: `Games are disabled in this server.` },
				message
			)
		);
	new tictactoe(
		{
			language: 'en',
			command: prefix + exports.name,
		},
		client
	);
};

export const name: string = 'tictactoe';
export const category: string = 'Games';
export const description: string = 'Play tictactoe against an unbeatable AI';
