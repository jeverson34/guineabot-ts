import { RunFunction } from "../../interfaces/Command";

export const run: RunFunction = async (client, message, args, prefix) => {
	const invite = client
		.generateInvite({
			permissions: ["ADMINISTRATOR"],
		})
		.then(async (link) => {
			return await message.channel.send(
				client.embed(
					{
						title: "[Guineabot OAUTH2 Invite Link]",
						url: link,
						description: `[**[Guineabot Support Server]**](https://discord.gg/6KpZhR3SRP)`,
					},
					message
				)
			);
		});
};

export const name: string = "invite";
export const category: string = "Information";
export const description: string = "Invite the bot to your server!";
