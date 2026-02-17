import { InvalidSettingKeyException } from '../exceptions/invalid-setting-key.exception';
import { SettingKey } from './setting-key';

describe('SettingKey', () => {
  it('should create an instance with a valid setting key (e.g., "DEFAULT_RATE")', () => {
    const setting = new SettingKey('DEFAULT_RATE');
    expect(setting.value).toBe('DEFAULT_RATE');
  });

  it('should create an instance with only uppercase letters', () => {
    const setting = new SettingKey('TIMEOUT');
    expect(setting.value).toBe('TIMEOUT');
  });

  it('should create an instance with uppercase letters and underscores', () => {
    const setting = new SettingKey('RETRY_ATTEMPTS');
    expect(setting.value).toBe('RETRY_ATTEMPTS');
  });

  it('should throw InvalidSettingKeyException if the key contains lowercase letters', () => {
    expect(() => new SettingKey('Default_Rate')).toThrow(
      InvalidSettingKeyException,
    );
  });

  it('should throw InvalidSettingKeyException if the key contains numbers', () => {
    expect(() => new SettingKey('RATE_123')).toThrow(
      InvalidSettingKeyException,
    );
  });

  it('should throw InvalidSettingKeyException if the key contains special characters', () => {
    expect(() => new SettingKey('DEFAULT-RATE')).toThrow(
      InvalidSettingKeyException,
    );
    expect(() => new SettingKey('DEFAULT.RATE')).toThrow(
      InvalidSettingKeyException,
    );
  });

  it('should throw InvalidSettingKeyException if the key is empty', () => {
    expect(() => new SettingKey('')).toThrow(InvalidSettingKeyException);
  });

  it('should throw InvalidSettingKeyException if the key exceeds max length', () => {
    const longKey = 'A'.repeat(51);
    expect(() => new SettingKey(longKey)).toThrow(InvalidSettingKeyException);
  });

  it('should compare two SettingKey instances with equals method', () => {
    const key1 = new SettingKey('DEFAULT_RATE');
    const key2 = new SettingKey('DEFAULT_RATE');
    const key3 = new SettingKey('MAX_RETRY');

    expect(key1.equals(key2)).toBe(true);
    expect(key1.equals(key3)).toBe(false);
  });

  it('should return false when comparing with non-SettingKey instance', () => {
    const setting = new SettingKey('DEFAULT_RATE');
    expect(setting.equals(undefined)).toBe(false);
    expect(setting.equals(null as any)).toBe(false);
  });

  it('should serialize to JSON correctly', () => {
    const setting = new SettingKey('DEFAULT_RATE');
    expect(setting.toJSON()).toBe('DEFAULT_RATE');
  });
});
