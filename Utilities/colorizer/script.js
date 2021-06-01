// ==UserScript==
// @name         Color Fixes
// @namespace    NyaggerSquad
// @icon         https://i.imgur.com/XYlUBpb.png
// @version      1.41
// @description  Nail colors and skin tones for certain characters (Now with less retardation)
// @author       anon
// @include      https://mahjongsoul.game.yo-star.com/
// @include      https://game.mahjongsoul.com/
// @include      https://majsoul.union-game.com/0/
// ==/UserScript==


(function() {
    'use strict';

    const SKIN_COLOR = 1;
    const NAIL_COLOR = 2;
    //name is only for user identification, it doesn't affect anything, only order does.
    //"" is default color, format is "r,g,b" in 0-255
    var skinMap = [        //[skin tone],     [nail color]   (normal, bond, beach (or others)) //just a single color will set all outfits to that color
        ["default",           [""],            [""] ],
        ["ichihime",          [""],            ["185,23,43", "185,23,43", "238,128,164", "185,23,43"] ],  //normal, bond, summer, new year
        ["nikaidou miki",     [""],            ["", "", "28,27,30"], "", "", "" ],  //normal, bond, halloween, blank, blank, spring celebration
        ["fujita kana",       [""],            [""] ],  //normal, bond, christmas
        ["mikami chiori",     [""],            [""] ],  //normal, bond, christmas
        ["aihara mai",        [""],            ["", "", "99,209,234"] ],  //normal, bond, summer
        ["nadeshiko",         [""],            ["76,110,206"] ],  //normal, bond, summer
        ["yagi yui",          [""],            ["252,201,207"] ],  //normal, bond, christmas
        ["kujou riu",         [""],            [""] ],  //normal, bond, summer
        ["xenia",             [""],            ["192,31,27",""] ],  //normal, bond, halloween, summer
        ["kaavi",             [""],            ["255,237,221"] ],  //normal, bond
        ["shinomiya natsuki", [""],            [""] ],  //normal, bond, halloween (different name)
        ["wanjirou",          [""],            [""] ],  //a fucking dog
        ["ichinose sora",     [""],            [""] ],  //normal, bond, christmas
        ["akechi hideki",     [""],            [""] ],  //normal, bond
        ["keikumusume",       [""],            ["","","76,144,245"] ],  //normal, bond, summer
        ["sara",              ["217,165,142"], ["253,254,234"] ],  //normal, bond, new year
        ["ninomiya hana",     [""],            [""] ],  //normal, bond, blank, blank, blank, spring celebration
        ["shiraishi nana",    [""],            [""] ],  //normal, bond
        ["takanashi hinata",  [""],            [""] ],  //normal, bond
        ["igarashi haruna",   [""],            ["248,198,180"] ], //normal, bond, summer
        ["suzumiya anju",     [""],            ["122,117,199", ""] ], //normal, bond
        ["joseph",            ["234,182,234"], [""] ],  //normal, bond
        ["saitou osamu",      [""],            [""] ],  //normal, bond
        ["kitami sawako",     [""],            ["251,191,181", "184,206,227"] ],  //normal, bond
        ["ein",               [""],            [""] ],  //normal, bond
        ["hina momo",         [""],            [""] ],  //normal, bond
        ["tsukimi zan",       [""],            [""] ],  //normal, bond
        ["fujimoto kirara",   ["226,177,165"], [""] ],  //normal, bond
        ["kaguyahime",        [""],            [""] ],  //normal, bond
        ["kisaragi ren",      [""],            [""] ],  //normal, bond
        ["ishihara usumi",    [""],            [""] ],  //normal, bond
    ];

    //never ever
    //hana 6 - red gloves
    //riu 1 - black fingerless
    //riu 2 - white gloves
    //kaavi 1 - black fingerless
    //kaavi 2 - overhand arm sleeve
    //hideki 2 - white gloves
    //natsuki 2 - white gloves
    //natsuki 3 - black gloves
    //xenia 3 - long black gloves

    function setMaterialColor(rgb,player,id){
        if (rgb.length != 3)
            return;

        var r = rgb[0], g = rgb[1], b = rgb[2];
        r = parseInt(r) / 255.0;
        g = parseInt(g) / 255.0;
        b = parseInt(b) / 255.0;

        //hand_man, hand_dog, hand_cat
        let hand = null;
        if (player.hand_type == "hand_human") hand = player.hand3d.getChildByName("hand_human");
        else if (player.hand_type == "hand_man") hand = player.hand3D.getChildByName("MAN_Hand7_skin");

        if (hand)
            hand.getChildByName("hand")._render._materials[id].setColor(caps.Cartoon.COLOR, new Laya.Vector4(r, g, b, 1));
    }

    function paintCharacterNails(){
        var dt = view.DesktopMgr.Inst;
        for (var i in dt.players){
            if (dt.players[i].seat == -1)
                continue;
            var char = view.DesktopMgr.Inst.player_datas[dt.players[i].seat].avatar_id - 400000;
            var char_id = parseInt(char/100);
            var color_id = char%100-1;
            if (skinMap[char_id]){
                var skinColor = skinMap[char_id][SKIN_COLOR][color_id] || skinMap[char_id][SKIN_COLOR][0];
                var nailColor = skinMap[char_id][NAIL_COLOR][color_id] || skinMap[char_id][NAIL_COLOR][0];
                if (skinColor) setMaterialColor(skinColor.split(','),dt.players[i],0);
                if (nailColor) setMaterialColor(nailColor.split(','),dt.players[i],1);
            }
        }
    }

    var DesktopCheck = setInterval(function(){
        if (GameMgr.prototype.EnterMJ){
            GameMgr.prototype.EnterMJ = (function() {
                var cacheF = GameMgr.prototype.EnterMJ;
                return function(){
                    var result = cacheF.apply(this, arguments);
                    try{
                        paintCharacterNails();
                    } catch (e){console.log(e);}
                    return result;
                };
            })();
            clearInterval(DesktopCheck);
        }
    },2000);
})();