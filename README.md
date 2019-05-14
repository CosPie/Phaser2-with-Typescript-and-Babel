# Phaser2-with-Typescript-and-Babel

## 功能
1. 快速生成两套区分安卓/IOS游戏下载链接的项目文件夹,并生成`*.zip`打包文件
2. 支持根据图片资源,以驼峰规则自动生成preload文件
3. 支持一步上传到[GoogleH5Validator](https://h5validator.appspot.com/adwords/asset)并显示结果

## Todo

1. [x] 根据安卓\IOS 链接 打包成两份,文件名按指定格式

2. [x] 根据驼峰规则自动生成preload文件.

3. [ ] 使用 cross-env 解决Unix/Win下scripts变量的兼容问题

4. [ ] 根据文件名进行生成preload File.(序列帧需包含keyframe关键帧)

5. [ ] image compress handler

6. [ ] media (such as _.mp3 , _.wav file) file-loader

7. [ ] add the font handler

8. [ ] dts gen tool
   
9.  [x] 使用WebpackReplaceLoader插件取代相关正则替换方式



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
配置后的链接将会通过正则对代码中的关键字进行替换。
以下列出使用到的`全局关键字`:

* `GLOBALDOWNLOADURL`: 游戏下载链接.生产环境下会自动填充安卓/IOS链接,开发环境则会填充package.json中的 config.devURL 内容.

* `GLOBALWIDTH`和`GLOBALHEIGHT`: 游戏的宽高.由 package.json 中的config.direction决定, 默认当且仅当direction为 `'verticatl'`时,宽高为竖版:320x480。direction填如`'horizental'`或其他任意值时,宽高均为横版:480x320。

示例:

`index.ts`:
```typescript
IGame.gameConfig = {
    width: 'GLOBALWIDTH',
    height: 'GLOBALHEIGHT',
};
```
替换后:
```typescript
IGame.gameConfig={
    width:'320',
    height:'480'
}
// 如果需要Number类型,请进行转换
// Number(IGame.gameConfig.width)
```



## 命令使用

为了避免script长名称的记忆,以及在TERMINAL中的冗长输入 , 推荐VSCODE TASK RUNNER扩展,或者直接使用VSCODE中的`运行任务`快捷键配合使用.

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
本文件存放数据传输对象(Data Transfer Object).

为JSON格式的数据快速生成接口的工具使用方法如下:
1. 安装 QuickType VSCODE 扩展
2. 创建数据的 `[name].json` file并打开.
3. `Ctrl+P` 输入 `Open QuickType for Typescript`.
4. 复制生成接口数据内容到 dto.d.ts中

## Typescript

1. 使用babel-loader 进行 `*.ts` 无安全类型检查的编译 , 提高编译速度,避免在快速开发时Ts的类型纠错提醒。
2. 如果有类型检查需要时，再运行 `npm run check-types`

> See more detail:[TypeScript With Babel: A Beautiful Marriage - I Am Turns](https://iamturns.com/typescript-babel/)

## Use Scss

Phaser小游戏几乎不需要用到CSS,但为了后续可能的需要,这里默认提供了SCSS.

## Code Format

Prettier + Eslint 进行格式化 `*.ts` 文件.
2019年Ts官方已经不建议使用Tslint,而是使用Eslint进行代码格式化.
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
