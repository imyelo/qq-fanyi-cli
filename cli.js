#!/usr/bin/env node
'use strict'

const meow = require('meow')
const chalk = require('chalk')
const { LANGUAGE } = require('./const')
const { translate } = require('.')

const CLI_DEFAULT_TARGET = LANGUAGE.EN

const print = console.log

;(async () => {
  const cli = meow(`
    Usage
      $ fy <text>

    Options
      --target. -t  Target language, values can be:
          ${Object.values(LANGUAGE).join(', ')}
      --help, -h    Help

    Examples
    $ fy 腾讯翻译君 --target en
      Tencent Mr. Translator
  `, {
    flags: {
      target: {
        type: 'string',
        alias: 't',
        default: CLI_DEFAULT_TARGET,
      },
      help: {
        alias: 'h',
      },
    },
  })

  const [ original ] = cli.input

  if (!original) {
    return cli.showHelp()
  }

  print(await translate({ target: cli.flags.target, text: original }))
})()
