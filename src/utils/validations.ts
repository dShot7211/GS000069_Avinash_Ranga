export const PATTERNS = {
  PASSWORD: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,24}$/,
  NEW_PASSWORD: /^(?=.*[0-9])(?=.*[!@#$%^&{}[\]()])[a-zA-Z0-9!@#$%^&{}[\]()]{8,24}$/,
  MPIN: /^(?!(.)\1{3})(?!19|20)\d{6}$/,
  OTP: /^[0-9]{6,6}$/,
  MOBILE: /^[6789]\d{9}$/,
  DTH: /^[0-9]{5,}$/,
  NAME: /^([a-z]|[A-Z]|\s){2,}$/,
  PERSON_NAME: /^[a-zA-Z]+[a-zA-Z\s]*$/,
  FIRST_LAST_NAME: /^[a-zA-Z]+ [a-zA-Z]+$/,
  TEXT_MIN_3: /^[a-zA-Z\s]{3,}$/,
  LENGTH_MIN_10: /^.{10,}$/,
  TEXT: /^[a-zA-Z0-9\s]{1,}$/,
  ALLPHABETS: /^[a-zA-Z\s]{1,}$/,
  BANK_NAME: /^[a-zA-Z\s-]{9,}$/,
  STATE_NAME: /^[a-zA-Z\s-]{3,}$/,
  OPERATOR: /^[a-zA-Z\s-]{3,}$/,
  IFSC: /^[A-Za-z]{4}[0-9a-zA-Z]{7}$/,
  AMT_10_25k: /^([1-9]{1}[0-9]{1}|[1-9]{1}[0-9]{2,3}|[1]{1}[0-9]{1}[0-9]{0,3}|[2]{1}[0-4]{1}[0-9]{0,3}|25000)$/,
  AMT_10_10k: /^([1-9]{1}[0-9]{1}|[1-9]{1}[0-9]{2,3}|10000)$/,
  AMT_02_25k: /^([2-9]{1}|[1-9]{1}[0-9]{1}|[1-9]{1}[0-9]{2,3}|[1]{1}[0-9]{1}[0-9]{0,3}|[2]{1}[0-4]{1}[0-9]{0,3}|25000)$/,
  EMAIL: /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i,
  PAN: /^[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}$/,
  AADHAAR: /^[0-9]{12}$/,
  TEXT_MIN_16: /^[0-9]{16}$/,
  UPI: /^[\w.\-_]{3,}@[a-zA-Z]{3,}$/,
  ALPHA_NUMERICS: /^[A-Za-z0-9]+$/,
  CA_NUMBER: /^[A-Za-z0-9]{6,}$/,
  ACCOUNT_NUMBER: /^(([A-Za-z]|[0-9]){6,18})$/,
  PINCODE: /^[1-9]{1}\d{2}\s?\d{3}$/,
  WEB_URL: /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g,
  NUMBERS_ONLY: /^[0-9]+$/,
  IFRAME_REGX: /^<iframe\s+src="https:\/\/www\.google\.com\/maps\/embed\?pb=[^"]+"[^>]*><\/iframe>$/
};

export const checkLength = (array: any[]): boolean => {
  return array.length > 0;
};
