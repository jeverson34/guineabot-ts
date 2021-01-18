import { Message } from 'discord.js';
import { RunFunction } from '../../interfaces/Command';

export const run: RunFunction = async (client, message) => {
	const msg: Message = await message.channel.send(
		client.embed(
			{
				description: '📶 Pinging...',
				title: 'Discord Gateway Ping in Progress',
			},
			message
		)
	);

	await msg.edit(
		client.embed(
			{
				description: `Websocket: ${client.ws.ping} ms\nMessage Edit: ${
					msg.createdTimestamp - message.createdTimestamp
				} ms`,
				title: 'Discord Gateway Ping Complete',
			},
			message
		)
	);
};

export const name: string = 'ping';
export const aliases: string[] = ['pong'];
export const category: string = 'Information';
export const description: string = 'Fetch Discord Latency';
