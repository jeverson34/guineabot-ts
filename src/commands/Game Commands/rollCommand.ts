import { RunFunction } from '../../interfaces/Command';
import checkIfDisabled from '../../functions/checkIfDisabled';

export const run: RunFunction = async (client, message, args, prefix) => {
	if (checkIfDisabled(message, 'games') === true)
		return await message.channel.send(
			client.embed(
				{ description: `Games are disabled in this server.` },
				message
			)
		);
	if (!args.length)
		return await message.channel.send(
			client.embed(
				{
					description:
						'Invalid syntax! Please enter the amount of dices to roll.',
				},
				message
			)
		);
	let amount = parseInt(args[0]);

	if (isNaN(amount))
		return message.channel.send(
			client.embed(
				{ description: 'The amount of dices has to be a numeric value.' },
				message
			)
		);
	if (amount < 1)
		return message.channel.send(
			client.embed(
				{ description: 'The amount of dices has to be over 0.' },
				message
			)
		);
	if (amount > 20)
		return message.channel.send(
			client.embed(
				{ description: 'The amount of dices has to be be under 20. -_-' },
				message
			)
		);

	let str = '';
	let total = 0;

	for (let i = 1; i <= amount; i++) {
		let randomizer = Math.floor(Math.random() * 6) + 1;
		str += `**Dice ${i}:** ${randomizer}\n`;
		total = total + randomizer;
	}

	str += `\n**Total:** ${total}`;

	message.channel.send(client.embed({ description: str }, message));
};

export const name: string = 'roll';
export const category: string = 'Games';
export const description: string = 'Roll a dice (or 20!)';
