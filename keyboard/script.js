// v1
// get keycodes here: https://keycode.info/

// planned:
// selector for multi-wait chi calls
// hotkeys for auto buttons (on left)
// hotkey for end of round Confirm(3) button

// maybe:
// tsumogiri + cancel on same button? might be conflicts such as tenpai state
// correctly switch selected tile after calling if tile moved

var waitkbmod = setInterval(() => {
    try {
        uiscript.UI_DesktopInfo.Inst.block_emo
        view.ViewPlayer_Me.Inst.hand

        window.onkeydown = function(e) {
            // should enable spamming while key is held down (might be system/browser dependant)
            var key = e.keyCode ? e.keyCode : e.which;
            switch (key) {
                case 37: // left
                    // move 1 tile left
                    move_left();
                    break;
                case 39: //right
                    // move 1 tile right
                    move_right();
                    break;
            }
        }
        window.onkeyup = function(e) {
            var key = e.keyCode ? e.keyCode : e.which;
            switch (key) {

                // tile ops
				
                case 13: //enter
                    //discard selected tile
                    view.ViewPlayer_Me.Inst.can_discard && view.ViewPlayer_Me.Inst._choose_pai.valid && (view.ViewPlayer_Me.Inst.DoDiscardTile(),
                        view.ViewPlayer_Me.Inst.resetMouseState())
                    break;
                case 84: // t
                    // quick tsumogiri
                    view.ViewPlayer_Me.Inst._choose_pai = view.ViewPlayer_Me.Inst.hand[view.ViewPlayer_Me.Inst.hand.length - 1];
                    view.ViewPlayer_Me.Inst.can_discard && view.ViewPlayer_Me.Inst._choose_pai.valid && (view.ViewPlayer_Me.Inst.DoDiscardTile(),
                        view.ViewPlayer_Me.Inst.resetMouseState())
                    break;

                    // call ops

                case 83: // s
                    // skip
                    callOperation('btn_cancel')
                    break;
                case 80: // p
                    // pon
                    callOperation('btn_peng')
                    break;
                case 67: // c
                    // chi
                    callOperation('btn_chi')
                    // if there are multiple, check this._data.chi.length > 1, see i.prototype.onBtn_Chi
                    break;
                case 75: // k
                    // kan
                    callOperation('btn_gang')
                    break;
                case 87: // w
                    // ron/tsumo
                    callOperation('btn_hu')
                    callOperation('btn_zimo')
                    break;
                case 82: // r
                    // riichi
                    callOperation('btn_lizhi')
                    break;
                case 78: // n
                    // pei
                    callOperation('btn_babei')
                    break;
                case 188: // ,
                    // 9 terminal/honor redraw
                    callOperation('btn_jiuzhongjiupai')
                    break;

                    // emojis

                case 103: // NUM 7
                    sendEmoji(0)
                    break;
                case 104: // NUM 8
                    sendEmoji(1)
                    break;
                case 105: // NUM 9
                    sendEmoji(2)
                    break;
                case 100: // NUM 4
                    sendEmoji(3)
                    break;
                case 101: // NUM 5
                    sendEmoji(4)
                    break;
                case 102: // NUM 6
                    sendEmoji(5)
                    break;
                case 97: // NUM 1
                    sendEmoji(6)
                    break;
                case 98: // NUM 2
                    sendEmoji(7)
                    break;
                case 99: // NUM 3
                    sendEmoji(8)
                    break;
                case 96: // NUM 0
                    sendEmoji(9)
                    break;
                case 110: // NUM .
                    sendEmoji(10)
                    break;
                case 107: // NUM +
                    sendEmoji(11)
                    break;
            }
        }

        function sendEmoji(index) {
            var validc = 0;
            if (!uiscript.UI_DesktopInfo.Inst.block_emo.allgray)
                uiscript.UI_DesktopInfo.Inst.block_emo.scrollview._container_items._childs.some((e, i) => {
                    if (e.getChildByName('btn')._clickHandler) {
                        if (validc == index) {
                            uiscript.UI_DesktopInfo.Inst.block_emo.muted = true;
                            uiscript.UI_DesktopInfo.Inst.block_emo.scrollview._container_items._childs[i].getChildByName('btn')._clickHandler.method()
                            return true;
                        }
                        validc++;
                    }
                });
        }
        uiscript.UI_DesktopInfo.Inst.block_emo.__proto__.switchShow = (function() {
            var cacheF = uiscript.UI_DesktopInfo.Inst.block_emo.__proto__.switchShow;
            return function() {
                if (this.muted)
                    this.muted = false;
                else
                    return cacheF.apply(this, arguments);
            };
        })();

        var selectedTile = 0;

        function selectTile(index) {
            var n = 0,
                a = 0;
            Laya.Browser.width / 1920 < Laya.Browser.height / 1080 ? a = (Laya.Browser.height - Laya.Browser.width / 1920 * 1080) / 2 : n = (Laya.Browser.width - Laya.Browser.height / 1080 * 1920) / 2;
            Laya.MouseManager.instance.mouseX = ((index * view.ViewPlayer_Me.Inst.handwidth + view.ViewPlayer_Me.Inst.handorigin_x) - view.ViewPlayer_Me.Inst.screen_left) / (view.ViewPlayer_Me.Inst.screen_right - view.ViewPlayer_Me.Inst.screen_left) * (Laya.Browser.width - 2 * n);
            Laya.MouseManager.instance.mouseY = (-view.ViewPlayer_Me.Inst.screen_top) / (view.ViewPlayer_Me.Inst.screen_bottom - view.ViewPlayer_Me.Inst.screen_top) * (Laya.Browser.height - 2 * a)
        }

        function move_left() {
            selectedTile = (selectedTile + view.ViewPlayer_Me.Inst.hand.length - 1) % view.ViewPlayer_Me.Inst.hand.length;
            while (!view.ViewPlayer_Me.Inst.hand[selectedTile].valid) {
                selectedTile = (selectedTile + view.ViewPlayer_Me.Inst.hand.length - 1) % view.ViewPlayer_Me.Inst.hand.length;
            }
            selectTile(selectedTile);
        }

        function move_right() {
            selectedTile = (selectedTile + 1) % view.ViewPlayer_Me.Inst.hand.length;
            while (!view.ViewPlayer_Me.Inst.hand[selectedTile].valid) {
                selectedTile = (selectedTile + 1) % view.ViewPlayer_Me.Inst.hand.length;
            }
            selectTile(selectedTile);
        }

        function callOperation(opname) {
            this.GameMgr.Inst._pre_mouse_point = new Laya.Point(1, 1);
            if (uiscript.UI_LiQiZiMo.Inst.enable && uiscript.UI_LiQiZiMo.Inst._oplist.includes(opname)) {
                uiscript.UI_LiQiZiMo.Inst.onClickOpBtn(opname)
            } else if (uiscript.UI_ChiPengHu.Inst.enable && uiscript.UI_ChiPengHu.Inst._oplist.includes(opname)) {
                uiscript.UI_ChiPengHu.Inst.onClickOpBtn(opname)
            }
        }
        clearInterval(waitkbmod);
    } catch (TypeError) {}
}, 1000);