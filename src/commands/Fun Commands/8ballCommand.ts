import { RunFunction } from "../../interfaces/Command";

export const run: RunFunction = async (client, message, args, prefix) => {
	if (!args.length)
		return await message.channel.send(
			client.embed(
				{
					description:
						"🎱 | Give empty questions, recieve empty answers. ¯\\_(ツ)_/¯",
				},
				message
			)
		);
	const messages = [
		"As I see it, yes.",
		"Ask again later.",
		"Better not tell you now.",
		"Cannot predict now.",
		"Concentrate and ask again.",
		"Don’t count on it.",
		"It is certain.",
		"It is decidedly so.",
		"Most likely.",
		"My reply is no.",
		"My sources say no.",
		"Outlook not so good.",
		"Outlook good.",
		"Reply hazy, try again.",
		"Signs point to yes.",
		"Very doubtful.",
		"Without a doubt.",
		"Yes.",
		"Yes – definitely.",
		"You may rely on it.",
	];
	let finalmessage;
	let randomizer = Math.floor(Math.random() * messages.length);
	finalmessage = messages[randomizer];
	message.channel.send(
		client.embed({ description: `🎱 | ${finalmessage}` }, message)
	);
};

export const name: string = "8ball";
export const category: string = "Fun";
export const description: string = "The magic 8ball toy";
