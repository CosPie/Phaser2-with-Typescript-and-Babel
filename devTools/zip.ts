import fs from 'fs-extra';
import path from 'path';
const archiver = require('archiver');

const zip = async () => {
    const dirArr = await fs.readdir(path.resolve(__dirname, '../build/'));
    dirArr.map(dir => {
        fs.lstat(path.resolve(__dirname, '../build/', dir)).then(stats => {
            if (stats.isDirectory()) {
                archiveDir(path.resolve(__dirname, '../build/', dir), dir);
            }
        });
    });
};

const archiveDir = (src: string, outputFile: string) => {
    // generate Zip
    const output = fs.createWriteStream(path.resolve(__dirname, `../build/${outputFile}.zip`));
    const archive = archiver('zip');

    output.on('close', function() {
        let size = Math.ceil(Number(archive.pointer() / 1024));
        console.log(`${outputFile}:${size}kb`);
        if (size >= 1024) {
            console.warn(`${outputFile} 文件大小超出1Mb,可能无法上传到GoogleValidator.`);
        }
    });

    archive.on('error', function(err: any) {
        throw err;
    });

    archive.pipe(output);

    archive.directory(src, false);
    archive.finalize();
};
export default zip();
