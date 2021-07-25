/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-12-04 22:10
 */
import { toTwoDigits } from './helper'
import * as Types from '../types/index'

const DEF_LANGUAGE: Types.ILangPackage = {
  // weeks: ['日', '一', '二', '三', '四', '五', '六']
  weeks: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
}

/**
 * format date
 * @param srcDate
 * @param fmt
 * @param langPackage
 * @returns {string}
 */
function formatDate<T>(srcDate: T, fmt: string, langPackage?: Types.ILangPackage): string {
  const date = toDate(srcDate)
  if (!date || !fmt) return srcDate + ''
  // timestamp
  if (fmt === 'timestamp') return date.getTime().toString()
  let $1
  if (/(y+)/i.test(fmt)) {
    $1 = RegExp.$1
    fmt = fmt.replace($1, (date.getFullYear() + '').substr(4 - $1.length))
  }

  if (!langPackage || !Array.isArray(langPackage.weeks)) {
    langPackage = DEF_LANGUAGE
  }

  const obj = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    // week number
    'w+': date.getDay(),
    // week text
    'W+': langPackage.weeks[date.getDay()],
    // am/pm
    'a+': date.getHours() < 12 ? 'am' : 'pm',
    'A+': date.getHours() < 12 ? 'AM' : 'PM'
  }

  for (const key in obj) {
    if (new RegExp('(' + key + ')').test(fmt)) {
      $1 = RegExp.$1
      const str = obj[key] + ''
      fmt = fmt.replace($1, ($1.length === 1) ? str : toTwoDigits(str))
    }
  }
  return fmt
}

/**
 * to date
 * @param input yyyy/MM/dd, yyyy-MM-dd, yyyyMMdd, timestamp
 * @returns {Date}
 */
function toDate<T>(input: T): null | Date {
  if (input instanceof Date) return input
  // fix: In the case of an array with only one element
  // Example: ['2021/01/02'].toString() => '2021/01/02'
  if (typeof input === 'number') {
    return new Date(input)
  } else if (typeof input === 'string') {
    let str = input.trim()
    // string number
    if (/^\d+$/.test(str)) {
      const len = str.length
      // yyyyMMdd
      if (len === 8) {
        return new Date([str.substr(0, 4), str.substr(4, 2), str.substr(6, 2)].join('/'))
      }
      // yyyyMM
      else if (len === 6) {
        return new Date([str.substr(0, 4), str.substr(4, 2), '01'].join('/'))
      }
      // yyyy
      else if (len === 4) {
        return new Date(str + '/01/01')
      }
      // Other cases are handled as timestamp
      else {
        // Note that the results of new Date(0) and new Date('0') are different
        return new Date(parseInt(input))
      }
    } else {
      // replace 年月日
      str = str
        .replace(/[年月日]/g, (match) => {
          return match === '日' ? '' : '/'
        })
        // remove cn/jp week, comment
        // 2020/08/22(星期六) 11:56:21
        // Sat Aug 22 2020 11:56:24 GMT+0900 (Japan Standard Time)
        .replace(/[(（（].*?[)））]/g, ' ')
        .replace(/\bam|pm\b/ig, ' ')
        .replace(/\s+/g, ' ')
      /** yyyy/MM/dd yyyy-MM-dd */
      if (/^(\d{4})[-/](\d{1,2})[-/](\d{1,2})$/.test(str)) {
        return new Date([RegExp.$1, RegExp.$2, RegExp.$3].join('/'))
      }
      /** yyyy/MM yyyy-MM */
      else if (/^(\d{4})[-/](\d{1,2})$/.test(str)) {
        return new Date([RegExp.$1, RegExp.$2, '01'].join('/'))
      } else {
        const date = new Date(str)
        return isNaN(date.getFullYear()) ? null : date
      }
    }
  }
  return null
}

export {
  formatDate,
  toDate
}
