import {copyFile, isFileExisting, renameFile, replaceTextInFile} from "./fileHelper.js";
import {data} from "../data/data.js";

export function pipelineTypeValidation(pipelineType = "") {
    pipelineType = pipelineType.trim().toLowerCase();
    if (!data[pipelineType])
        throw Error("The passed pipeline type is not supported.");

    return pipelineType;
}
export async function initPublishPipeline(pipelineType, pipelinePath) {
    pipelineType = pipelineTypeValidation(pipelineType);

    if (
        isFileExisting(
            `${data[pipelineType].templatePath}/${data.npmPublishFileName}`,
        ) === false
    )
        throw Error(
            `${data[pipelineType].templatePath}/${data.npmPublishFileName} is not defined.`,
        );

    try {
        await copyFile(
            `${data[pipelineType].templatePath}/npm-publish*.yml`,
            `${pipelinePath}`,
            { flat: true },
        );
    } catch (e) {
        console.error(`Cannot create publish pipeline file due to: ${e.message}`);
    }
}

export async function initCustomHelperSrc(helperName, path) {
    const templatePath = `${global.helpertize_templates_dir}/CustomHelper.txt`;
    try {
        await copyFile(
            templatePath,
            path,
            { flat: true },
        );
        await replaceTextInFile(`${path}/CustomHelper.txt`, /{{CustomHelper}}/g, helperName)
        renameFile(`${path}/CustomHelper.txt`, `${path}/${helperName}.ts`)
    } catch (e) {
        console.error(`Cannot create custom helper source file due to: ${e.message}`);
    }
}

export async function initCustomHelperPackageJson(jsonInfo, path) {
    const fileName = 'package';
    const templatePath = `${global.helpertize_templates_dir}/${fileName}.txt`;
    try {
        await copyFile(
            templatePath,
            path,
            { flat: true },
        );
        await replaceTextInFile(`${path}/${fileName}.txt`, /{{CustomHelper}}/g, jsonInfo.helperName)
        if(jsonInfo.githubUsername) await replaceTextInFile(`${path}/${fileName}.txt`, /{{githubUsername}}/g, jsonInfo.githubUsername)
        renameFile(`${path}/${fileName}.txt`, `${path}/${fileName}.json`)
    } catch (e) {
        console.error(`Cannot create package.json due to: ${e.message}`);
    }
}

export async function initCustomHelperTSConfigJson(path) {
    const fileName = 'tsconfig';
    const templatePath = `${global.helpertize_templates_dir}/${fileName}.json`;
    try {
        await copyFile(
            templatePath,
            path,
            { flat: true },
        );
    } catch (e) {
        console.error(`Cannot create package.json due to: ${e.message}`);
    }
}

export async function initCustomHelperReadme(helperName, path) {
    const templatePath = `${global.helpertize_templates_dir}/README.md`;
    try {
        await copyFile(
            templatePath,
            path,
            { flat: true },
        );
        await replaceTextInFile(`${path}/README.md`, /{{CustomHelper}}/g, helperName)
    } catch (e) {
        console.error(`Cannot create Readme file due to: ${e.message}`);
    }
}
