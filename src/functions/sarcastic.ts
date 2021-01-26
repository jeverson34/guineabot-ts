function sarcastic(args: string) {
	return args
		.split("")
		.map((char, i) => char[`to${i % 2 ? "Upper" : "Lower"}Case`]())
		.join("");
}

export default sarcastic;
