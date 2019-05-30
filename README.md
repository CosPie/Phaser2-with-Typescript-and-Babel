# Phaser2-with-Typescript-and-Babel

## 功能

1. 快速生成两套区分安卓/IOS 游戏下载链接的项目文件夹,并生成`*.zip`打包文件
2. 支持根据图片资源,以驼峰规则自动生成 preload 文件
3. 支持一步上传到[GoogleH5Validator](https://h5validator.appspot.com/adwords/asset)并显示结果

## Todo

1. [x] 根据安卓\IOS 链接 打包成两份,文件名按指定格式

2. [x] 根据驼峰规则自动生成 preload 文件.

3. [x] 根据文件名进行生成 preload File.(序列帧需包含 keyframe 关键帧)

4. [x] 使用 WebpackReplaceLoader 插件取代相关正则替换方式

5. [ ] image compress handler

6. [ ] font handler (小游戏大小限制在1M内,一般没有字体,如果有再加)

7. [ ] 使用 cross-env 解决 Unix/Win 下 scripts 变量的兼容问题

8. [ ] media (such as _.mp3 , _.wav file) file-loader



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

// output
// i ｢wds｣: Project is running at http://172.16.30.206:4000/
// i ｢wds｣: webpack output is served from /
// i ｢wdm｣:
// i ｢wdm｣: Compiled successfully.
```

(可选方案一),如果你想在开发时,严格受到Typescript的类型检查约束下开发,以确保良好的代码健壮性,可以运行 `npm run check-types:watch` (其实我只觉得它很烦,一般我选下面的方案)


(可选方案二),如果你开发完成后,希望对代码进行类型和质量检查,以增加代码健壮性, 请执行 `npm run check-types` 查看项目中可能存在的类型错误.

4. 开发完成后, 执行 `npm run build` ,将会出现webpack信息和压缩后zip包的大小信息.如果大小超出1MB,会给出提示,但不会中断操作或报错.
```shell
...........................................................
    [3] (webpack)/buildin/module.js 497 bytes {0} [built]
        + 1 hidden module

phaser2-with-typscript-and-babel@1.0.0 build:generate  
ts-node ./devTools/build.ts

phaser2-with-typscript-and-babel@1.0.0 build:zip  
ts-node ./devTools/zip.ts

游戏名_竖版_IOS_姓名:300kb
游戏名_竖版_安卓_姓名:300kb

Terminal will be reused by tasks, press any key to close it.
```

5. 上传Google Assets Validator 检查是否有错误, 执行: `npm run check-h5validator:proxy` 命令:

```shell
 Executing task: npm run check-h5validator:proxy 

? Select a *.zip file to upload:  (Use arrow keys)
> 游戏名_竖版_IOS_姓名.zip
  游戏名_竖版_安卓_姓名.zip

// 选择任意一个然后按确定进行上传
```

1. 查看上传结果.检测全通过则显示All Pass信息和详细审核地址. 如果有错误将自动使用默认浏览器打开.
```shell
? Select a *.zip file to upload:  游戏名_竖版_IOS_姓名.zip
All Passed.
See more detail:https://h5validator.appspot.com/adwords/asset?result=5474306617507840
```

## 配置

打开 `package.json`文件,在 `config`属性字段中进行配置,配置示例:

```json
    "config": {
        "gameName": "游戏名",
        "developer": "开发者名称",
        "direction": "horizental",
        "devURL": "http://www.baidu.com",
        "androidURL": "http://www.android.com",
        "iosURL": "http://www.ios.com"
    },
```

配置后的链接将会通过正则对代码中的关键字进行替换。
以下列出使用到的`全局关键字`:

-   `GLOBALDOWNLOADURL`: 游戏下载链接.生产环境下会自动填充安卓/IOS 链接,开发环境则会填充 package.json 中的 config.devURL 内容.

-   `GLOBALWIDTH`和`GLOBALHEIGHT`: 游戏的宽高.由 package.json 中的 config.direction 决定, 默认当且仅当 direction 为 `'verticatl'`时,宽高为竖版:320x480。direction 填如`'horizental'`或其他任意值时,宽高均为横版:480x320。

示例:

`index.ts`:

```typescript
IGame.gameConfig = {
    width: 'GLOBALWIDTH',
    height: 'GLOBALHEIGHT',
};

this.game.input.onTap.add(()=>{
    window.location.href='GLOBALDOWNLOADURL';
})
```

替换后:

```typescript
IGame.gameConfig = {
    width: '320',
    height: '480',
};

// dev
this.game.input.onTap.add(()=>{
    window.location.href='http://www.baidu.com';
})

// 安卓
this.game.input.onTap.add(()=>{
    window.location.href='http://www.android.com';
})
// IOS
this.game.input.onTap.add(()=>{
    window.location.href='http://www.ios.com';
})

// 如果需要Number类型,请进行转换
// Number(IGame.gameConfig.width)
// or parseInt(IGame.gameConfig.width,10)
```

## 命令使用

为了避免 script 长名称的记忆,以及在 TERMINAL 中的冗长输入 , 推荐 VSCODE TASK RUNNER 扩展,或者直接使用 VSCODE 中的`运行任务`快捷键配合使用.

常用:

`npm run dev`: 开发环境,自动生成资源后进入 webpack-dev-server:watch 模式。

`npm run build`: 将会得到两套生产环境项目文件夹和 Zip 压缩包,等同于:执行完 webpack 任务后+`npm run build:generate && npm run build:zip`;

`npm run check-h5validator:proxy` : (代理模式) 选择文件上传到 GoogleH5Validator,并以默认浏览器打开

更多:

`npm run build:generate`: 根据 dist 目录重新生成两套生产环境项目文件夹

`npm run build:zip`: 将 build 目录下的项目文件夹重新打包为 Zip 压缩包

`npm run check-types` : 调用 Typescript 对代码进行类型检查

`npm run check-h5validator` : 选择文件上传到 GoogleH5Validator,并以默认浏览器打开



## DTO.d.ts

本文件存放数据传输对象(Data Transfer Object).

为 JSON 格式的数据快速生成接口的工具使用方法如下:

1. 安装 QuickType VSCODE 扩展
2. 创建数据的 `[name].json` file 并打开.
3. `Ctrl+P` 输入 `Open QuickType for Typescript`.
4. 复制生成接口数据内容到 dto.d.ts 中

## Typescript

1. 使用 babel-loader 进行 `*.ts` 无安全类型检查的编译 , 提高编译速度,避免在快速开发时 Ts 的类型纠错提醒。
2. 如果有类型检查需要时，再运行 `npm run check-types`

> See more detail:[TypeScript With Babel: A Beautiful Marriage - I Am Turns](https://iamturns.com/typescript-babel/)

## Use Scss

Phaser 小游戏几乎不需要用到 CSS,但为了后续可能的需要,这里默认提供了 SCSS. 但涉及到 node-sass ,会使脚手架安装速度变慢很多 ,考虑以后移除SCSS支持.

## Code Format

Prettier + Eslint 进行格式化 `*.ts` 文件.
2019 年 Ts 官方已经不建议使用 Tslint,而是使用 Eslint 进行代码格式化.

> See more detail: [TSLint in 2019 – Palantir Blog – Medium](https://medium.com/palantir/tslint-in-2019-1a144c2317a9)

## 注意点

Ts+Babel 的组合并不支持以下四种用法:

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
