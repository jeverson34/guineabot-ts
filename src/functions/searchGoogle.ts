import request from "node-superfetch";
import { Bot } from "../client/Client";
async function searchGoogle(client: Bot, query: string) {
	const csx: string = client.config.google_csx;
	const apiKey: string = client.config.google_api_key;
	const { body } = await request
		.get("https://www.googleapis.com/customsearch/v1")
		.query({
			key: apiKey,
			cx: csx,
			safe: "off",
			q: query,
		});
	if (!(body as any).items) return null;
	return (body as any).items[0];
}

export default searchGoogle;
