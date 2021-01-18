import consola, { Consola } from 'consola';
import {
	Client,
	MessageEmbedOptions,
	Message,
	MessageEmbed,
	Intents,
	Collection,
} from 'discord.js';
import glob from 'glob';
import { promisify } from 'util';
import { Command } from '../interfaces/Command';
import { Event } from '../interfaces/Event';
import { Config } from '../interfaces/Config';

const globPromise = promisify(glob);

class Bot extends Client {
	public logger: Consola = consola;
	public commands: Collection<string, Command> = new Collection();
	public aliases: Collection<string, string> = new Collection();
	public events: Collection<string, Event> = new Collection();
	public cooldowns: Collection<string, number> = new Collection();
	public categories: Set<string> = new Set();
	public config: Config;
	public constructor() {
		super({
			ws: { intents: Intents.ALL },
			messageCacheLifetime: 180,
			messageCacheMaxSize: 200,
			messageEditHistoryMaxSize: 200,
			messageSweepInterval: 180,
			partials: ['MESSAGE', 'CHANNEL', 'REACTION']
		});
	}
	public async start(config: Config): Promise<void> {
		this.config = config;
		this.login(config.token);
		const commandFiles: string[] = await globPromise(
			`${__dirname}/../commands/**/*{.ts,.js}`
		);
		commandFiles.map(async (value: string) => {
			const file: Command = await import(value);
			this.commands.set(file.name, {
				cooldown: 1000,
				...file,
			});
			this.categories.add(file.category);
			if (file.aliases?.length) {
				file.aliases.map((value: string) => this.aliases.set(value, file.name));
			}
		});
		const eventFiles: string[] = await globPromise(
			`${__dirname}/../events/**/*{.ts,.js}`
		);
		eventFiles.map(async (value: string) => {
			const file: Event = await import(value);
			this.events.set(file.name, file);
			this.on(file.name, file.run.bind(null, this));
		});
	}
	public embed(options: MessageEmbedOptions, message: Message): MessageEmbed {
		return new MessageEmbed({ ...options, color: 'RANDOM' })
			.setFooter(
				`${message.author.tag}`,
				message.author.displayAvatarURL({
					dynamic: true,
					format: 'png',
				})
			)
			.setTimestamp();
	}
}

export { Bot };
