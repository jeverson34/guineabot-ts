import ms from 'ms';
import alphaSort from 'alpha-sort';
import { RunFunction, Command } from '../../interfaces/Command';
import { MessageEmbed, EmbedFieldData } from 'discord.js';

export const run: RunFunction = async (client, message, args) => {
	const fields: Array<EmbedFieldData> = [...client.categories].map(
		(value: string) => {
			return {
				name: `${value[0].toUpperCase() + value.slice(1).toLowerCase()} [${
					client.commands.filter(
						(command: Command) =>
							command.category.toLowerCase() == value.toLowerCase()
					).size
				}]`,
				value: client.commands
					.filter(
						(cmd: Command) => cmd.category.toLowerCase() == value.toLowerCase()
					)
					.map((cmd: Command) => `\`${cmd.name}\``)
					.join(', '),
			};
		}
	);
	const commandEmbed: MessageEmbed = client.embed(
		{ fields, description: `${client.commands.size} commands` },
		message
	);

	if (!args.length) return await message.channel.send(commandEmbed);

	const cmd: Command =
		client.commands.get(args[0]) ||
		client.commands.get(client.aliases.get(args[0]));
	if (!cmd) return await message.channel.send(commandEmbed);

	return await message.channel.send(
		client.embed(
			{
                description: Object.entries(cmd)
                    .filter((value: [string, any]) => value[0] != "run")
					.sort((a: [string, any], b: [string, any]) => alphaSort()(a[0], b[0]))
					.map((value: [string, any]) =>
						typeof value[1] == 'number'
							? `${value[0][0].toUpperCase() + value[0].slice(1)}: \`${ms(value[1], { long: true })}\``
							: value[1]?.map
							? value[1]
									.map(
										(value2: unknown) =>
											`${
												value[0][0].toUpperCase() + value[0].slice(1)
											}: \`${value2}\``
									)
									.join(', ')
							: `${value[0][0].toUpperCase() + value[0].slice(1)}: \`${value[1]}\``
					)
					.join('\n'),
			},
			message
		)
	);
};

export const name: string = 'help';
export const category: string = "Information";