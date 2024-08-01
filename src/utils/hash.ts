import CryptoJS from 'crypto-js';

export const generateHash = (ts: string, privateKey: string, publicKey: string): string => {
    return CryptoJS.MD5(ts + privateKey + publicKey).toString(CryptoJS.enc.Hex);
};