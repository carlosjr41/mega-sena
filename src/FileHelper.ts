import  { existsSync, mkdirSync, writeFileSync } from "fs";
import fs from "fs/promises"
import readXlsxFile from "read-excel-file/node";
import { LotteryGame } from "./LotteryGame";
import { schema } from "./Schemas";

const prompt = require('prompt-sync')();

export function readTypeFile(): string {
  return prompt("qual o tipo de arquivo? (text ou excel) ");
}

export function readWinningGame(): number[] {
  return convertStringToArrayOfNumbersSorted(prompt("Quais os jogos sorteados? usar padrão (XX - XX - XX - XX - XX - XX) "));
}

export async function readFile(typeFile: string): Promise<number[][]> {
  if (typeFile == "text") {
    return readTextFile("../input/games.txt");
  }

  return readExcelFile("../input/games.xlsx");
}

async function readExcelFile(fileName: string): Promise<number[][]> {
  return readXlsxFile(fileName, { schema })
    .then(({ rows }) => {
      return rows.map((row: any) => convertStringToArrayOfNumbersSorted(row.game));
    })


}

async function readTextFile(fileName: string): Promise<number[][]> {
  const file = await fs.readFile(fileName,  "utf-8");

  return file.split('\n').map(convertStringToArrayOfNumbersSorted);
}

export function saveResults(games: LotteryGame[], fileName: string) {

  const gamesSorted = games.sort((a, b) => b.hits - a.hits).map(game => game.jsonRepresentation());

  if (!existsSync('output')) {
    mkdirSync('output');
  }

  writeFileSync(`output/results.json`, JSON.stringify(gamesSorted, null, 2));
}

function convertStringToArrayOfNumbersSorted(numbers: string): number[] {
  return numbers.split('-').map(number => parseInt(number)).sort((a, b) => a - b);
}
