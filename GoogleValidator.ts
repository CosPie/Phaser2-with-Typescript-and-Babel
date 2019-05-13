/**
 * 上传build文件夹中自然顺序第一个Zip文件到谷歌H5Validator中,并自动打开浏览器显示检查结果
 * @todo 添加inquire
 * @Before 请确保已经执行了build任务,存在打包的zip文件
 * @Note 确保命令行网络环境能够访问Google
 *
 */

// please ensure your commandline's network use proxy.
// SET CMD HTTP_PROXY:
// set http_proxy=http://127.0.0.1:1080
// set https_proxy=http://127.0.0.1:1080

import request from 'request';
import fs from 'fs-extra';
import path from 'path';
import child_process from 'child_process';
const inquirer = require('inquirer');
const chalk = require('chalk');
const ora = require('ora');

const log = console.log;
const greenF = chalk.green;
const redF = chalk.red;

interface UploadRes {
    status: boolean;
    response: UploadResponse;
}

interface UploadResponse {
    policy: string;
    result: number;
}
interface UploadValidationResult {
    status: boolean;
    response: Response;
}

interface Response {
    policy: Policy;
    result: Result;
    batch_result_path: null;
}

interface Policy {
    default_preview_expand: boolean;
    name: string;
    input_type: string;
    allow_preview_popups: boolean;
    supports_preview: boolean;
    slug: string;
}

interface Result {
    validation_case_results: ValidationCaseResult[];
    date_run: string;
    creative_bundle_filesize: number;
    policy: string;
    landing_pages_id: null;
    creative_bundle_name: string;
    id: number;
    previews: Preview[];
}

interface Preview {
    src: string;
    width: number;
    name: string;
    height: number;
}

interface ValidationCaseResult {
    status: Status;
    name: string;
    status_int: number;
    error_messages: any[];
    was_run: boolean;
    error_template: string;
    description: string;
}

enum Status {
    Pass = 'PASS',
}
// 默认使用ADW上传
const ADWUploadAPI = 'https://h5validator.appspot.com/api/policy/adwords';
const DCMUploadAPI = 'https://h5validator.appspot.com/api/policy/dcm';

const uploadADWResultURL = 'https://h5validator.appspot.com/adwords/asset?result=';
const uploadDCMResultURL = 'https://h5validator.appspot.com/dcm/asset?result=';

const getFormData = (uploadFileName: any) => {
    let uploadFileStream = fs.createReadStream(path.resolve(__dirname, `./build/${uploadFileName}`));
    let uploadFileSize = fs.statSync(path.resolve(__dirname, `./build/${uploadFileName}`)).size;
    if (uploadFileSize / 1024 >= 1024) {
        log(chalk.red(`${uploadFileName}文件超出1Mb,可能无法上传.`));
    }
    return {
        creative_bundle: uploadFileStream,
        allow_large_file_size: 'true', // default false
    };
};

const uploadToGoogleValidator = async () => {
    if (!fs.existsSync(path.resolve(__dirname, './build'))) {
        throw new Error('build Folder is not exist, please execute npm run build');
    }

    let buildDirArr = await fs.readdir(path.resolve(__dirname, './build'));
    let zipFiles = buildDirArr.filter(dirName => {
        return dirName.indexOf('.zip') !== -1;
    });

    const answers = await inquirer.prompt([
        {
            type: 'list',
            name: 'selectUploadFile',
            message: 'Select a *.zip file to upload: ',
            choices: [...zipFiles],
        },
    ]);
    if (answers.length == 0) {
        log('No select file');
        return;
    }

    let uploadFormData = getFormData(answers.selectUploadFile);

    const uploadSpinner = ora('Uploading...').start();
    // log(chalk.green('Uploading...'));
    request.post({ url: ADWUploadAPI, formData: uploadFormData }, (err, res, body) => {
        if (err) {
            throw new Error(err);
        }
        if (!body) {
            throw new Error('body is undefined');
        }
        uploadSpinner.stop();

        // example body data:
        // )]}',
        // {"status": true, "response": {"policy": "dcm", "result": 6704950093807616}}

        let data: UploadRes = JSON.parse(body.slice(6));
        let resultID = data.response.result;

        // 直接在控制台显示是否通过的结果:
        const resultSpinner = ora('Get validated result...').start();
        request.get({ url: `${ADWUploadAPI}/result/${resultID}` }, (err, res, body) => {
            let resultData: UploadValidationResult = JSON.parse(body.slice(6));
            let validationCaseResults = resultData.response.result.validation_case_results;

            let isAllPassed = validationCaseResults.every(rs => {
                return rs.status === 'PASS';
            });
            resultSpinner.stop();

            if (isAllPassed) {
                log(greenF('All Passed.'));
            } else {
                log(redF('Exist Error.'));
            }
            log('see More Detail:' + `${uploadADWResultURL}${resultID}`);
        });
        child_process.exec(`start ${uploadADWResultURL}${resultID}`);
    });
};
export default uploadToGoogleValidator();
