import CryptoJS from 'crypto-js';

export default {
  //随机生成指定数量的16进制key
  generatekey(num) {
    let library = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let key = "";
    for (var i = 0; i < num; i++) {
      let randomPoz = Math.floor(Math.random() * library.length);
      key += library.substring(randomPoz, randomPoz + 1);
    }
    return key;
  },

  //加密
  encrypt(word, keyStr) {
    keyStr = keyStr ? keyStr : 'abcdsxyzhkj12345'; //判断是否存在ksy，不存在就用定义好的key
    var key = CryptoJS.enc.Utf8.parse(keyStr);
    var srcs = CryptoJS.enc.Utf8.parse(word);
    var encrypted = CryptoJS.AES.encrypt(srcs, key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });
    return encrypted.toString();
  },


}
//解密
export function decrypt(word, keyStr) {
  var key = CryptoJS.enc.Utf8.parse(keyStr);
  var decrypt = CryptoJS.AES.decrypt(word, keyStr, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });
  console.log(word)
  console.log(keyStr)
  console.log(CryptoJS.enc.Utf8.stringify(decrypt).toString())
  return CryptoJS.enc.Utf8.stringify(decrypt).toString();
}
