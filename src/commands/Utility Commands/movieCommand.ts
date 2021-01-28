import axios from "axios";
import { RunFunction } from "../../interfaces/Command";
import ms from "ms";

export const run: RunFunction = async (client, message, args, prefix) => {
	if (!args.length)
		return await message.channel.send(
			client.embed(
				{ description: "Please enter the name of a movie." },
				message
			)
		);
	var options = {
		method: "GET",
		url: `https://imdb-internet-movie-database-unofficial.p.rapidapi.com/search/${args
			.slice(0)
			.join(" ")}`,
		headers: {
			"x-rapidapi-key": client.config.rapid_api_key,
			"x-rapidapi-host":
				"imdb-internet-movie-database-unofficial.p.rapidapi.com",
		},
	};

	axios.request(options as any).then(async (results) => {
		if (!results.data.titles.length)
			return await message.channel.send(
				client.embed({ description: "No movie was found." }, message)
			);
		var options2 = {
			method: "GET",
			url: `https://imdb-internet-movie-database-unofficial.p.rapidapi.com/film/${results.data.titles[0].id}`,
			headers: {
				"x-rapidapi-key": client.config.rapid_api_key,
				"x-rapidapi-host":
					"imdb-internet-movie-database-unofficial.p.rapidapi.com",
			},
		};

		axios.request(options2 as any).then(async (result) => {
			let cast = [];

			for (let i = 0; i < result.data.cast.length; i++) {
				cast.push(result.data.cast[i].actor);
			}

			return await message.channel.send(
				client
					.embed(
						{
							title: result.data.title,
							description: `**Year:** ${
								result.data.year
							}\n**Length:** ${result.data.length}\n**Rating:** ${
								result.data.rating
									? result.data.rating
									: "`unknown`"
							} out of 10 (${
								result.data.rating_votes
									? result.data.rating_votes
									: "`unknown`"
							} votes)`,
						},
						message
					)
					.setImage(result.data.poster)
					.addFields(
						{
							name: "Plot",
							value: result.data.plot,
						},
						{
							name: "Cast",
							value: cast.join(", "),
						},
						{
							name: "Technical Specifications",
							value: `**Sound Mix:** ${result.data.technical_specs[1][1]}\n**Color:** ${result.data.technical_specs[2][1]}\n**Aspect Ratio:** ${result.data.technical_specs[3][1]}`,
						}
					)
			);
		});
	});
};

export const name: string = "movie";
export const category: string = "Utility";
export const description: string = "Search for a movie";
export const cooldown: number = ms("10s");
