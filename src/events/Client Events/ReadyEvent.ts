import { RunFunction } from "../../interfaces/Event";

export const run: RunFunction = async (client) => {
	client.logger.success(`[${client.user.tag}] has logged in`);
	client.user.setPresence({
		activity: {
			name: `g?help | ${client.guilds.cache.size} ${
				client.guilds.cache.size > 1 ? "servers" : "server"
			}`,
			type: "STREAMING",
			url: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`, //get noobed
		},
		status: "online",
	});
};

export const name: string = "ready";
