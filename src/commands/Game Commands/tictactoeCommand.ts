import { RunFunction } from "../../interfaces/Command";
import tictactoe from "discord-tictactoe";

export const run: RunFunction = async (client, message, args, prefix) => {
	new tictactoe(
		{
			language: "en",
			command: prefix + exports.name,
		},
		client
	);
};

export const name: string = "tictactoe";
export const category: string = "Games";
export const description: string = "Play tictactoe against an unbeatable AI";
