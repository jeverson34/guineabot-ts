import { Bot } from "../client/Client";
import { Message } from "discord.js";

export interface RunFunction {
	(
		client: Bot,
		message: Message,
		args: string[],
		prefix: string
	): Promise<unknown>;
}

export interface Command {
	name: string;
	category: string;
	description: string;
	aliases?: string[];
	cooldown: number;
	run: RunFunction;
}
