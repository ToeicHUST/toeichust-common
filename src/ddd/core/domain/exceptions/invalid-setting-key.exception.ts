import { DomainException } from './domain.exception';

export class InvalidSettingKeyException extends DomainException {
  constructor(value: string) {
    super(
      `Invalid setting key: '${value}'. Key must contain only uppercase letters and underscores.`,
    );
  }
}
