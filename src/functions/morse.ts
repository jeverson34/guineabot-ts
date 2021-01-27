import axios from "axios";
import { Bot } from "../client/Client";
async function encode(client: Bot, char: string) {
	var options = {
		method: "GET",
		url: `https://api.snowflakedev.xyz/api/morse/encode?text=${char}`,
		headers: {
			"Authorization": client.config.snowflake_api_key,
		},
	};

	const convertedText = await axios.request(options as any).then((res) => {
		return res.data.data;
	});
	return convertedText;
}

async function decode(client: Bot, char: string) {
	var options = {
		method: "GET",
		url: `https://api.snowflakedev.xyz/api/morse/decode?text=${char}`,
		headers: {
			"Authorization": client.config.snowflake_api_key,
		},
	};

	const convertedText = await axios.request(options as any).then((res) => {
		return res.data.data;
	});
	return convertedText;
}

export default {
	encode: encode,
	decode: decode,
};
