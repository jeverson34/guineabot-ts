import { RunFunction } from "../../interfaces/Command";

export const run: RunFunction = async (client, message, args, prefix) => {
	return await message.channel.send(
		client.embed(
			{
				description: `You are ${Math.floor(
					Math.random() * 101
				)}% gamer. 🎮`,
			},
			message
		)
	);
};

export const name: string = "gamer";
export const category: string = "Fun";
export const description: string = "Welcome to downtown gamersville";
