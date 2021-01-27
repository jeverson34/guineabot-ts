function encode(textOu) {
	let arr1 = [];
	for (var n = 0, l = textOu.length; n < l; n++) {
		var hex = Number(textOu.charCodeAt(n)).toString(16);
		arr1.push(hex);
	}

	return arr1.join("");
}

function decode(textOu) {
	var hex = textOu.toString();
	var str = "";

	for (var n = 0; n < hex.length; n += 2) {
		str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
	}
	return str;
}

export default {
	encode: encode,
	decode: decode,
};
