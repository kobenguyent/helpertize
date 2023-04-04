#!/usr/bin/env node
import inquirer from "inquirer";
import {createDir, getCurrentWorkingDir} from "../utils/fileHelper.js";
import CFonts from "cfonts";
import { initRome } from "../utils/romeHepler.js";
import {
	initCustomHelperPackageJson, initCustomHelperReadme,
	initCustomHelperSrc,
	initCustomHelperTSConfigJson,
	initPublishPipeline
} from "../utils/helpertizeHelper.js";
import chalk from "chalk";

CFonts.say("CodeceptJS Helper Scaffolding - Helpertize", {
	font: "chrome", // define the font face
	align: "left", // define text alignment
	colors: ["system"], // define all colors
	background: "transparent", // define the background color, you can also use `backgroundColor` here as key
	space: true, // define if the output text should have empty lines on top and on the bottom
	maxLength: "0", // define how many character can be on one line
	gradient: ["yellow", "#805ad5"], // define your two gradient colors
	independentGradient: true, // define if you want to recalculate the gradient for each new line
	transitionGradient: false, // define if this is a transition between colors directly
	env: "node", // define the environment CFonts is being executed in
});
console.log(
	" 🔌 CodeceptJS Helper Scaffolding with Helpertize",
);

inquirer
	.prompt([
		{
			type: "input",
			name: "rootPath",
			message: "Where do you want to store your Custom Helper?",
			default: undefined,
		},
		{
			type: "input",
			name: "helperName",
			message: "How do you name your Custom Helper?",
			default: "CustomHelper",
		},
		{
			type: "confirm",
			name: "publish",
			message: "Do you plan to publish nodejs package from GitHub to npm?",
			default: false,
		},
		{
			type: "input",
			name: "githubUsername",
			message: "What Github Username do you use to publish this custom helper?",
			default: "helloWorld",
			when: (answers) => answers.publish === true,
		},
		{
			type: "confirm",
			name: "codeformat",
			message: "Do you plan to use Rome - code linter/formatter?",
			default: false,
		},
	])
	.then(async (answers) => {
		const currentWorkingDir = answers.helperName && answers.helperName !== '' ? `${getCurrentWorkingDir()}/${answers.helperName}` : `${getCurrentWorkingDir()}`;
		const workflowsFolder = `${currentWorkingDir}/.github/workflows`;
		const helperFolder = `${currentWorkingDir}/src`;
		const testFolder = `${currentWorkingDir}/test`;

		await createDir(currentWorkingDir)
		await createDir(workflowsFolder)
		await createDir(helperFolder)
		await createDir(testFolder)

		await initPublishPipeline('github', workflowsFolder)
		await initCustomHelperSrc(answers.helperName, helperFolder)
		await initCustomHelperPackageJson({ helperName: answers.helperName, githubUsername: answers.githubUsername}, currentWorkingDir)
		await initCustomHelperTSConfigJson(currentWorkingDir)
		await initCustomHelperReadme(answers.helperName, currentWorkingDir)
		console.log(
			`🍺 The ${chalk.green(
				answers.helperName,
			)} helper could be found at: ${chalk.blue(`${currentWorkingDir}`)}`,
		);
		if (answers.codeformat) await initRome(currentWorkingDir);
	});
