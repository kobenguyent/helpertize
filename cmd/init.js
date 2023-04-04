import { isFileExisting } from "../utils/fileHelper.js";

export function init() {
	global.helpertize_dir = isFileExisting(
		"./node_modules/helpertize/package.json",
	)
		? "./node_modules/helpertize"
		: ".";
}
