# Phaser2-with-Typescript-and-Babel

## todo

1. [] image compress handler

2. [] media (such as _.mp3 , _.wav file) file-loader

3. [] Compress Css (postcss, purgecss for remove unused css)

4. [] add the font handler

5. [] dts gen tool

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
