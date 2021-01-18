import { RunFunction } from '../../interfaces/Command';
import Minesweeper from 'discord.js-minesweeper';

export const run: RunFunction = async (client, message, args, prefix) => {
	if (args.length < 3)
		return await message.channel.send(
			client.embed(
				{
					description: `Invalid syntax! Please enter the number of rows, columns, and mines in their respective order.`,
				},
				message
			)
		);

	const rows = parseInt(args[0]);
	const columns = parseInt(args[1]);
	const mines = parseInt(args[2]);

	//Call a new instance of minesweeper
	const minesweeper = new Minesweeper({ rows, columns, mines });

	//Start the game
	const matrix = minesweeper.start();

	//Check for errors
	if (!matrix)
		return message.channel.send(
			client.embed({ description: 'You have provided invalid data.' }, message)
		);
	if (matrix.length > 2048)
		return message.channel.send(
			client.embed({ description: 'Matrix is too large to send.' }, message)
		);

	message.channel.send(
		client.embed(
			{ description: matrix.toString(), title: `Minesweeper Game` },
			message
		)
	);
};

export const name: string = 'mineswepeer';
export const category: string = 'Games';
export const description: string = 'The mineswepeer game using spoilers';
export const aliases: string[] = ['sweeper'];
