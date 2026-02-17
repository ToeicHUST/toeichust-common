import { DefaultSettingUpdatedEvent } from './default-setting-updated.event';

describe('DefaultSettingUpdatedEvent', () => {
  it('should be defined', () => {
    expect(new DefaultSettingUpdatedEvent()).toBeDefined();
  });
});
