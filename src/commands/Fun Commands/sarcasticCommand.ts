import { RunFunction } from "../../interfaces/Command";
import sarcastic from "../../functions/sarcastic";

export const run: RunFunction = async (client, message, args, prefix) => {
	return await message.channel.send(
		client.embed(
			{ description: `\`${sarcastic(args.slice(0).join(" "))}\`` },
			message
		)
	);
};

export const name: string = "sarcastic";
export const category: string = "Fun";
export const description: string = "bRo YoU aRe So FunNy";
