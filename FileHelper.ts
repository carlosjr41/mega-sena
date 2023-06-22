import { existsSync, mkdirSync, writeFileSync } from "fs";
import { LotteryGame } from "./LotteryGame";
import { Row, readXlsxFile } from "read-excel-file";

const prompt = require('prompt-sync')();

export function readLotteryPoolName(): string {
  return prompt("qual o bolão? ");
}

export function readWinningGame(): number[] {
  return convertStringToArrayOfNumbersSorted(prompt("Quais os jogos sorteados? usar padrão (XX - XX - XX - XX - XX - XX) "));
}

export async function readExcelFile(fileName: any): Promise<number[][]> {

  const rows = await readXlsxFile(fileName);

  return rows.map((row: Row) => convertStringToArrayOfNumbersSorted(row[0].toString()));

}

export function saveResults(games: LotteryGame[], fileName: string) {
  if (!existsSync('output')) {
    mkdirSync('output');
  }

  writeFileSync(`output/resultado${fileName}.json`, JSON.stringify(games, null, 2));
}

export function convertStringToArrayOfNumbersSorted(numbers: string): number[] {
  return numbers.split('-').map(number => parseInt(number)).sort((a, b) => a - b);
}
