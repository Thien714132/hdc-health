import { STORAGE_KEY } from '@/utils/enums';
import { isNullOrEmpty } from '@/utils/method';
import { readKey } from '@/utils/storage';

export const initialState: AppState = {
  loadingState: false,
  userInfo: {
    id: '',
    platform: '',
    deviceId: '',
    amount: 0,
    vipPackage: undefined,
    username: '',
    email: '',
    needUpdateInfo: false,
    appleId: '',
    googleId: '',
    appleEmail: '',
    googleEmail: '',
  },
  currentFolder: '',
  isLogin: !isNullOrEmpty(readKey(STORAGE_KEY.ACCESS_TOKEN)),
};
