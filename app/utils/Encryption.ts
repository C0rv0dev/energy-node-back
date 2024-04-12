import CryptoJs from 'crypto-js';
import config from '../config/config';

export const encrypt = (textToEncrypt: string): string => CryptoJs.AES.encrypt(textToEncrypt, config.encryption_secret).toString();

export const decrypt = (encryptedText: string): string => {
    const bytes = CryptoJs.AES.decrypt(encryptedText, config.encryption_secret);
    const originaltext = bytes && bytes.toString(CryptoJs.enc.Utf8);
    return originaltext;
}
