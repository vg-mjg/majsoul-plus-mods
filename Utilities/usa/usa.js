// ==UserScript==
// @name         America! Fuck yeah!
// @namespace    NyaggerSquad
// @icon         https://i.imgur.com/8rD6fPE.png
// @version      1.0
// @description  Super secret complex script very hush-hush
// @author       anon
// @include      https://mahjongsoul.game.yo-star.com/
// @include      https://game.mahjongsoul.com/
// @include      https://game.maj-soul.com/1/
// ==/UserScript==


(function() {
    'use strict'

    var LobbyCheck = setInterval(function(){
        if (GameMgr.prototype.EnterLobby){
            GameMgr.prototype.EnterLobby = (function() {
                var cacheF = GameMgr.prototype.EnterLobby;
                return function(){
                    GameMgr.country = "US";
                    var result = cacheF.apply(this, arguments);
                    return result;
                };
            })();
            clearInterval(LobbyCheck);
        }
    },2000);
})();