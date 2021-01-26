import { RunFunction } from "../../interfaces/Command";

export const run: RunFunction = async (client, message, args, prefix) => {
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
