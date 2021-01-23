import db from "quick.db";
import { Message } from "discord.js";

function checkIfDisabled(message: Message, category: string) {
	const options: string[] = ["fun", "games", "leveling", "music"];

	if (options.indexOf(category.toLowerCase()) != -1) {
		let state = db.get(
			`${message.guild.id}-${
				options[options.indexOf(category.toLowerCase())]
			}`
		);
		if (!state)
			state = db.set(
				`${message.guild.id}-${
					options[options.indexOf(category.toLowerCase())]
				}`,
				"on"
			);

		if (state === "on") return false;
		else if (state === "off") return true;
	} else
		throw new Error(
			`<Disable Check> -> ${category.toLowerCase()} is not a valid option`
		);
}

export default checkIfDisabled;
