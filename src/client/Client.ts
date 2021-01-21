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
import { Player } from 'discord-player';

const globPromise = promisify(glob);

class Bot extends Client {
	public logger: Consola = consola;
	public commands: Collection<string, Command> = new Collection();
	public aliases: Collection<string, string> = new Collection();
	public events: Collection<string, Event> = new Collection();
	public cooldowns: Collection<string, number> = new Collection();
	public categories: Set<string> = new Set();
	public config: Config;
	public music;
	public constructor() {
		super({
			ws: { intents: Intents.ALL },
			messageCacheLifetime: 180,
			messageCacheMaxSize: 200,
			messageEditHistoryMaxSize: 200,
			messageSweepInterval: 180,
			partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
		});
		this.music = new Player(this, {
			autoSelfDeaf: true,
			leaveOnEmpty: true,
			leaveOnEnd: true,
			leaveOnStop: true,
			leaveOnEmptyCooldown: 5000,
			leaveOnEndCooldown: 5000,
		})
			.on('trackStart', (message, track) => {
				message.channel.send(
					this.embed(
						{
							title: `Now playing`,
							description: `**Track:** ${track.title} by ${track.author}\n**Duration:** ${track.duration}\n**Requested By:** ${track.requestedBy}`,
							url: track.url,
						},
						message
					)
						.setImage(track.thumbnail)
						.setFooter(`${track.views} views`)
				);
			})
			.on('trackAdd', (message, queue, track) => {
				message.channel.send(
					this.embed(
						{
							title: 'Track added to queue',
							description: `**Track:** ${track.title} by ${track.author}\n**Duration:** ${track.duration}\n**Requested By:** ${track.requestedBy}`,
							url: track.url,
						},
						message
					)
						.setImage(track.thumbnail)
						.setFooter(`${track.views} views`)
				);
			})
			.on('playlistAdd', (message, queue, playlist) => {
				message.channel.send(
					this.embed(
						{
							title: `Playlist queued`,
							description: `**Length:** ${playlist.tracks.length} tracks\n**Duration:** ${playlist.duration}\n**Requested By:** ${playlist.requestedBy}`,
							url: playlist.url,
						},
						message
					)
						.setImage(playlist.thumbnail)
						.setFooter(`${playlist.views} views`)
				);
			})
			.on('searchResults', (message, query, tracks) => {
				message.channel.send(
					this.embed(
						{
							title: `Search results for "${query}"`,
							description: `${tracks.map((t, i) => `${i}. ${t.title}`)}`,
						},
						message
					).setFooter('Enter the search number to play the song')
				);
			})
			.on(
				'searchInvalidResponse',
				(message, query, tracks, content, collector) => {
					if (content.toLowerCase() == 'cancel') {
						collector.stop();
						return message.channel.send(
							this.embed(
								{ title: `Search cancelled`, description: `Requested by user` },
								message
							)
						);
					}
					message.channel.send(
						this.embed(
							{
								title: `Search cancelled`,
								description: `You must send a valid number between 1 and ${tracks.length}!`,
							},
							message
						)
					);
				}
			)
			.on('searchCancel', (message, query, tracks) => {
				message.channel.send(
					this.embed(
						{
							title: 'Search cancelled',
							description: 'You did not provide a valid response',
						},
						message
					)
				);
			})
			.on('noResults', (message, query) => {
				message.channel.send(
					this.embed(
						{ description: `No results found on YouTube for "${query}"` },
						message
					)
				);
			})
			.on('queueEnd', (message, queue) => {
				message.channel.send(
					this.embed(
						{ description: `Left voice channel, queue ended.` },
						message
					)
				);
			})
			.on('channelEmpty', (message, queue) => {
				message.channel.send(
					this.embed(
						{ description: `Left voice channel, it was empty.` },
						message
					)
				);
			})
			.on('botDisconnect', (message) => {
				message.channel.send(
					this.embed(
						{
							description:
								'Queue ended, I have been disconnected from the voice channel.',
						},
						message
					)
				);
			})
			.on('error', (error, message) => {
				switch (error) {
					case 'NotPlaying':
						message.channel.send(
							this.embed(
								{ description: `There is no music being played.` },
								message
							)
						);
						break;
					case 'NotConnected':
						message.channel.send(
							this.embed(
								{ description: 'You are not connected in any voice channel!' },
								message
							)
						);
						break;
					case 'UnableToJoin':
						message.channel.send(
							this.embed(
								{
									description:
										"'I am not able to join your voice channel, please check my permissions.",
								},
								message
							)
						);
						break;
					case 'LiveVideo':
						message.channel.send(
							this.embed(
								{ description: 'Youtube live streams are not supported.' },
								message
							)
						);
						break;
					default:
						message.channel.send(
							this.embed(
								{ description: `An error occurred: ${error}` },
								message
							)
						);
				}
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
