import {
  hasCookie,
  getCookies,
  getCookie,
  setCookie,
  deleteCookie,
} from 'cookies-next';
import { useEffect } from 'react';
import axios from 'axios';

const wordCount = (str) => {
  const wordArray = str.split(' ');
  return wordArray.filter((word) => word !== '').length;
};

const getLoggedInUser = () => {
  if (hasCookie('FORUM_LOGIN_DATA')) {
    const cookie = getCookie('FORUM_LOGIN_DATA');
    const userData = JSON.parse(cookie);
    return userData;
  }

  return null;
};

const getSavedTitle = () => {
  const rawContent = JSON.parse(localStorage.getItem('UF_TITLE_INPUT'));
  if (rawContent !== null) {
    return rawContent;
  }
  return null;
};

// const slugify = (str) => {
//   const regex = /(<([^>]+)>)/gi;
//   return str
//     .toLowerCase()
//     .replace(regex, '')
//     .replace(/[^\w\s-]/g, '')
//     .replace(/[\s_-]+/g, '-')
//     .replace(/^-+|-+$/g, '')
//     .replace(/^(&nbsp;|<br>)+/, '')
//     .replace(/^(nbsp)+/, '')
//     .trim();
// };
function stripHtml(text) {
  return text.replace(/^\xa0*([^\xa0])\xa0$/g, '');
}
function replaceNbsps(str) {
  var re = new RegExp(String.fromCharCode(160), 'g');
  return str.replace(re, ' ');
}
const trimContent = (yourString, maxLength) => {
  var trimmedString = yourString.substr(0, maxLength);
  trimmedString = trimmedString.substr(
    0,
    Math.min(trimmedString.length, trimmedString.lastIndexOf(' '))
  );
  return trimmedString;
};

const getUserInfo = async (id) => {
  const response = await axios(`/api/users/${id}`);
  return response.data;
};
module.exports = {
  getSavedTitle,
  wordCount,
  getLoggedInUser,
  trimContent,
  getUserInfo,
  stripHtml,
  replaceNbsps,
};
