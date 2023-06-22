import { readExcelFile, readLotteryPoolName, readWinningGame, saveResults } from './FileHelper';
import { LotteryPool } from './LotteryPool';

const lotteryPoolName: string = readLotteryPoolName();

const winningGame: number[] = readWinningGame();

readExcelFile(lotteryPoolName).then(games => {
  const lotteryPool: LotteryPool = new LotteryPool(games, winningGame);
  
  saveResults(lotteryPool.games, lotteryPoolName);
});



