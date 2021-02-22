// ==UserScript==
// @name         BDO forum FIX
// @namespace    http://tampermonkey.net/
// @version      0.30
// @description  try to take over the world!
// @author       pKajan
// @updateURL    https://github.com/pkajan/YT-bdo_forum_fix/raw/master/bdo_forum_fix.user.js
// @downloadURL  https://github.com/pkajan/YT-bdo_forum_fix/raw/master/bdo_forum_fix.user.js
// @match        https://www.naeu.playblackdesert.com/*-*/Community?topicType=*
// @match        https://www.naeu.playblackdesert.com/*-*/Community/Detail?topicNo=*&topicType=*
// @match        https://www.naeu.playblackdesert.com/*-*/Community?*&topicType=*
// @exclude      https://www.naeu.playblackdesert.com/*-*/Community?topicNo=*
// @grant        GM_addStyle
// ==/UserScript==

function replaceQueryParam(param, newval, search) {
    var regex = new RegExp("([?;&])" + param + "[^&;]*[;&]?");
    var query = search.replace(regex, "$1").replace(/&$/, '');

    return (query.length > 2 ? query + "&" : "?") + (newval ? param + "=" + newval : '');
}
if(location.href.match(/.*Community\/Detail\?topicNo=.*&topicType=.*/) ||
   location.href.match(/.*Community\/Detail\?.*topicNo=.*topicType=.*/)){
    /* TOPIC TITLE */
    document.title = document.getElementsByClassName("title")[0].innerText;

    console.log("TOPIC TITLE FIXED");
    return 0;
}
if(location.href.match(/.*Community\?.*topicType=.*/)){
    var pagecode = document.getElementsByTagName('html')[0].innerHTML;

    /* TOPIC SORT */
    var pageURL = window.location.protocol + '//' + window.location.host + window.location.pathname;
    pagecode = pagecode.replace("a href=\"javascript:void(0)\" class=\"item js-orderby \" data-orderby=\"12\"","a href=\""+pageURL+ replaceQueryParam('orderBy', 12, window.location.search)+"\" class=\"item js-orderby active\" data-orderby=\"12\"")
    pagecode = pagecode.replace("a href=\"javascript:void(0)\" class=\"item js-orderby \" data-orderby=\"7\"","a href=\""+pageURL+ replaceQueryParam('orderBy', 7, window.location.search)+"\" class=\"item js-orderby active\" data-orderby=\"7\"")
    pagecode = pagecode.replace("a href=\"javascript:void(0)\" class=\"item js-orderby \" data-orderby=\"10\"","a href=\""+pageURL+ replaceQueryParam('orderBy', 10, window.location.search)+"\" class=\"item js-orderby active\" data-orderby=\"10\"")
    pagecode = pagecode.replace("a href=\"javascript:void(0)\" class=\"item js-orderby \" data-orderby=\"11\"","a href=\""+pageURL+ replaceQueryParam('orderBy', 11, window.location.search)+"\" class=\"item js-orderby active\" data-orderby=\"11\"");

    /* TOPIC LIST */
    var res = pagecode.replaceAll("<div onclick=\"location.href='/Community/Detail?topicNo=", "<div class=\"left_a\"><a class=\"customFIXCSS\"style=\"font-size: 15px;\" href=\"/Community/Detail?topicNo=")
    .replaceAll("'\" class=\"left_a\">", "\"> ***LINK*** <\a>");
    res = res.replaceAll("<span class=\"label_best\">BEST</span>", "<span class=\"label_best\">B</span>")
    for (var i = 0; i < document.getElementsByClassName("ctitle").length; i++) {

        console.log(document.getElementsByClassName("ctitle")[i].innerText);
        res = res.replace("***LINK***",document.getElementsByClassName("ctitle")[i].innerText + "&nbsp;");

    }
    var regex = /<span class=\"ctitle\">.*<\/span>/ig;
    res = res.replaceAll(regex, "<span class=\"ctitle\"></span>")
    document.getElementsByTagName('html')[0].innerHTML = res;

    console.log("TOPIC LIST FIXED");

    /* TOPIC TITLE */
    document.title = document.getElementsByClassName("title")[0].innerText;
    console.log("TOPIC TITLE FIXED");
}

document.getElementsByTagName('html')[0].innerHTML = document.getElementsByTagName('html')[0].innerHTML + "<style>a:visited{color:gray}</style>";
