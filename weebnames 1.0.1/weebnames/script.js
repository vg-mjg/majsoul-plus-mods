// ==UserScript==
// @name         Weeb Names
// @namespace    NyaggerSquad
// @icon         https://mahjongsoul.game.yo-star.com/icon_en.png
// @version      0.9
// @description  For all your weeaboo needs, change WEEB_LEVEL in script if you feel like it
// @author       anon
// @require      https://openuserjs.org/src/libs/sizzle/GM_config.js
// @include      https://mahjongsoul.game.yo-star.com/
// @include      https://game.mahjongsoul.com/
// @include      https://majsoul.union-game.com/0/
// ==/UserScript==

(function() {
    'use strict';

    var HIGH = 0;
    var LOW = 1;

    var WEEB_LEVEL = LOW;

    var map = [
        ["Menzenchin Tsumohou", "Menzen Tsumo"], //or just Tsumo
        "Riichi",
        "Chankan",
        "Rinshan Kaihou",
        "Haitei Raoyue",
        "Houtei Raoyui",
        "Haku",
        "Hatsu",
        "Chun",
        ["Jikaze", "Seat Wind"],
        ["Bakaze", "Prevalent Wind"],
        ["Tanyaochuu", "Tanyao"],
        "Iipeikou",
        "Pinfu",
        ["Honchantaiyaochuu", "Chanta"],
        ["Ikkitsuukan", "Ittsuu"], //or Ittsu
        "Sanshoku Doujun",
        "Double Riichi",
        "Sanshoku Doukou",
        "Sankantsu",
        ["Toitoihou", "Toitoi"],
        "Sanankou",
        "Shousangen",
        "Honroutou",
        ["Chiitoitsu", "Chiitoi"],
        ["Junchan Taiyao", "Junchan"],
        "Honitsu",
        "Ryanpeikou",
        "Chinitsu",
        "Ippatsu",
        "Dora",
        "Akadora",
        "Uradora",
        "Replacement Dora",
        "Tenhou",
        "Chiihou",
        "Daisangen",
        "Suuankou",
        "Tsuuiisou",
        "Ryuuiisou",
        "Chinroutou",
        "Kokushi Musou",
        "Shousuushii",
        "Suukantsu",
        "Chuuren Poutou",
        "Paarenchan",
        "Junsei Chuuren Poutou",
        "Suuankou Tanki",
        "Kokushi Musou Juusan Menmachi",
        "Daisuushii",
        "Tsubame-gaeshi",
        "Kanburi",
        "Shiiaruraotai",
        "Uumensai",
        "Sanrenkou",
        "Iishoku Sanjun",
        "Iipinmoyue",
        "Chuupinraoyui",
        "Renhou",
        "Daisharin",
        "Daichikurin",
        "Daisuurin",
        "Ishinouenimosannen",
        "Daichisei"
    ];

    var LobbyCheck = setInterval(function(){
        if (GameMgr.prototype.EnterLobby){
            GameMgr.prototype.EnterLobby = (function() {
                var cacheF = GameMgr.prototype.EnterLobby;
                return function(){
                    cfg.fan.fan.forEach(function(i){
                        var n = map[i.id-1];
                        if (Array.isArray(n))
                            n = n[WEEB_LEVEL];
                        i.name_en = n;
                    });
                    var result = cacheF.apply(this, arguments);
                    return result;
                };
            })();
            clearInterval(LobbyCheck);
        }
    },2000);
})();