/* eslint-disable prettier/prettier */
"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");

const util = require("../util");
const validate = require('validate-element-name');

module.exports = class extends Generator {
  async prompting() {
    this.log(yosay(chalk.blue("New Polymer 3 Component")));

    const prompts = [
      {
        type: "input",
        name: "componentName",
        message: "Name of component:",
        validate: (value) => {
          const isValid = validate(value);
          if (!isValid.isValid) {
            return isValid.message;
          };
            return true;
        }
      },
      {
        type: "list",
        name: "packageManager",
        message: "Select package manager",
        choices: ["npm", "yarn"]
      }
    ];

    this.props = await this.prompt(prompts);

  }

  writing() {

    const templateOptions = {
      componentNameAsClass: util.getClassName(this.props.componentName),
      componentName: this.props.componentName
    }

    util.templateToDestTuples.forEach( (pathTuple) => {
      this.fs.copyTpl(
        this.templatePath(pathTuple[0]),
        this.destinationPath( (pathTuple.length === 1) ? pathTuple[0] : pathTuple[1] ),
        templateOptions
      )
    });

    this.fs.readJSON(this.destinationPath("package.json"));
  }

  install() {
    let defaults = {
      npm: false,
      bower: false,
      yarn: false
    };
    defaults[this.props.packageManager] = true;
    this.installDependencies(defaults);
  }
};
