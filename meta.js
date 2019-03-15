const path = require('path')
const fs = require('fs')

const { sortDependencies, installDependencies, runLintFix, printMessage } = require('./utils')

const { addTestAnswers } = require('./scenarios')

module.exports = {
  metalsmith: {
    // When running tests for the template, this adds answers for the selected scenario
    before: addTestAnswers
  },
  helpers: {
    if_or(v1, v2, options) {
      if (v1 || v2) {
        return options.fn(this)
      }

      return options.inverse(this)
    },
    if_neq(v1, v2, options) {
      if (v1 != v2) {
        return options.fn(this)
      }

      return options.inverse(this)
    }
  },

  prompts: {
    name: {
      when: 'isNotTest',
      type: 'string',
      required: true,
      message: '项目名（应用名）：'
    },
    description: {
      when: 'isNotTest',
      type: 'string',
      required: false,
      message: '项目描述：',
      default: 'A Vue.js project'
    },
    author: {
      when: 'isNotTest',
      type: 'string',
      message: '作者：'
    },
    devProxyUrl: {
      when: 'isNotTest',
      type: 'string',
      message: 'Api 代理 url：'
    },
    autoInstall: {
      when: 'isNotTest',
      type: 'list',
      message: '选择安装依赖方式',
      choices: [
        {
          name: '使用 NPM',
          value: 'npm',
          short: 'npm'
        },
        {
          name: '使用 Yarn',
          value: 'yarn',
          short: 'yarn'
        },
        {
          name: '自定义',
          value: false,
          short: 'no'
        }
      ]
    }
  },
  filters: {},
  complete: function(data, { chalk }) {
    const green = chalk.green

    sortDependencies(data, green)

    const cwd = path.join(process.cwd(), data.inPlace ? '' : data.destDirName)

    if (data.autoInstall) {
      installDependencies(cwd, data.autoInstall, green)
        .then(() => {
          return runLintFix(cwd, data, green)
        })
        .then(() => {
          printMessage(data, green)
        })
        .catch(e => {
          console.log(chalk.red('Error:'), e)
        })
    } else {
      printMessage(data, chalk)
    }
  }
}
