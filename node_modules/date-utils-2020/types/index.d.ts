/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-12-05 11:35
 */
export interface ILangPackage {
  weeks: string[],
  [key: string]: any
}

export function formatDate(srcDate: any, fmt: string, langPackage?: ILangPackage): string;

export function toDate(date: any): Date | null;

export function isNumberLike(n: any): boolean;

export function toTwoDigits(n: any): string;
