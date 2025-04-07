/* eslint-disable @typescript-eslint/no-explicit-any */
interface AppState {
  saveMeals: any[];
}

interface SignInInterface {
  accessToken: string;
}

interface UserInfo {
  id: string;
  platform: string;
  deviceId: string;
  amount: number;
  vipPackage: any;
  username: string;
  email: string;
  needUpdateInfo: boolean;
  appleId: string;
  googleId: string;
  appleEmail: string;
  googleEmail: string;
}

interface StorageSessionType {
  refContactUs: ActionSheetRef | null;
  isTurnOffShowPayWall: boolean;
  disableShowPayWall: boolean;
  isNewSession: boolean;
  isGoToAllFolder: boolean;
}
interface SettingsCardItem {
  id: number;
  title: string;
  section: (typeof SETTING_SECTION)[keyof typeof SETTING_SECTION];
  dangerAction?: boolean;
  haveRightContent?: boolean;
  haveDivider?: boolean;
  code: (typeof CODE_SETTINGS)[keyof typeof CODE_SETTINGS];
  firstItem?: boolean;
}
