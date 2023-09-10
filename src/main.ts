import { readFile, readTypeFile, readWinningGame, saveResults } from './FileHelper';
import { LotteryPool } from './LotteryPool';

const typeFile: string = readTypeFile();

const winningGame: number[] = readWinningGame();

readFile(typeFile).then(games => {
  const lotteryPool: LotteryPool = new LotteryPool(games, winningGame);
  
  saveResults(lotteryPool.games);
});



