import CryptoJS from 'crypto-js';

export class Crypt {
  static async encrypt(data: any, secretKey?: string) {
    const secret = secretKey ?? process.env.SECRET_KEY ?? '0';
    const iv = CryptoJS.lib.WordArray.random(16);
    const cipher = CryptoJS.AES.encrypt(JSON.stringify(data), CryptoJS.enc.Hex.parse(secret), {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    return iv.toString(CryptoJS.enc.Hex) + ':' + cipher.toString();
  }

  static async decrypt(data: string, secretKey?: string) {
    const secret = secretKey ?? process.env.SECRET_KEY ?? '0';
    const parts = data.split(':');
    const iv = CryptoJS.enc.Hex.parse(parts[0]);
    const decrypted = CryptoJS.AES.decrypt(parts[1], CryptoJS.enc.Hex.parse(secret), { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
  }
}
