import { RunFunction } from "../../interfaces/Command";

export const run: RunFunction = async (client, message, args, prefix) => {
	let target = message.mentions.users.first() || message.author;

	let webp16 = target.displayAvatarURL({
		format: "webp",
		size: 16,
	});
	let webp32 = target.displayAvatarURL({
		format: "webp",
		size: 32,
	});
	let webp64 = target.displayAvatarURL({
		format: "webp",
		size: 64,
	});
	let webp128 = target.displayAvatarURL({
		format: "webp",
		size: 128,
	});
	let webp256 = target.displayAvatarURL({
		format: "webp",
		size: 256,
	});
	let webp512 = target.displayAvatarURL({
		format: "webp",
		size: 512,
	});
	let webp1024 = target.displayAvatarURL({
		format: "webp",
		size: 1024,
	});
	let webp2048 = target.displayAvatarURL({
		format: "webp",
		size: 2048,
	});
	let webp4096 = target.displayAvatarURL({
		format: "webp",
		size: 4096,
	});

	let png16 = target.displayAvatarURL({
		format: "png",
		size: 16,
	});
	let png32 = target.displayAvatarURL({
		format: "png",
		size: 32,
	});
	let png64 = target.displayAvatarURL({
		format: "png",
		size: 64,
	});
	let png128 = target.displayAvatarURL({
		format: "png",
		size: 128,
	});
	let png256 = target.displayAvatarURL({
		format: "png",
		size: 256,
	});
	let png512 = target.displayAvatarURL({
		format: "png",
		size: 512,
	});
	let png1024 = target.displayAvatarURL({
		format: "png",
		size: 1024,
	});
	let png2048 = target.displayAvatarURL({
		format: "png",
		size: 2048,
	});
	let png4096 = target.displayAvatarURL({
		format: "png",
		size: 4096,
	});

	let jpeg16 = target.displayAvatarURL({
		format: "jpeg",
		size: 16,
	});
	let jpeg32 = target.displayAvatarURL({
		format: "jpeg",
		size: 32,
	});
	let jpeg64 = target.displayAvatarURL({
		format: "jpeg",
		size: 64,
	});
	let jpeg128 = target.displayAvatarURL({
		format: "jpeg",
		size: 128,
	});
	let jpeg256 = target.displayAvatarURL({
		format: "jpeg",
		size: 256,
	});
	let jpeg512 = target.displayAvatarURL({
		format: "jpeg",
		size: 512,
	});
	let jpeg1024 = target.displayAvatarURL({
		format: "jpeg",
		size: 1024,
	});
	let jpeg2048 = target.displayAvatarURL({
		format: "jpeg",
		size: 2048,
	});
	let jpeg4096 = target.displayAvatarURL({
		format: "jpeg",
		size: 4096,
	});

	let jpg16 = target.displayAvatarURL({
		format: "jpg",
		size: 16,
	});
	let jpg32 = target.displayAvatarURL({
		format: "jpg",
		size: 32,
	});
	let jpg64 = target.displayAvatarURL({
		format: "jpg",
		size: 64,
	});
	let jpg128 = target.displayAvatarURL({
		format: "jpg",
		size: 128,
	});
	let jpg256 = target.displayAvatarURL({
		format: "jpg",
		size: 256,
	});
	let jpg512 = target.displayAvatarURL({
		format: "jpg",
		size: 512,
	});
	let jpg1024 = target.displayAvatarURL({
		format: "jpg",
		size: 1024,
	});
	let jpg2048 = target.displayAvatarURL({
		format: "jpg",
		size: 2048,
	});
	let jpg4096 = target.displayAvatarURL({
		format: "jpg",
		size: 4096,
	});

	let gif16 = target.displayAvatarURL({
		format: "gif",
		dynamic: true,
		size: 16,
	});
	let gif32 = target.displayAvatarURL({
		format: "gif",
		dynamic: true,
		size: 32,
	});
	let gif64 = target.displayAvatarURL({
		format: "gif",
		dynamic: true,
		size: 64,
	});
	let gif128 = target.displayAvatarURL({
		format: "gif",
		dynamic: true,
		size: 128,
	});
	let gif256 = target.displayAvatarURL({
		format: "gif",
		dynamic: true,
		size: 256,
	});
	let gif512 = target.displayAvatarURL({
		format: "gif",
		dynamic: true,
		size: 512,
	});
	let gif1024 = target.displayAvatarURL({
		format: "gif",
		dynamic: true,
		size: 1024,
	});
	let gif2048 = target.displayAvatarURL({
		format: "gif",
		dynamic: true,
		size: 2048,
	});
	let gif4096 = target.displayAvatarURL({
		format: "gif",
		dynamic: true,
		size: 4096,
	});

	return await message.channel.send(
		client
			.embed(
				{ title: "Choose your desired file format and size" },
				message
			)
			.addFields(
				{
					name: "WebP:",
					value: `[16](${webp16}) | [32](${webp32}) | [64](${webp64}) | [128](${webp128}) | [256](${webp256}) | [512](${webp512}) | [1024](${webp1024}) | [2048](${webp2048}) | [4096](${webp4096})`,
				},
				{
					name: "PNG:",
					value: `[16](${png16}) | [32](${png32}) | [64](${png64}) | [128](${png128}) | [256](${png256}) | [512](${png512}) | [1024](${png1024}) | [2048](${png2048}) | [4096](${png4096})`,
				},
				{
					name: "Jpeg:",
					value: `[16](${jpeg16}) | [32](${jpeg32}) | [64](${jpeg64}) | [128](${jpeg128}) | [256](${jpeg256}) | [512](${jpeg512}) | [1024](${jpeg1024}) | [2048](${jpeg2048}) | [4096](${jpeg4096})`,
				},
				{
					name: "JPG",
					value: `[16](${jpg16}) | [32](${jpg32}) | [64](${jpg64}) | [128](${jpg128}) | [256](${jpg256}) | [512](${jpg512}) | [1024](${jpg1024}) | [2048](${jpg2048}) | [4096](${jpg4096})`,
				},
				{
					name: "GIF",
					value: `[16](${gif16}) | [32](${gif32}) | [64](${gif64}) | [128](${gif128}) | [256](${gif256}) | [512](${gif512}) | [1024](${gif1024}) | [2048](${gif2048}) | [4096](${gif4096})`,
				}
			)
			.setThumbnail(gif512)
	);
};

export const name: string = "avatar";
export const category: string = "Utility";
export const description: string = "Fetch anyone's avatar in every format";
export const aliases: string[] = ["profile"];
