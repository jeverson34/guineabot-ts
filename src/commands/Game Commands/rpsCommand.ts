import { RunFunction } from "../../interfaces/Command";
import checkIfDisabled from "../../functions/checkIfDisabled";

export const run: RunFunction = async (client, message, args, prefix) => {
	if (checkIfDisabled(message, "games") === true)
		return await message.channel.send(
			client.embed(
				{ description: `Games are disabled in this server.` },
				message
			)
		);
	message.reply(
		client.embed(
			{
				description:
					"Enter `r` for rock, `p` for paper, or `s` for scissors.",
			},
			message
		)
	);

	//Filter the response to only the command author
	const filter = (msg) => msg.author.id === message.author.id;
	const options = {
		max: 1,
	};

	//Initiate the collector
	let collector = await message.channel.awaitMessages(filter, options);
	let answer = collector.first().content;

	//Make the answer lowecase
	let answerLower = answer.toLowerCase();

	//Check for invalid syntax
	if (answerLower !== "r" && answerLower !== "p" && answerLower !== "s")
		return message.reply(
			client.embed(
				{
					description:
						"You entered an invalid option, `r` for rock, `p` for paper, or `s` for scissors.",
				},
				message
			)
		);

	//Randomize the AI's answer
	let AIanswers = ["r", "p", "s"];
	let randomizer = Math.floor(Math.random() * AIanswers.length);
	let response = AIanswers[randomizer];

	//Check for ties
	if (response === answerLower)
		return message.reply(
			client.embed(
				{
					description: `The game ended in a **TIE**! I responded with **${response}**, and you entered **${answerLower}**!`,
				},
				message
			)
		);

	//Check for AI win
	if (response === "r" && answerLower === "s")
		return message.reply(
			client.embed(
				{
					description: `I won! I responded with **${response}**, and you entered **${answerLower}**!`,
				},
				message
			)
		);
	if (response === "p" && answerLower === "r")
		return message.reply(
			client.embed(
				{
					description: `I won! I responded with **${response}**, and you entered **${answerLower}**!`,
				},
				message
			)
		);
	if (response === "s" && answerLower === "p")
		return message.reply(
			client.embed(
				{
					description: `I won! I responded with **${response}**, and you entered **${answerLower}**!`,
				},
				message
			)
		);

	//Check for AI loss
	if (answerLower === "r" && response === "s")
		return message.reply(
			client.embed(
				{
					description: `You won! I responded with **${response}**, and you entered **${answerLower}**!`,
				},
				message
			)
		);
	if (answerLower === "p" && response === "r")
		return message.reply(
			client.embed(
				{
					description: `You won! I responded with **${response}**, and you entered **${answerLower}**!`,
				},
				message
			)
		);
	if (answerLower === "s" && response === "p")
		return message.reply(
			client.embed(
				{
					description: `You won! I responded with **${response}**, and you entered **${answerLower}**!`,
				},
				message
			)
		);
};

export const name: string = "rps";
export const category: string = "Games";
export const description: string = "Rock Paper Scissors game";
