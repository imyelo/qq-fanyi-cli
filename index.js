const got = require('got')
const op = require('object-path')
const { LANGUAGE } = require('./const')

const QQ_TRANSLATE_HOME_URL = 'http://fanyi.qq.com/'
const QQ_TRANSLATE_API_URL = 'http://fanyi.qq.com/api/translate'
const QQ_TRANSLATE_API_ORIGIN = 'http://fanyi.qq.com'

const TRANSLATE_DEFAULT_OPTIONS = {
  source: 'auto',
  target: LANGUAGE.EN,
  text: '',
}

exports.translate = async function translate (options) {
  options = Object.assign({}, TRANSLATE_DEFAULT_OPTIONS, options)

  let { body } = await got(QQ_TRANSLATE_HOME_URL)

  let cookie = (body.match(/\s*document\.cookie.*/g) || []).map((assign) => {
    let matched = assign.match(/document.cookie\s=\s\"(.*?)\"/)
    if (!matched) {
      return
    }
    return matched[1]
  }).filter(Boolean).join('; ')

  let response = await got.post(QQ_TRANSLATE_API_URL, {
    body: {
      source: options.source,
      target: options.target,
      sourceText: options.text,
    },
    json: true,
    headers: {
      origin: QQ_TRANSLATE_API_ORIGIN,
      cookie: cookie,
    },
  })
  let result = op.get(response, 'body.translate.records.0.targetText')

  if (!result) {
    console.error(response)
    throw new Error('Response fault.')
  }

  return result
}
