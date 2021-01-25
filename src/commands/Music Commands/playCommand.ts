import { RunFunction } from "../../interfaces/Command";
import checkIfDisabled from "../../functions/checkIfDisabled";4
import db from "quick.db";
import spotify from "spotify-web-api-node";

export const run: RunFunction = async (client, message, args, prefix) => {
	if (checkIfDisabled(message, "music") === true)
		return await message.channel.send(
			client.embed(
				{ description: "Music commands are disabled in this server." },
				message
			)
		);
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
							"I am already connected to a voice channel!",
					},
					message
				)
			);
	}
	if (!message.guild.me.permissions.has("CONNECT"))
		return await message.channel.send(
			client.embed(
				{ description: "I am missing the permission to `connect`." },
				message
			)
		);
	if (!message.guild.me.permissions.has("SPEAK"))
		return await message.channel.send(
			client.embed(
				{ description: "I am missing the permission to `speak`." },
				message
			)
		);

	const api = new spotify({
		clientId: client.config.spotify_client_id,
		clientSecret: client.config.spotify_client_secret,
		redirectUri: "https://localhost:8888/callback",
	});

	const spotifyRegex = /^(spotify:track|https:\/\/[a-z]+\.spotify\.com\/track)/
	let search: any = args.join(" ");

	if (!search)
		return await message.channel.send(
			client.embed(
				{ description: "Please enter the search/url." },
				message
			)
		);

	if (spotifyRegex.test(search)) {
		let trackID: string

		if (search && search.includes("spotify:track:")) {
			let track = search.split(":")
			trackID = track[2]
		} else {
			let track = search.split("/")
			let track2 = track[4].split("?")
			trackID = track2[0]
		}

		let savedToken = db.get(`spotify-token`)
		let success: boolean

		if (!savedToken || savedToken.expires_in < Date.now()) {
			await api.clientCredentialsGrant().then(async data => {
				let token = data.body["access_token"]
				let expiresIn: any = data.body["expires_in"]
				api.setAccessToken(token)
				db.set("spotify-token", {
					token: token,
					expires_in: expiresIn + Date.now()
				})
				success = true
			}).catch(err => {
				client.logger.error(err)
				success = false
			})
		} else {
			api.setAccessToken(savedToken.token)
			success = true
		}

		if (success === true) {
			let dataFetched: SpotifyApi.SingleTrackResponse
			search = await api.getTrack(trackID).then(async data => {
				dataFetched = data.body;
				let artistsA = []
				let artists = dataFetched.artists.length
				for (let i = 0; i < artists; i++) {
					artistsA.push(dataFetched.artists[i].name)
				}
				let query = artistsA.join(", ") + " - " + dataFetched.name + " official audio"
				return query
			}).catch(err => {
				client.logger.error(err)
				return message.channel.send(client.embed({ description: `An error occurred: ${err.message}` }, message))
			})
		}
	}

	try {
		await client.music.play(message, search, true);
	} catch (error) {
		client.logger.error(error);
		return await message.channel.send(
			client.embed(
				{ description: `An error occurred: ${error.message}` },
				message
			)
		);
	}
};

export const name: string = "play";
export const category: string = "Music";
export const description: string = "Play a song in a voice channel";
export const aliases: string[] = ["p"];
