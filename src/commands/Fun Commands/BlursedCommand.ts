import { RunFunction } from '../../interfaces/Command';
import got from 'got';
import checkIfDisabled from '../../functions/checkIfDisabled';

export const run: RunFunction = async (client, message) => {
	if (checkIfDisabled(message, 'fun') === true)
		return await message.channel.send(
			client.embed(
				{ description: `Fun commands are disabled in this server.` },
				message
			)
		);
	got('https://www.reddit.com/r/blursedimages/random/.json').then(
		(response) => {
			//Fetch most of the data from the reddit post it recieves
			let content = JSON.parse(response.body);
			let permalink = content[0].data.children[0].data.permalink;
			let memeUrl = `https://reddit.com${permalink}`;
			let memeImage = content[0].data.children[0].data.url;
			let memeTitle = content[0].data.children[0].data.title;
			let memeUpvotes = content[0].data.children[0].data.ups;
			let memeDownvotes = content[0].data.children[0].data.downs;
			let memeNumComments = content[0].data.children[0].data.num_comments;

			message.channel.send(
				client
					.embed({ title: memeTitle, url: memeUrl }, message)
					.setFooter(
						`👍 ${memeUpvotes} 👎 ${memeDownvotes} 💬 ${memeNumComments}`
					)
					.setImage(memeImage)
			);
		}
	);
};

export const name: string = 'blursed';
export const category: string = 'Fun';
export const description: string =
	'Get a random image from the blursedimages subreddit';
