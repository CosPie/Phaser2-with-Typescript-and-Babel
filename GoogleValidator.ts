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

interface DCMUploadRes {
    status: boolean;
    response: Response;
}

interface Response {
    policy: string;
    result: number;
}

const GoogleH5ValidatorURL = 'https://h5validator.appspot.com/dcm';
const DCMUploadAPI = 'https://h5validator.appspot.com/api/policy/dcm';

const getFormData = (uploadFile: any) => {
    return {
        creative_bundle: fs.createReadStream(path.resolve(__dirname, `./build/${uploadFile}`)),
        allow_large_file_size: 'false', // default false
    };
};

const uploadToGoogleValidator = async () => {
    if (!fs.existsSync(path.resolve(__dirname, './build'))) {
        throw new Error('build Folder is not exist, please execute npm run build');
    }

    let buildDirArr = await fs.readdir(path.resolve(__dirname, './build'));
    let zipFile = buildDirArr
        .filter(dirName => {
            return dirName.indexOf('.zip') !== -1;
        })
        .pop();

    console.info(`try to Upload File:${zipFile}`);

    let uploadFormData = getFormData(zipFile);

    request.post({ url: DCMUploadAPI, formData: uploadFormData }, (err, res, body) => {
        // console.log(body);
        // example res:
        // )]}',
        // {"status": true, "response": {"policy": "dcm", "result": 6704950093807616}}

        let data: DCMUploadRes = JSON.parse(body.slice(6));
        let resultID = data.response.result;
        child_process.exec(`start https://h5validator.appspot.com/dcm/asset?result=${resultID}`);
    });
};
export default uploadToGoogleValidator();
