import { RunFunction } from "../../interfaces/Command";

export const run: RunFunction = async (client, message, args, prefix) => {
	message.channel.send(
		client.embed(
			{
				description: `You are ${Math.floor(
					Math.random() * 101
				)}% cool kid. 😎`,
			},
			message
		)
	);
};

export const name: string = "coolkid";
export const category: string = "Fun";
export const description: string = "Welcome to downtown coolsville";
export const aliases: string[] = ["cool"];
