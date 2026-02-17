import { DomainException } from './domain.exception';
import { InvalidSettingKeyException } from './invalid-setting-key.exception';

describe('InvalidSettingKeyException', () => {
  const value = 'invalid-key-123';

  it('should be defined', () => {
    expect(new InvalidSettingKeyException(value)).toBeDefined();
  });

  it('should inherit from DomainException', () => {
    const exception = new InvalidSettingKeyException(value);
    expect(exception).toBeInstanceOf(DomainException);
    expect(exception).toBeInstanceOf(Error);
  });

  it('should format the error message correctly', () => {
    const exception = new InvalidSettingKeyException(value);
    const expectedMessage = `Invalid setting key: '${value}'. Key must contain only uppercase letters and underscores.`;

    expect(exception.message).toBe(expectedMessage);
  });
});
