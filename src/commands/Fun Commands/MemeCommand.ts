import { RunFunction } from '../../interfaces/Command';
import * as api from 'imageapi.js';

export const run: RunFunction = async (client, message, args) => {
	const subreddits: string[] = ['memes', 'dankmemes', 'wholesomememes'];
	const subreddit: string =
		subreddits[Math.floor(Math.random() * subreddits.length)];
	const meme = await api.advanced(subreddit, 'top');
	message.channel.send(
		client
			.embed(
				{
					title: `${meme.title}`,
					description: `**By:** u/${meme.author}\n**From:** r/${subreddit}\n**Upvote Ratio:** ${meme.upvoteRatio}%`,
					image: {
						url: meme.img,
					},
				},
				message
			)
			.setFooter(`👍 ${meme.upvotes} | 👎 ${meme.downvotes}`)
	);
};

export const name: string = 'meme';
export const category: string = 'Fun';
