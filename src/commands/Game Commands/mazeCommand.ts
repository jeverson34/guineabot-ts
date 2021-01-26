import { RunFunction } from "../../interfaces/Command";
import mazegeneration from "maze-generation";
import "../../declarations/replaceAt";

export const run: RunFunction = async (client, message, args, prefix) => {
	if (!args.length)
		return await message.channel.send(
			client.embed(
				{
					description: `Invalid syntax! Please enter the difficulty (easy, medium, or hard).`,
				},
				message
			)
		);

	if (args[0].toLowerCase() === "easy") {
		let mazestr = mazegeneration(
			10,
			10,
			Math.floor(Math.random() * Number.MAX_SAFE_INTEGER),
			"DEPTHFIRST"
		).toString();
		return message.channel.send(
			"```css\n ↓ Start here\n" +
				mazestr.replaceAt(mazestr.length - 2, " ").replaceAt(1, " ") +
				" ← Finish here\n```"
		);
	} else if (args[0].toLowerCase() === "medium") {
		let mazestr = mazegeneration(
			20,
			20,
			Math.floor(Math.random() * Number.MAX_SAFE_INTEGER),
			"DEPTHFIRST"
		).toString();
		return message.channel.send(
			"```css\n ↓ Start here\n" +
				mazestr.replaceAt(mazestr.length - 2, " ").replaceAt(1, " ") +
				" ← Finish here\n```"
		);
	} else if (args[0].toLowerCase() === "hard") {
		let mazestr = mazegeneration(
			30,
			30,
			Math.floor(Math.random() * Number.MAX_SAFE_INTEGER),
			"DEPTHFIRST"
		).toString();
		return message.channel.send(
			"```css\n ↓ Start here\n" +
				mazestr.replaceAt(mazestr.length - 2, " ").replaceAt(1, " ") +
				" ← Finish here\n```"
		);
	}
};

export const name: string = "maze";
export const category: string = "Games";
export const description: string = "Generate a maze to solve";

String.prototype.replaceAt = function (index, replacement) {
	return (
		this.substr(0, index) +
		replacement +
		this.substr(index + replacement.length)
	);
};
