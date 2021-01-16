import { RunFunction } from '../../interfaces/Command';
import got from 'got';

export const run: RunFunction = async (client, message, args) => {
	got('https://www.reddit.com/r/dankmemes/random/.json').then((response) => {
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
	});
};

export const name: string = 'dankmeme';
export const category: string = 'Fun';
export const aliases: string[] = ['dm'];
