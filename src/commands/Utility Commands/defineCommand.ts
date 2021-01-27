import { RunFunction } from "../../interfaces/Command";
import axios from "axios";
import bin from "sourcebin_js";
import ms from "ms";

export const run: RunFunction = async (client, message, args, prefix) => {
	if (!args.length)
		return await message.channel.send(
			client.embed(
				{ description: "Please enter the word you want defined" },
				message
			)
		);
	let word = args.slice(0).join(" ");

	axios
		.get(
			`https://dictionaryapi.com/api/v3/references/thesaurus/json/${word}?key=${client.config.dictionary_api_key}`
		)
		.then(async (data) => {
			let alldata = data.data;

			if (!alldata[0].meta) {
				message.channel.send("Word not found.");
				return false;
			}

			let otherWords = [];

			for (let i = 0; i < alldata.length; i++) {
				otherWords.push(alldata[i].meta.id + ` (${alldata[i].fl})`);
			}

			let definitions = [];

			for (let j = 0; j < alldata[0].shortdef.length; j++) {
				definitions.push(`${j + 1}. ${alldata[0].shortdef[j]}`);
			}

			let synURL = await bin
				.create(
					[
						{
							name: "GuineaBot/Cy1der",
							content: `${
								alldata[0].meta.syns.length > 1
									? alldata[0].meta.syns
									: "none"
							}`,
							languageId: "JSON",
						},
					],
					{
						title: `Synonyms for ${alldata[0].meta.id}`,
						description: "Dictionary command executed",
					}
				)
				.then((bin) => {
					return bin.url;
				});

			let antURL = await bin
				.create(
					[
						{
							name: "GuineaBot/Cy1der",
							content: `${
								alldata[0].meta.ants.length > 1
									? alldata[0].meta.ants
									: "none"
							}`,
							languageId: "JSON",
						},
					],
					{
						title: `Synonyms for ${alldata[0].meta.id}`,
						description: "Dictionary command executed",
					}
				)
				.then((bin) => {
					return bin.url;
				});

			return await message.channel.send(
				client
					.embed(
						{
							title: `${alldata[0].meta.id} (${alldata[0].fl})`,
							description: `**Offensive?** ${
								alldata[0].meta.offensive ? "Yes" : "No"
							}`,
						},
						message
					)
					.addFields(
						{
							name: "Definition(s)",
							value: definitions.join("\n"),
						},
						{
							name: `Related to "${alldata[0].meta.id}"`,
							value: alldata[0].meta.stems.join(", "),
						},
						{
							name: "Synonyms",
							value: `[Here](${synURL})`,
						},
						{
							name: "Antonyms",
							value: `[Here](${antURL})`,
						},
						{
							name: `Other results`,
							value: otherWords.join(", "),
						}
					)
			);
		});
};

export const name: string = "define";
export const category: string = "Utility";
export const description: string = "Word dictionary";
export const cooldown: number = ms("30s");
