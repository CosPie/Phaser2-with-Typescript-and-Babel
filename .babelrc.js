module.exports = {

    "presets": [
        ["@babel/preset-env", {
            "modules": false,
            "targets": {
                "browsers": [
                    ">1%",
                    "not ie <= 8",
                    "last 2 versions"
                ]
            },
            "corejs": "3.0.0",
            "useBuiltIns": "usage"
        }],
        "@babel/typescript"
    ],
    "plugins": [
        //  make sure that @babel/plugin-proposal-decorators comes before @babel/plugin-proposal-class-properties
        ["@babel/plugin-proposal-decorators", {
            "legacy": true
        }],
        ["@babel/plugin-proposal-class-properties", {
            "loose": true
        }],
        // "@babel/plugin-proposal-decorators",
        // "@babel/proposal-class-properties",
        "@babel/proposal-object-rest-spread",
    ]
}