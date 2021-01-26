import { RunFunction } from "../../interfaces/Command";
import image from "../../functions/image";

export const run: RunFunction = async (client, message, args, prefix) => {
	image(message, client, "Guinea Pig");
};

export const name: string = "guineapig";
export const category: string = "Fun";
export const description: string = "Random picture of a Guinea Pig";
export const aliases: string[] = ["pig"];
