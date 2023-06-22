import { LotteryGame } from "./LotteryGame";

export class LotteryPool {
  private _games: LotteryGame[];

  constructor(games: number[][], winningGame: number[]) {
    this._games = this.buildGames(games, winningGame);
  }

  get games(): LotteryGame[] {
    return this._games;
  }

  private buildGames(games: number[][], winningGame: number[] = []): LotteryGame[] {

    return games.map(game => {
      return { 
        numbers: game, 
        hits: this.countHits(game, winningGame) 
      }
    });

  }

  private countHits(gameToCheck: number[], winningGame: number[]): number {
    return gameToCheck
      .reduce((hits, games) => hits += winningGame.includes(games) ? 1 : 0, 0);
  }
}