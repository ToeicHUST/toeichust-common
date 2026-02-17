import { InvalidScoreException } from '../exceptions/invalid-score.exception';
import { DomainValueObject } from './domain-value-object';

export class Score extends DomainValueObject<number> {
  private static readonly MIN_VALUE = 10;
  private static readonly MAX_VALUE = 990;
  private static readonly STEP = 5;

  value: number;

  constructor(value: number) {
    Score.validate(value);
    super(value);
    this.value = value;
  }

  private static validate(value: number) {
    const isOutOfRange = value < Score.MIN_VALUE || value > Score.MAX_VALUE;

    const isNotDivisibleByStep = value % Score.STEP !== 0;

    if (isOutOfRange || isNotDivisibleByStep) {
      throw new InvalidScoreException(
        value,
        Score.MIN_VALUE,
        Score.MAX_VALUE,
        Score.STEP,
      );
    }
  }

  equals(score: Score): boolean {
    return this.value === score.value;
  }

  toJSON() {
    return this.value;
  }
}
