import test from 'ava'
import { LANGUAGE } from './const'
import { translate } from '.'

test('translate api should work', async (t) => {
  t.is(await translate({ target: LANGUAGE.EN, text: '腾讯翻译君' }), 'Tencent Mr. Translator')
})
