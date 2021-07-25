# date-utils-2020

date utils 2020, format(s: any, formatter: string)/toDate(s?: any)...

> Note:

> When the parameter `s` is a string: when it is a string of `yyyyMMdd`/`yyyyMM`/`yyyy`, it is processed as `yyyyMMdd`/`yyyyMM01`/`yyyy0101`, and other string numbers are processed as a `timestamp`.

<p align="left">
  <a href="https://npmcharts.com/compare/date-utils-2020?minimal=true"><img src="https://img.shields.io/npm/dm/date-utils-2020.svg?sanitize=true" alt="Downloads"></a>
  <a href="https://www.npmjs.com/package/date-utils-2020"><img src="https://img.shields.io/npm/v/date-utils-2020.svg?sanitize=true" alt="Version"></a>
  <a href="https://www.npmjs.com/package/date-utils-2020"><img src="https://img.shields.io/npm/l/date-utils-2020.svg?sanitize=true" alt="License"></a>
</p>

```shell script
npm i -S date-utils-2020
# or
yarn add date-utils-2020
```

## Usage

```javascript
import { formatDate, toDate } from 'date-utils-2020'

const date = toDate('2020-12-04')
console.log(date) 
// Fri Dec 04 2020 09:00:00 GMT+0900 (Japan Standard Time)

const result = formatDate('2020-12-04', 'yyyy/MM/dd W')
console.log(result)
// 2020/12/04 Fri
```

```javascript
// node.js
const { formatDate } = require('date-utils-2020')

const result = formatDate(new Date(), 'yyyy/MM/dd hh:mm:ss')
console.log(result)
// 2020/12/05 16:07:43

// timestamp
console.log(formatDate(20210101, 'yyyy-MM-dd hh:mm:ss'))
// 1970-01-01 14:36:50

// yyyyMMdd
console.log(formatDate('20210101', 'yyyy-MM-dd hh:mm:ss'))
// 2021-01-01 00:00:00
```

```javascript
import { formatDate } from 'date-utils-2020'
constole.log(formatDate(new Date(), 'yyyy/MM/dd hh:mm:ss'))
```

## Methods

|Method|Parameters|Description|
|:--|:--|:--|
|formatDate|(date: any, format: string, langPackage?: ILangPackage)|return `string`|
|toDate|(s: any)|return `Date` or `null`. When the parameter `s` is a string: when it is a string of `yyyyMMdd`/`yyyyMM`/`yyyy`, it is processed as `yyyyMMdd`/`yyyyMM01`/`yyyy0101`, and other string numbers are processed as a `timestamp`.|

#### format

Date Formats, Example `yyyy-MM-dd hh:mm:ss W` => `2021-01-01 01:01:01 Fri`

|format|meaning|Example|
|:--|:--|:--|
|yyyy/yy|year|`2021`/`21`|
|MM/M|month|`01`/`1`|
|dd/d|day|`01`/`1`|
|hh/h|hour|`01`/`1`|
|mm/m|minute|`01`/`1`|
|ss/s|second|`01`/`1`|
|w|week|`[0, 1, 2, 3, 4, 5, 6]`|
|W|week|`['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']`|
|a|am/pm|`am`|
|A|AM/PM|`AM`|

#### langPackage

|Props|Type|Description|
|:--|:--|:--|
|weeks|`string[]`|Example: `['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日']`, Default: `['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']`|

```javascript
const langPackage = {
  // ['日', '一', '二', '三', '四', '五', '六']
  weeks: ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日']
}

formatDate(new Date(), 'yyyy/MM/dd(W) hh:mm:ss', langPackage)
// 2020/12/05(土曜日) 12:22:52
```
