import { RunFunction } from "../../interfaces/Command";
import checkIfDisabled from "../../functions/checkIfDisabled";

export const run: RunFunction = async (client, message, args, prefix) => {
	if (checkIfDisabled(message, "music") === true)
		return await message.channel.send(
			client.embed(
				{ description: "Music commands are disabled in this server." },
				message
			)
		);
	const track = client.music.nowPlaying(message);
	return await message.channel.send(
		client
			.embed(
				{
					title: `Current Track`,
					url: track.url,
					description: `**Track:** ${track.title} by ${track.author}\n**Duration:** ${track.duration}\n**Requested By:** ${track.requestedBy}`,
				},
				message
			)
			.setImage(track.thumbnail)
			.setFooter(`${track.views} views`)
	);
};

export const name: string = "nowplaying";
export const category: string = "Music";
export const description: string = "View the current song";
export const aliases: string[] = ["np"];
