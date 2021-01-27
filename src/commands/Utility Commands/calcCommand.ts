import { RunFunction } from "../../interfaces/Command";
import * as math from "mathjs";

export const run: RunFunction = async (client, message, args, prefix) => {
	if (!args.length)
		return await message.channel.send(
			client.embed({ description: "Please input a calculation" }, message)
		);
	let resp: any;
	try {
		resp = math.evaluate(args.join(" "));
	} catch (e) {
		return await message.channel.send(
			client.embed({ description: "Sorry, invalid calculation" }, message)
		);
	}
	return await message.channel.send(
		client.embed({}, message).addFields(
			{
				name: "Input",
				value: `\`\`\`${args.join(" ")}\`\`\``,
			},
			{
				name: "Output",
				value: `\`\`\`${resp}\`\`\``,
			}
		)
	);
};

export const name: string = "calc";
export const category: string = "Utility";
export const description: string = "Math calculator";
