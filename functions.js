import {
  hasCookie,
  getCookies,
  getCookie,
  setCookie,
  deleteCookie,
} from 'cookies-next';

const wordCount = (str) => {
  const wordArray = str.split(' ');
  return wordArray.filter((word) => word !== '').length;
};

const getLoggedInUser = () => {
      if (hasCookie('FORUM_LOGIN_DATA')) {
        const cookie = getCookie('FORUM_LOGIN_DATA');
        const userData = JSON.parse(cookie);
       return userData
      }

      return null
}





module.exports = {
  wordCount,
  getLoggedInUser,
};
