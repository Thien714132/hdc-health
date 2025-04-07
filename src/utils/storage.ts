import Cookies from 'js-cookie';
import { STORAGE_KEY } from './enums';

export const saveToken = (token: string) => {
  Cookies.set(STORAGE_KEY.ACCESS_TOKEN, token, { expires: 7, path: '/' }); // Expires in 7 days
};

export const deleteToken = () => {
  Cookies.remove(STORAGE_KEY.ACCESS_TOKEN);
};

export const readKey = (key: string) => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(key);
};

export const saveKey = (key: string, value: string) => {
  if (typeof window === 'undefined') return;
  console.log('set key', key, 'value', value);
  localStorage.setItem(key, value);
};

export const deleteKey = (key: string) => {
  if (typeof window === 'undefined') return;
  console.log('delete key', key);
  localStorage.removeItem(key);
};
