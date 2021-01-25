import { RunFunction } from "../../interfaces/Command";
import axios from "axios";

export const run: RunFunction = async (client, message, args, prefix) => {
	var options = {
		method: "GET",
		url:
			"https://matchilling-chuck-norris-jokes-v1.p.rapidapi.com/jokes/random",
		headers: {
			accept: "application/json",
			"x-rapidapi-key": client.config.rapid_api_key,
			"x-rapidapi-host":
				"matchilling-chuck-norris-jokes-v1.p.rapidapi.com",
		},
	};
	axios.request(options as any).then(async (result) => {
		return await message.channel.send(
			client.embed({ description: result.data.value }, message)
		);
	});
};

export const name: string = "chucknorris";
export const category: string = "Fun";
export const description: string = "Chuck Norris Io thingy";
