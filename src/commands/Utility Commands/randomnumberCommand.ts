import { RunFunction } from "../../interfaces/Command";

export const run: RunFunction = async (client, message, args, prefix) => {
	var determinator: number = Math.floor(Math.random() * 2);
	var posOrneg =
		determinator === 1 ? Number.MAX_SAFE_INTEGER : Number.MIN_SAFE_INTEGER;
	return await message.channel.send(
		client.embed(
			{
				description: `Your number is \`${Math.floor(
					Math.random() * posOrneg
				)}\``,
			},
			message
		)
	);
};

export const name: string = "randomnumber";
export const category: string = "Utility";
export const description: string = "Generate a random number";
export const aliases: string[] = ["rn"];
