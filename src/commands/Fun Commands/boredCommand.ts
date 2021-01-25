import { RunFunction } from "../../interfaces/Command";
import axios from "axios";

export const run: RunFunction = async (client, message, args, prefix) => {
	axios.get("http://www.boredapi.com/api/activity/").then(async (res) => {
		const activity = res.data.activity;
		const type = res.data.type;
		const participants = res.data.participants;
		const price = res.data.price * 10;
		const key = res.data.key;
		const accessibility = res.data.accessibility * 10;

		return await message.channel.send(
			client.embed(
				{
					title: "Are you bored?",
					description: `**Activity:** ${activity}\n**Type:** ${type}\n**Participants:** ${participants}\n**Price:** ${price} out of 10\n**Accessibility:** ${accessibility} out of 10`,
					footer: key,
				},
				message
			)
		);
	});
};

export const name: string = "bored";
export const category: string = "Fun";
export const description: string = "Ya bored? Same.";
