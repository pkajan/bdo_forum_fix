// ==UserScript==
// @name         BDO forum FIX
// @namespace    http://tampermonkey.net/
// @version      0.32
// @description  try to take over the world!
// @author       pKajan
// @updateURL    https://github.com/pkajan/bdo_forum_fix/raw/main/bdo_forum_fix.user.js
// @downloadURL  https://github.com/pkajan/bdo_forum_fix/raw/main/bdo_forum_fix.user.js
// @match        https://*.playblackdesert.com/*-*/Community*
// @grant        GM_addStyle
// ==/UserScript==


document.title = document.getElementsByClassName("title")[0].innerText;
console.log("TOPIC TITLE FIXED");
