import { RunFunction } from "../../interfaces/Command";
import weather from "weather-js";

export const run: RunFunction = async (client, message, args, prefix) => {
	if (!args.length)
		return await message.channel.send(
			client.embed({ description: "Please enter the city" }, message)
		);
	let city = args.join(" ");
	let degree = "C";

	await weather.find(
		{
			search: city,
			degreeType: degree,
		},
		async function (err: any, result: any) {
			if (!city)
				return message.channel.send(
					client.embed(
						{ description: "Please insert the city." },
						message
					)
				);
			if (err || result === undefined || result.length === 0)
				return message.channel.send(
					client.embed(
						{ description: "Unknown city. Please try again." },
						message
					)
				);

			let current = result[0].current;
			let location = result[0].location;

			return await message.channel.send(
				client
					.embed(
						{
							description: `> ${current.skytext}`,
							author: current.observationpoint,
						},
						message
					)
					.setThumbnail(current.imageUrl)
					.addField("Latitude", location.lat, true)
					.addField("Longitude", location.long, true)
					.addField(
						"Feels Like",
						`${current.feelslike}° Degrees`,
						true
					)
					.addField("Degree Type", location.degreetype, true)
					.addField("Winds", current.winddisplay, true)
					.addField("Humidity", `${current.humidity}%`, true)
					.addField("Timezone", `GMT ${location.timezone}`, true)
					.addField(
						"Temperature",
						`${current.temperature}° Degrees`,
						true
					)
					.addField("Observation Time", current.observationtime, true)
			);
		}
	);
};

export const name: string = "weather";
export const category: string = "Utility";
export const description: string = "Fetch weather information for any city";
