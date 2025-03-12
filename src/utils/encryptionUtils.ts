import { secretKey } from '../network/apiEndPoints';
// import CryptoJS from 'crypto-js';
import CryptoJS from 'crypto-js';

export const encryptData = (params: any) => {
  if (params) {
    const data = CryptoJS.AES.encrypt(JSON.stringify(params), secretKey).toString();
    return data ? data : false;
  }
  return false;
};

export const decryptData = (param: any) => {
  const dataFromLocal = localStorage.getItem(param);
  if (dataFromLocal) {
    try {
      const decrypted = CryptoJS.AES.decrypt(dataFromLocal, secretKey)?.toString(CryptoJS.enc.Utf8);
      if (decrypted) {
        return JSON.parse(decrypted);
      }
      console.error('Decryption failed. Decrypted value is empty.');
      return false;
    } catch (error: any) {
      console.error('Decryption failed. Error:', error.message);
      return false;
    }
  } else {
    console.error('No encrypted data found in the cookie.');
    return false;
  }
};

export const addToLocalStorage = (key: string, value: any, stringify: boolean = true): void => {
  localStorage.setItem(key, stringify ? JSON.stringify(value) : value);
};

export const getFromLocalStorage = (key: string) => {
  const result = localStorage.getItem(key);
  const user = result ? JSON.parse(result) : null;
  return user;
};

export const clearLocalStorage = () => {
  localStorage.removeItem('param2');
};
