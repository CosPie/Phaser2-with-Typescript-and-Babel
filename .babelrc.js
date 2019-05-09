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
        "@babel/proposal-class-properties",
        "@babel/proposal-object-rest-spread"
    ]
}