import { NetWork } from '@/network';
import { RESPONSE_CODE } from '@/network/config';
import { API_URL, API_URL_AUTH } from '@/network/url';
import { getRequestUrl } from '@/network/utils';
import { STORAGE_KEY } from '@/utils/enums';
import { readKey, saveKey } from '@/utils/storage';

const loginWithGoogle = async (params: SignInInterface) => {
  const res = await NetWork.post(
    getRequestUrl(API_URL_AUTH.WEB_AUTH, {
      partial: API_URL.GOOGLE,
    }),
    params,
  );
  return res;
};

const refreshToken = async () => {
  const oldToken = readKey(STORAGE_KEY.REFRESH_TOKEN);
  const params = {
    refreshToken: oldToken || '',
  };
  const res = await NetWork.post(
    getRequestUrl(API_URL_AUTH.AUTH, {
      partial: API_URL_AUTH.REFRESH_TOKEN,
    }),
    params,
  );
  const { token, refreshToken } = res?.data;
  if (res?.status === RESPONSE_CODE.SUCCESS) {
    saveKey(STORAGE_KEY.ACCESS_TOKEN, token);
    saveKey(STORAGE_KEY.REFRESH_TOKEN, refreshToken);
    return res?.data;
  } else {
  }
};

const getUserInfo = async () => {
  return await NetWork.get(
    getRequestUrl(API_URL_AUTH.USER, { partial: API_URL_AUTH.PROFILE }),
  );
};

const syncGoogle = async (params: SignInInterface) => {
  const res = await NetWork.patch(
    getRequestUrl(API_URL_AUTH.WEB_USER, {
      partial: API_URL_AUTH.SYNC_SOCIAL,
      action: API_URL.GOOGLE,
    }),
    params,
  );
  return res;
};

const syncUserInfo = async ({
  sub,
  email,
  email_verified,
  id_token,
}: {
  sub?: string;
  email?: string;
  email_verified?: boolean;
  id_token?: string;
}) => {
  const body = id_token
    ? {
        id_token: id_token,
      }
    : {
        jwtSocialResponse: { sub, email, email_verified },
      };
  const res = await NetWork.patch(
    getRequestUrl(API_URL_AUTH.USER, {
      partial: API_URL_AUTH.SYNC_SOCIAL,
    }),
    body,
  );
  return res;
};

const deleteAccount = async () => {
  return await NetWork.deleteMethod(getRequestUrl(API_URL_AUTH.USER));
};

export const AuthServices = {
  refreshToken,
  loginWithGoogle,
  getUserInfo,
  syncGoogle,
  syncUserInfo,
  deleteAccount,
};
