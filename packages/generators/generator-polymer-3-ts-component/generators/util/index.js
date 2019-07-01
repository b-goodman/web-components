/* eslint-disable prettier/prettier */
const getClassName = (componentName) => {
    return componentName.toLowerCase().split("-").map( (str) => {
        return `${str.charAt(0).toUpperCase()}${str.slice(1)}`
    }).join("")
};

const templateToDestTuples = [
    [".gitignore"],
    ["index.html"],
    ["package.json"],
    ["README.md"],
    ["tsconfig.json"],
    ["webpack.dvl.conf.template", "webpack.dvl.conf.js"],
    ["webpack.prd.conf.template", "webpack.prd.conf.js"],
    ["src/index.template", "src/index.ts"],
    ["src/styles.css"],
    ["src/template.html"],
    ["src/typings.d.ts"]
];

const reservedTagNames = [
    "annotation-xml",
    "color-profile",
    "font-face",
    "font-face-src",
    "font-face-uri",
    "font-face-format",
    "font-face-name",
    "missing-glyph"
]

module.exports = {
    getClassName, templateToDestTuples, reservedTagNames
}