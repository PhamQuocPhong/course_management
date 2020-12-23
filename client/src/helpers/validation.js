export default {
  required(val, name) {
    // if array
    if(Array.isArray(val)  && val.length <= 0){
      return `${name}は必須です。`;
    }
    return val => !!val || `${name}は必須です。`;
  },
  email(val) {
    return val => /.+@.+\..+/.test(val) || "メールアドレスの形式が正しくありません";
  },

  min(val, name, max) {
    return (
      (val || "") < parseInt(max) || `${name} should be less than max`
    );
  },
  max(val, name,  min) {
    return (val || "") > parseInt(min) || `${name} should be greater than min`;
  },

  fileSize(val, name, size) {
    var converSize = size * 1024000; // convert to MB
    return val =>
      !val ||
      val.size < converSize ||
      `${name} size should be less than ${size} MB!`;
  },

  phoneNumber(val) {
    return val =>
      /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(val) ||
      "Phone number must be valid";
  },

  rangeNumber(val, name, min, max){
    return val => /^[1][1-9]$|^[2][0-0]$/.test(val) || `${name} must be from ${min} to ${max}`
  },

  password(val){
    return val => /^(?=.*\d)[a-zA-Z0-9]{8,}$/.test(val) || "パスワードは最低8桁の英数字のみ入力可能です。";
  }

};
