import { RunFunction } from "../../interfaces/Command";
import axios from "axios";
import ms from "ms";

export const run: RunFunction = async (client, message, args, prefix) => {
	if (!args.length)
		return await message.channel.send(
			client.embed({ description: "Please enter the word" }, message)
		);
	const word = args[0];
	axios
		.get(
			`https://dictionaryapi.com/api/v3/references/ithesaurus/json/${word}?key=${client.config.thesaurus_api_key}`
		)
		.then(async (data) => {
			let alldata = data.data;

			if (!alldata[0].meta)
				return await message.channel.send(
					client.embed({ description: "Word not found" }, message)
				);

			let otherWords = [];

			for (let i = 0; i < alldata.length; i++) {
				otherWords.push(alldata[i].meta.id + ` (${alldata[i].fl})`);
			}

			let syns = [];

			if (alldata[0].meta.syns.length > 0) {
				for (let i = 0; i < alldata[0].meta.syns.length; i++) {
					for (let j = 0; j < alldata[0].meta.syns[i].length; j++) {
						syns.push(alldata[0].meta.syns[i][j]);
					}
				}
			} else syns = ["none"];

			let ants = [];

			if (alldata[0].meta.ants.length > 0) {
				for (let k = 0; k < alldata[0].meta.ants.length; k++) {
					for (let l = 0; l < alldata[0].meta.ants[k].length; l++) {
						ants.push(alldata[0].meta.ants[k][l]);
					}
				}
			} else ants = ["none"];

			return await message.channel.send(
				client
					.embed(
						{ title: `Results for ${alldata[0].meta.id}` },
						message
					)
					.addFields(
						{
							name: "Synonyms",
							value: syns.length
								? syns.join(", ").length > 1024
									? syns.join(", ").substr(0, 1021) + "..."
									: syns.join(", ")
								: "None",
						},
						{
							name: "Antonyms",
							value: ants.length
								? ants.join(", ").length > 1024
									? ants.join(", ").substr(0, 1021) + "..."
									: ants.join(", ")
								: "None",
						},
						{
							name: `Other results`,
							value: otherWords.length
								? otherWords.join(", ").length > 1024
									? otherWords.join(", ").substr(0, 1021) +
									  "..."
									: otherWords.join(", ")
								: "None",
						}
					)
			);
		});
};

export const name: string = "thesaurus";
export const category: string = "Utility";
export const description: string = "Get a word's similar words";
export const cooldown: number = ms("30s");
