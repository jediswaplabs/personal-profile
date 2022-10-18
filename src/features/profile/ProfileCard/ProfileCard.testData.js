import { defaultAvatar } from '../UserAvatar/UserAvatar.testData';

const defaultUserData = { avatar: defaultAvatar,
  address: '0x000000000000' };

const userDataWithoutAvatar = { ...defaultUserData,
  avatar: '' };

export {
  defaultUserData, userDataWithoutAvatar,
};
