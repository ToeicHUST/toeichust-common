import { InvalidSettingKeyException } from '../exceptions/invalid-setting-key.exception';
import { DomainValueObject } from './domain-value-object';

export class SettingKey extends DomainValueObject<string> {
  private static readonly PATTERN = /^[A-Z_]+$/;
  // private static readonly MIN_LENGTH = 1;
  // private static readonly MAX_LENGTH = 50;

  public readonly value: string;

  constructor(value: string) {
    SettingKey.validate(value);
    super(value);
    this.value = value;
  }

  private static validate(value: string): void {
    const isInvalidFormat = !this.PATTERN.test(value);

    if (isInvalidFormat) {
      throw new InvalidSettingKeyException(value);
    }
  }

  public equals(vo?: SettingKey): boolean {
    if (!(vo instanceof SettingKey)) return false;
    return this.value === vo.value;
  }

  public toJSON(): string {
    return this.value;
  }
}
