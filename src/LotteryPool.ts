import { LotteryGame } from "./LotteryGame";

export class LotteryPool {
  private _games: LotteryGame[];

  constructor(games: number[][], winnerGame: number[]) {
    this._games = this.buildGames(games, winnerGame);
  }

  get games(): LotteryGame[] {
    return this._games;
  }

  private buildGames(games: number[][], winerGame: number[] = []): LotteryGame[] {
    return games.map(game => new LotteryGame(game, this.countHits(game, winerGame)));
  }

  private countHits(gameToCheck: number[], winnerGame: number[]): number {
    return gameToCheck
      .reduce((hits, games) => hits += winnerGame.includes(games) ? 1 : 0, 0);
  }
}