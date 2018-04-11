# qq-fanyi-cli
> Tencent translator (QQ Fanyi) in command line

The translation data is fetched from [fanyi.qq.com (腾讯翻译君)](http://fanyi.qq.com/).

## Installation
```bash
npm i -g qq-fanyi-cli
```

## Usage
### Basic
```bash
fy 腾讯翻译君
# Tencent Mr. Translator
```

### Piping
```bash
echo "命令行" | fy -t jp
# コマンドライン

curl -s https://pastebin.com/raw/dGS2Nyw7 | fy
# 在地铁车站。
#
# 人群中这些面孔的幻影；
# 潮湿的黑树枝上的花瓣。
#
# -埃兹拉·庞德
```

### Advance
```bash
fy 和剪贴板搭配使用 | pbcopy
# With the clipboard
```

## Options
### target <language>
Example:

```bash
# translate into Japanese
fy --target jp

# is also equivalent to
fy -t jp
```

### help
Example:

```bash
fy --help

# is also equivalent to
fy -h
```

Run ``fy --help`` for more information.

## License
MIT @ [yelo](https://github.com/imyelo)
