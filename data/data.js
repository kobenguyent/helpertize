import { init } from "../cmd/init.js";
init();

global.helpertize_templates_dir = `${global.helpertize_dir}/templates`;

export const data = {
	npmPublishFileName: "npm-publish.yml",
	github: {
		templatePath: `${global.helpertize_templates_dir}/github`,
	},
	rome: {
		templatePath: `${global.helpertize_templates_dir}/rome`,
	},
};
