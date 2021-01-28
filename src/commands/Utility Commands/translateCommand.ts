import { RunFunction } from "../../interfaces/Command";
import translate from "@k3rn31p4nic/google-translate-api";

export const run: RunFunction = async (client, message, args, prefix) => {
	if (!args[0])
		return await message.channel.send(
			client.embed(
				{
					description:
						"Please specify what language to translate **from**",
				},
				message
			)
		);
	if (!args[1])
		return await message.channel.send(
			client.embed(
				{
					description:
						"Please specify what language to translate **to**",
				},
				message
			)
		);
	if (!args[2])
		return await message.channel.send(
			client.embed(
				{ description: "Please specify what text to translate" },
				message
			)
		);
	let text = args.slice(2).join(" ");
	translate(text, {
		from: args[0],
		to: args[1],
	})
		.then(async (res) => {
			return await message.channel.send(
				client.embed({}, message).addFields(
					{
						name: "Input",
						value: `\`\`\`${text}\`\`\``,
					},
					{
						name: "Output",
						value: `\`\`\`${res.text}\`\`\``,
					}
				)
			);
		})
		.catch(async (err) => {
			return await message.channel.send(
				client.embed(
					{ description: `An error occurred: ${err.message}` },
					message
				)
			);
		});
};

export const name: string = "translate";
export const category: string = "Utility";
export const description: string = "Translate between languages";
