import { RunFunction } from "../../interfaces/Command";

export const run: RunFunction = async (client, message, args, prefix) => {
	if (!args[0])
		return await message.channel.send(
			client.embed(
				{ description: "Please specify the minimum number" },
				message
			)
		);
	if (!args[1])
		return await message.channel.send(
			client.embed(
				{ description: "Please specify the maximum number." },
				message
			)
		);

	let min = parseInt(args[0]);
	let max = parseInt(args[1]);

	if (isNaN(min))
		return await message.channel.send(
			client.embed(
				{
					description:
						"Please specify the minimum number as a **number**",
				},
				message
			)
		);
	if (isNaN(max))
		return await message.channel.send(
			client.embed(
				{
					description:
						"Please specify the maximum number as a **number**.",
				},
				message
			)
		);

	let result = Math.floor(Math.random() * (max - min) + min);
	return await message.channel.send(
		client.embed(
			{ description: `From ${min} and ${max} you get \`${result}\`` },
			message
		)
	);
};

export const name: string = "randomnumberrange";
export const category: string = "Utility";
export const description: string = "Generate a random number within a range";
export const aliases: string[] = ["rnr"];
