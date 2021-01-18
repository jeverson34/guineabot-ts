import { RunFunction } from '../../interfaces/Command';

export const run: RunFunction = async (client, message, args, prefix) => {
	//Random number from 1 to 25
	var number = Math.floor(Math.random() * 24) + 1;

	//Notify user
	message.channel.send(
		client.embed(
			{
				description:
					'I have generated a random number between 1 and 25, guess the number now!',
			},
			message
		)
	);

	//Filter responses to only the command author
	const filter = (msg) => msg.author.id === message.author.id;
	const options = {
		max: 1,
	};

	//Initiate message collector
	let collector = await message.channel.awaitMessages(filter, options);
	let answer = collector.first().content;

	//Get the guess and check if it is a numeric value
	let guess = parseInt(answer);
	if (isNaN(guess))
		return message.channel.send(
			client.embed(
				{ description: 'You did not enter a valid number.' },
				message
			)
		);

	//Check if it was the correct number
	if (guess === number)
		return message.channel.send(
			client.embed(
				{ description: `Good job! You entered the correct number!` },
				message
			)
		);
	else
		return message.channel.send(
			client.embed(
				{
					description: `Better luck next time! The correct number was **${number}**.`,
				},
				message
			)
		);
};

export const name: string = 'guessnum';
export const category: string = 'Games';
export const description: string = 'Guess the number';
