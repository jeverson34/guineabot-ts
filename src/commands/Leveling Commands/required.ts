import { RunFunction } from '../../interfaces/Command';
import checkIfDisabled from '../../functions/checkIfDisabled';

export const run: RunFunction = async (client, message, args, prefix) => {
	if (checkIfDisabled(message, 'leveling') === true)
		return await message.channel.send(
			client.embed(
				{ description: 'Leveling commands are disabled in this server.' },
				message
			)
		);
	if (!args.length)
		return await message.channel.send(
			client.embed({ description: 'Please enter a number.' }, message)
		);
	if (parseInt(args[0]) < 1)
		return await message.channel.send(
			client.embed(
				{ description: 'Please choose a number that is 1 or higher.' },
				message
			)
		);
	if (isNaN(parseInt(args[0])))
		return await message.channel.send(
			client.embed({ description: 'Please enter a numerical value.' }, message)
		);

	return await message.channel.send(
		client.embed(
			{
				description: `The required number of XP to reach level ${parseInt(
					args[0]
				)} is ${parseInt(args[0]) * parseInt(args[0]) * 100}`,
			},
			message
		)
	);
};

export const name: string = 'required';
export const category: string = 'Leveling';
export const description: string = 'How much xp to reach a certain level';
