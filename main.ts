import { readExcelFile, readLotteryPoolName, readWinningGame, saveResults } from './FileHelper';
import { LotteryPool } from './LotteryPool';

const lotteryPoolName: string = readLotteryPoolName();

const excelName = lotteryPoolName.toLowerCase() === "ifes" ? "../input/bolaoIfes.xlsx" : "../input/bolaoEtaure.xlsx";
const winningGame: number[] = readWinningGame();

readExcelFile(excelName).then(games => {
  const lotteryPool: LotteryPool = new LotteryPool(games, winningGame);
  
  saveResults(lotteryPool.games, lotteryPoolName);
});



