import { UserSettingUpdatedEvent } from './user-setting-updated.event';

describe('UserSettingUpdatedEvent', () => {
  it('should be defined', () => {
    expect(new UserSettingUpdatedEvent()).toBeDefined();
  });
});
