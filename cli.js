#!/usr/bin/env node
'use strict'

const meow = require('meow')
const chalk = require('chalk')
const getStdin = require('get-stdin')
const { LANGUAGE } = require('./const')
const { translate } = require('.')

const CLI_DEFAULT_TARGET = LANGUAGE.EN

const print = console.log

;(async () => {
  const cli = meow(`
    Usage
      $ fy <text>
      $ echo <text> | fy

    Options
      --target. -t  Target language, values can be:
          ${Object.values(LANGUAGE).join(', ')}
      --help, -h    Help

    Examples
    $ fy 腾讯翻译君 --target en
      Tencent Mr. Translator

    Translation is driven by http://fanyi.qq.com
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

  let original = cli.input.join(' ')

  if (!original && !process.stdin.isTTY) {
    original = await getStdin()
  }

  if (!original) {
    return cli.showHelp()
  }

  print(await translate({ target: cli.flags.target, text: original }))
})()
