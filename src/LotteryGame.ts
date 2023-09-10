export class LotteryGame {
  private _numbers: number[];
  private _hits: number;

  constructor(numbers: number[], hits: number) {
    this._hits = hits;
    this._numbers = numbers;
  }

  get numbers() {
    return this._numbers;
  }

  get hits() {
    return this._hits;
  }

  jsonRepresentation(): any {
    return {
      dezenas: this._numbers.map(this.formatNumber).join(" - "),
      acertos: this._hits
    };
  }

  private formatNumber(number: number): string {
    return number.toLocaleString("pt-BR", {
      minimumIntegerDigits: 2
    });
  }
}