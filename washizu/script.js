// 修改一姬语音台词以及人物简介
requestAnimationFrame(function autoRun() {
  try {
    const arrBackup = cfg.voice.sound.groups_
    if (!arrBackup || arrBackup.length === 0) {
      throw new Error();
    }
    console.log('Hacked语音文本');
    Object.entries(cfg.voice.sound.groups_).forEach(([soundID, soundGroup]) => {
      if (soundID == 2) {
        const changeMap = {
          "获得语音": {
            "words": 'notyet',
          },
          "登录语音普通": {
            "words": 'Come on, boy. Start taking the offensive if you want to survive. If you cannot do so out of fear, then just sit back and die.'
          },
          "登录语音满羁绊": {
            "words": 'Come on, boy. Start taking the offensive if you want to survive. If you cannot do so out of fear, then just sit back and die.'
          },
          "大厅交互语音1": {
            "words": 'Fear begins with awareness. People start shaking the moment theya re aware of something. Knowing the cause of that shaking and watching them is... extremely amusing'
          },
          "大厅交互语音2": {
            "words": 'Thats all there is to Mahjong. That 1 Pin just might pass. Right, Akagi?'
          },
          "大厅交互语音3": {
            "words": 'To even maintain a 1% chance of survival, you must be a genius. But not just any genius. You must have the instinct that transcends human comprehension'
          },
          "大厅交互语音4": {
            "words": 'Hehehe ... This was only natural'
          },
          "大厅交互语音5": {
            "words": 'Hehehehe... Now... Lets begin the Washizu Mahjong'
          },
          "大厅交互语音6": {
            "words": 'The money! My 500 million!'
          },
          "大厅交互语音7": {
            "words": 'Now do you understand what Washizu Mahjong is all about?'
          },
          "大厅交互语音8": {
            "words": 'Even with instinct, courage, and the best game you can play, you will still lose in Mahjong'
          },
          "送礼物语音普通": {
            "words": 'notyet'
          },
          "送礼物语音喜好": {
            "words": 'notyet'
          },
          "好感度升级语音1": {
            "words": 'notyet'
          },
          "好感度升级语音2": {
            "words": 'notyet'
          },
          "好感度升级语音3": {
            "words": 'notyet'
          },
          "好感度升级语音4": {
            "words": 'notyet'
          }
        };
        soundGroup.forEach(soundObject => {
          soundObject.level_limit = 0;
          if (changeMap.hasOwnProperty(soundObject.name_chs)) {
            for (let [key, val] of Object.entries(changeMap[soundObject.name_chs])) {
              ['_chs', '_en', '_jp'].forEach(suffix => soundObject[key + suffix] = val)
            }
          }
        });
      }
    });
    console.log('Hacked简介文本');
    cfg.item_definition.character.rows_.forEach(chr => {
      const helper = (key, val) => {
        ['', '_chs', '_en', '_jp'].forEach(suffix => chr[key + suffix] = val)
      };
      switch (chr.id) {
        case 200002:
          chr.name = ' 鷲巣巌 ';
          chr.name_chs = ' 鷲巣巌 ';
          chr.name_en = ' Washizu Iwao ';
          chr.name_jp = '赤木しげる';
          helper('desc_cv', 'Masane Tsukayama');
          helper('desc', 'Iwao Washizu is an old man who has made hundreds of billions of yen and become one of the most powerful people in the underground world, and acts as the main antagonist of the Washizu Arc.');
          helper('desc_age', '71');
          helper('desc_birth', '5-8-1918');
          helper('desc_bloodtype', 'O');
          helper('desc_hobby', 'Mahjong, Young men, Money');
          helper('desc_stature', '165 cm ');
          break;
      }
    });
  } catch (error) {
    raf = requestAnimationFrame(autoRun);
  }
});
(function () {
  console.log("加入开局语音及胡牌语音");
  const oldNewRoundplay = view.ActionNewRound.play;
  view.ActionNewRound.play = function (e) {
    if (view.DesktopMgr.Inst["player_datas"][view.DesktopMgr.Inst["seat"]]["character"]["charid"] === 200002)
      Laya.SoundManager.playSound("sound/game_start_200002.mp3", 1, {
        run: () => {}
      });
    return oldNewRoundplay.call(this, e)
  }
  const oldmehule = view.ViewPlayer_Me.prototype.HulePrepare;
  view.ViewPlayer_Me.prototype.HulePrepare = function (e, i, n) {
    if (view.DesktopMgr.Inst["current_step"] > 0 && view.DesktopMgr.Inst["player_datas"][view.DesktopMgr.Inst["seat"]]["character"]["charid"] === 200002)
      Laya.SoundManager.playSound("sound/hupai_200002.mp3", 1, {
        run: () => {}
      });
    return oldmehule.call(this, e, i, n)
  }
})();
