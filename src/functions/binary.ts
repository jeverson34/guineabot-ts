function encode(char: string) {
	return char
		.split("")
		.map((str) => {
			const converted = str.charCodeAt(0).toString(2);
			return converted.padStart(8, "0");
		})
		.join(" ");
}

function decode(char: string) {
	return char
		.split(" ")
		.map((str: string) => String.fromCharCode(Number.parseInt(str, 2)))
		.join("");
}

export default {
	encode: encode,
	decode: decode,
};
