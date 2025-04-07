import { APPLICATION_ACTION_TYPE } from './action';
import { Action } from './appContext';

export const reducer = (prevState: AppState, action: Action) => {
  switch (action.type) {
    case APPLICATION_ACTION_TYPE.LOAD_STATE:
      return {
        ...prevState,
        ...action.payload,
      };

    case APPLICATION_ACTION_TYPE.UPDATE_USER_INFO:
      return {
        ...prevState,
        userInfo: action.payload,
      };
    case APPLICATION_ACTION_TYPE.CLEAR_ALL:
      return {
        ...prevState,
        userInfo: null,
        accessToken: null,
        refreshToken: null,
      };

    case APPLICATION_ACTION_TYPE.SET_CURRENT_FOLDER:
      return {
        ...prevState,
        currentFolder: action.payload,
      };

    case APPLICATION_ACTION_TYPE.SET_LOG_IN:
      return {
        ...prevState,
        isLogin: action.payload,
      };

    default:
      return prevState;
  }
};
