import { CONSTANTS, LOCAL_STORAGE_SERVICE } from "../../utils";

function capitalizeFirstLetter(string) {
  var val = "";
  if (!isEmpty(string)) {
    val = string.charAt(0).toString().toUpperCase() + string.slice(1);
  }
  return val;
}

function capitalize(string) {
  var val = "";
  if (!isEmpty(string)) {
    val = string.toString().toUpperCase();
  }
  return val;
}

function setFavicon(icon) {
  (function () {
    var link =
      document.querySelector("link[rel*='icon']") ||
      document.createElement("link");
    link.type = "image/png,image/jpg,image/x-icon";
    link.rel = "icon";
    link.href = icon;
    document.getElementsByTagName("head")[0].appendChild(link);
  })();
}

function isNotEmpty(x) {
  return !isEmpty(x);
}

function isEmpty(x) {
  return (
    typeof x === "undefined" ||
    x === null ||
    x === "null" ||
    x === "undefined" ||
    x === false ||
    x.length === 0 ||
    x === ""
  );
}

function ucfirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function checkLocalStorage(key, propVal) {
  let localStorageVal = LOCAL_STORAGE_SERVICE._getFromLocalStorage(key);
  return isEmpty(localStorageVal) ? propVal : localStorageVal;
}

function parseToFloat(value, digit) {
  var digits;
  if (!isEmpty(value)) {
    digits = parseFloat(value).toFixed(parseInt(digit));
  } else {
    digits = "PKR 00";
  }
  return digits;
}

function stringToBoolean(string) {
  switch (string) {
    case "true":
    case "yes":
    case "1":
    case 1:
      return true;
    case "false":
    case "no":
    case "0":
    case 0:
    case null:
      return false;
    default:
      return Boolean(string);
  }
}

function intPadding(number) {
  return (number < 10 ? "0" : "") + number;
}

const parseFloatFixed = (amount, fixed = 2) => {
  if (typeof amount === "number") {
    return amount?.toFixed(fixed) || amount;
  } else {
    return amount;
  }
};

function thousands_separators(num) {
  var num_parts = num.toString().split(".");
  num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return num_parts.join(".");
}

function formatPrice(currency, charges = 0) {
  let _charges = thousands_separators(parseFloatFixed(charges));
  const storageLocale = LOCAL_STORAGE_SERVICE._getFromSessionStorage("locale");
  if (storageLocale === CONSTANTS.IS_ENGLISH) {
    return {
      charges: _charges,
      currency,
      default: `${currency} ${_charges}`,
    };
  } else {
    return {
      charges: _charges,
      currency,
      default: `${_charges} ${currency}`,
    };
  }
}

function showPrice(currency, charges = 0) {
  let _charges = thousands_separators(parseFloatFixed(charges));
  const storageLocale = LOCAL_STORAGE_SERVICE._getFromLocalStorage("locale");
  if (storageLocale === CONSTANTS.IS_ENGLISH) {
    return `${currency} ${_charges}`;
  } else {
    return `${_charges} ${currency}`;
  }
}

function parseQuantity(text, quantity) {
  const storageLocale = LOCAL_STORAGE_SERVICE._getFromLocalStorage("locale");
  if (storageLocale === CONSTANTS.IS_ENGLISH) {
    return text + ": " + quantity;
  } else {
    return quantity + " <span>" + text + "</span>";
  }
}

function wordCount(text) {
  return text.split(" ").length;
}

function getBodyDirection() {
  let bodyEl = document.querySelector("body");
  return bodyEl.getAttribute("dir");
}

function downloadURI(uri, name) {
  var link = document.createElement("a");

  link.download = name;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  // clearDynamicLink(link);
}

function findInJson(object, value) {
  var record = object.filter(function (data) {
    return data.id === value;
  });
  return record[0];
}

function reverseObject(object) {
  let newObj = {};

  Object.keys(object)
    .sort()
    .reverse()
    .forEach((key) => {
      newObj[object[key]] = key;
    });

  return newObj;
}

function redirectToPath(path, reflectPayment = false) {
  if (window.opener !== null) {
    // window.onunload = null;
    window.onbeforeunload = null;
  }
  window.location.href = path;
}

function redirectToPathAndClearLocalStorage(
  path,
  store_redirect_url = path,
  reflectPayment = true
) {
  if (store_redirect_url === null) {
    store_redirect_url = path;
  }

  if (!HELPER.isEmpty(path) && !HELPER.isEmpty(store_redirect_url)) {
    if (window.opener !== null) {
      window.onbeforeunload = null;
      // Send message to bulider website for hosted checkout //
      let msg = { hrf: path, app_type: CONSTANTS.APP_TYPE.CHECKOUT };
      window.opener.postMessage(msg, store_redirect_url);
      window.close();
    } else {
      window.location.href = path;
    }
  }
  LOCAL_STORAGE_SERVICE._clearLocalStorage();
  return true;
}
function titleCase(str) {
  if (!HELPER.isEmpty(str)) {
    return str
      .toLowerCase()
      .split(/([ /!@#$%^&*()-,])/)
      .map(function (word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join("");
  }
}

const makeInteger = (val = 0) => {
  return isNaN(val) ? val.replace(",", "") : val;
};

const HELPER = {
  reverseObject,
  redirectToPath,
  findInJson,
  downloadURI,
  getBodyDirection,
  wordCount,
  showPrice,
  formatPrice,
  parseQuantity,
  stringToBoolean,
  capitalizeFirstLetter,
  capitalize,
  setFavicon,
  checkLocalStorage,
  isEmpty,

  ucfirst,
  parseToFloat,
  intPadding,
  redirectToPathAndClearLocalStorage,
  titleCase,
  isNotEmpty,

  thousands_separators,
  makeInteger,

  parseFloatFixed,
};
export default HELPER;
