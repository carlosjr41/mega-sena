import { existsSync, mkdirSync, writeFileSync } from 'fs';
import readXlsxFile from 'read-excel-file/node';
import { LotteryGame } from './LotteryGame';
import { LotteryPool } from './LotteryPool';
import { readExcelFile, readLotteryPoolName, readWinningGame, saveResults } from './FileHelper';


const lotteryPoolName: string = readLotteryPoolName();

const excelName = lotteryPoolName.toLowerCase() === "ifes" ? "../input/bolaoIfes.xlsx" : "../input/bolaoEtaure.xlsx";
const winningGame: number[] = readWinningGame();

readExcelFile(excelName).then(games => {
  const lotteryPool: LotteryPool = new LotteryPool(games, winningGame);
  
  saveResults(lotteryPool.games, lotteryPoolName);
})



