# Phaser2-with-Typescript-and-Babel

## 功能
1. Phaser2+Typescript+Babel /Scss+Postcss/Eslint+Prettier/
2. 快速生成两套区分安卓/IOS游戏下载链接的项目文件夹,并生成`*.zip`打包文件
3. 可自动上传到[GoogleH5Validator](https://h5validator.appspot.com/dcm/asset),并以默认浏览器显示结果页

## Todo

1. [x] 根据安卓\IOS 链接 打包成两份,文件名按指定格式

2. [ ] image compress handler

3. [ ] media (such as _.mp3 , _.wav file) file-loader

4. [ ] Compress Css (postcss, purgecss for remove unused css)

5. [ ] add the font handler

6. [ ] dts gen tool
   
7. [ ] 使用WebpackReplaceLoader插件取代相关正则替换方式



## Quick Start

1. clone the project

```shell
git clone https://github.com/CosPie/Phaser2-with-Typescript-and-Babel.git
```

2. install dependencies

```shell
npm install

# or
yarn install
```

3. run webpack-dev-server

```shell
npm run dev
```

## 配置

打开 `package.json`文件,在 `config`属性字段中进行配置,配置示例:
```json
    "config": {
        "gameName": "游龙传说",
        "developer": "黄竟格",
        "direction": "horizental",
        "devURL": "http://www.baidu.com",
        "androidURL": "http://www.android.com",
        "iosURL": "http://www.ios.com"
    },
```

## 命令使用

常用:

`npm run dev`: 开发环境

`npm run build`: 将会得到两套生产环境项目文件夹和Zip压缩包,等同于:执行完webpack任务后+`npm run build:generate && npm run build:zip`;

`npm run check-h5validator:proxy` : (代理模式) 选择文件上传到GoogleH5Validator,并以默认浏览器打开

更多:

`npm run build:generate`: 根据dist目录重新生成两套生产环境项目文件夹

`npm run build:zip`: 将build目录下的项目文件夹重新打包为Zip压缩包

`npm run check-types` : 调用 Typescript 对代码进行类型检查

`npm run check-h5validator` : 选择文件上传到GoogleH5Validator,并以默认浏览器打开


## DTO.d.ts

1. Install QuickType VSCODE ext
2. create the dto `[name].json` file.
3. open it and use QuickType to generate interface content.
4. copy/paste to the dto.d.ts

## Typescript

1. Use babel-loader to transform `*.ts` file to `*.js` with no type-check , and then it can improved performance.

> see more detail:[TypeScript With Babel: A Beautiful Marriage - I Am Turns](https://iamturns.com/typescript-babel/)

2. if you want to use the type-check , `npm run check-types`

## Use Scss

use Scss css-pre-processing , you can replace it according to the dev Env. (such as less).

## Code Format

use prettier and eslint to format `*.ts` file to replace tslint.

## Note

1. Namespaces.

Solution: don’t use them! They’re outdated. Use the industry standard ES6 modules (import / export) instead. The recommended tslint rules ensure namespaces are not used.

2. Casting a type with the`<newtype>x`syntax.

    Solution: Use x as newtype instead.

3. Const enums.

    This is a shame. Need to resort to regular enums for now.

4. Legacy-style import / export syntax.

    Examples: import foo = require(...) and export = foo.

## Inspire

1. [GitHub - Microsoft/TypeScript-Babel-Starter](https://github.com/Microsoft/TypeScript-Babel-Starter)

2. [Using ESLint and Prettier in a TypeScript Project](https://dev.to/robertcoopercode/using-eslint-and-prettier-in-a-typescript-project-53jb)

3. [TypeScript With Babel: A Beautiful Marriage](https://iamturns.com/typescript-babel/)
