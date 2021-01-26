import { RunFunction } from "../../interfaces/Command";

export const run: RunFunction = async (client, message, args, prefix) => {
	if (!message.member.voice.channel)
		return await message.channel.send(
			client.embed(
				{ description: "You must be connected to a voice channel!" },
				message
			)
		);

	if (message.guild.me.voice.channel) {
		if (
			message.guild.me.voice.channel.id !==
			message.member.voice.channel.id
		)
			return await message.channel.send(
				client.embed(
					{
						description:
							"You must be connected to the same voice channel as me!",
					},
					message
				)
			);
	}

	const volume = parseInt(args[0]);

	if (isNaN(volume))
		return await message.channel.send(
			client.embed(
				{ description: "The volume has to be a numerical value" },
				message
			)
		);
	if (volume > 100 || volume < 0)
		return await message.channel.send(
			client.embed(
				{
					description: `The volume must be 100 or lower and 0 or higher.`,
				},
				message
			)
		);
	await client.music.setVolume(message, volume);
	return await message.channel.send(
		client.embed(
			{ description: `Successfully set the volume to **${volume}**` },
			message
		)
	);
};

export const name: string = "volume";
export const category: string = "Music";
export const description: string = "Set the volume of the track";
