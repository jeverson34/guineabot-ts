import { RunFunction } from "../../interfaces/Command";
import figlet from "figlet";

export const run: RunFunction = async (client, message, args, prefix) => {
	if (!args.length)
		return await message.channel.send(
			`\`\`\`${figlet.textSync("Insert Text", {
				font: "ANSI Shadow",
				horizontalLayout: "default",
				verticalLayout: "default",
			})}\`\`\``
		);
	const text = args.slice(0).join(" ");
	message.channel.send(
		figlet.textSync(text, {
			font: "ANSI Shadow",
			horizontalLayout: "default",
			verticalLayout: "default",
		}),
		{
			code: true,
			split: true,
		}
	);
};

export const name: string = "ascii";
export const category: string = "Fun";
export const description: string = "Fancy text";
