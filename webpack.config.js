const path = require("path");

const CopyPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
    entry: {
        main: "./app/source.js"
    },

    plugins: [
        new CopyPlugin({
            patterns: [{ from: "app", to: "" }],
        }),
    ],

    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    "format": { comments: /@license/i },
                    "mangle": {
                        properties: { regex: /^_/ }
                    }
                },
                exclude: "lodash.min.js",
                extractComments: false,
            })
        ],
    },

    output: {
        filename: "source.js"
    },
};
