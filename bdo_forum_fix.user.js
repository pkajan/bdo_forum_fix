// ==UserScript==
// @name         BDO forum FIX
// @namespace    http://tampermonkey.net/
// @version      0.26
// @description  try to take over the world!
// @author       pKajan
// @updateURL    https://github.com/pkajan/YT-bdo_forum_fix/raw/master/bdo_forum_fix.user.js
// @downloadURL  https://github.com/pkajan/YT-bdo_forum_fix/raw/master/bdo_forum_fix.user.js
// @match        https://www.naeu.playblackdesert.com/*-*/Community?topicType=*
// @match        https://www.naeu.playblackdesert.com/*-*/Community/Detail?topicNo=*&topicType=*
// @grant        GM_addStyle
// ==/UserScript==

if(location.href.match(/https:\/\/www\.naeu\.playblackdesert\.com\/.*-.*\/Community\/Detail\?topicNo=.*&topicType=.*/)){
    /* TOPIC TITLE */
    document.title = document.getElementsByClassName("title")[0].innerText;

    console.log("TOPIC TITLE FIXED");
}
if(location.href.match(/https:\/\/www\.naeu\.playblackdesert\.com\/.*-.*\/Community\?topicType=.*/)){
    /* TOPIC LIST */
    var pagecode = document.getElementsByTagName('html')[0].innerHTML;
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
