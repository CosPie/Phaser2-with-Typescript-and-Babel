import fs from 'fs-extra';
import path from 'path';
const chalk = require('chalk');
const ora = require('ora');

// 下划线转换驼峰
const toHump = (name: string) => {
    return name.replace(/\_(\w)/g, function(all: any, letter: string) {
        return letter.toUpperCase();
    });
};
const getCodeSnippets = () => {
    const imagesPath = path.resolve(__dirname, '../assets/images/');
    const imagesFiles = fs.readdirSync(imagesPath);
    const codeLines = imagesFiles.map(fileName => {
        let imageKey = toHump(fileName)
            .split('.')
            .shift();
        if (fileName.toLowerCase().indexOf('keyframe') !== -1) {
            return `    game.load.spritesheet('${imageKey}', './assets/images/${fileName}',0,0);`;
        } else {
            return `    game.load.image('${imageKey}', './assets/images/${fileName}');`;
        }
    });
    const codeSnippets = `export default function autoPreload(game: Phaser.Game) {\n${codeLines.join('\n')}\n}`;
    return codeSnippets;
};

const generate = () => {
    // generate Images preload
    const loader = ora('Auto generate Preload...').start();
    const preloadFilePath = path.resolve(__dirname, '../src/ts/auto_preload.ts');
    fs.writeFile(preloadFilePath, getCodeSnippets(), err => {
        if (err) {
            loader.fail();
            throw new Error(err.message);
        }
        loader.succeed();
    });
    loader.stop();
};
export default generate();
