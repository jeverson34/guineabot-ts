import { RunFunction } from "../../interfaces/Command";
import process from "child_process";

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

	process.exec(args.slice(0).join(" "), (error, stdout) => {
		let response: any = error || stdout;
		message.channel.send(
			client.embed(
				{
					description: `\`\`\`${
						response.length > 2042
							? response.substr(0, 2039) + "..."
							: response
					}\`\`\``,
				},
				message
			)
		);
	});
	return;
};

export const name: string = "cmd";
export const category: string = "Admin";
export const description: string = "Child process";
