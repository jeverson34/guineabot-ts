import { RunFunction } from "../../interfaces/Command";

export const run: RunFunction = async (client, message, args, prefix) => {
	if (message.author.id !== client.config.bot_owner_id)
		return await message.channel.send(
			client.embed(
				{ description: "You are not permitted to run this command." },
				message
			)
		);

	if (!args.length)
		return await message.channel.send(
			client.embed({ description: "Please enter the query." }, message)
		);

	let result = await eval(args.slice(0).join(" "));

	if (typeof result === "object") result = JSON.stringify(result, null, 4);
	return await message.channel.send(
		client.embed(
			{
				description: `\`\`\`ts\n${
					result.length > 2039
						? result.substr(0, 2036) + "..."
						: result
				}\`\`\``,
			},
			message
		)
	);
};

export const name: string = "eval";
export const category: string = "Admin";
export const description: string = "Run quick code";
