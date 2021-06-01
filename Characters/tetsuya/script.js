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
            "words": 'notyet'
          },
          "登录语音满羁绊": {
            "words": 'notyet'
          },
          "大厅交互语音1": {
            "words": 'notyet'
          },
          "大厅交互语音2": {
            "words": 'notyet'
          },
          "大厅交互语音3": {
            "words": 'notyet'
          },
          "大厅交互语音4": {
            "words": 'notyet'
          },
          "大厅交互语音5": {
            "words": 'notyet'
          },
          "大厅交互语音6": {
            "words": 'notyet'
          },
          "大厅交互语音7": {
            "words": 'notyet'
          },
          "大厅交互语音8": {
            "words": 'notyet'
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
          chr.name = '阿佐田哲也';
          chr.name_chs = '阿佐田哲也';
          chr.name_en = 'Tetsuya Asada';
          chr.name_jp = '阿佐田哲也';
          helper('desc_cv', 'Ryotaro Okiayu');
          helper('desc', 'Tetsuya Asada is the main protagonist of the Legendary Gambler Tetsuya series. He is a genius who specializes in mahjong.');
          helper('desc_age', '23');
          helper('desc_birth', '???');
          helper('desc_bloodtype', '?');
          helper('desc_hobby', 'Mahjong, Cheating');
          helper('desc_stature', '???');
          break;
      }
    });
  } catch (error) {
    raf = requestAnimationFrame(autoRun);
  }
});
requestAnimationFrame(function autoRun() {
  try {
    const arrBackup = cfg.voice.sound.groups_
    if (!arrBackup || arrBackup.length === 0) {
      throw new Error();
    }
    console.log('Hacked语音文本');
    Object.entries(cfg.voice.sound.groups_).forEach(([soundID, soundGroup]) => {
      if (soundID == 1) {
        const changeMap = {
          "获得语音": {
            "words": 'notyet',
          },
          "登录语音普通": {
            "words": 'notyet'
          },
          "登录语音满羁绊": {
            "words": 'notyet'
          },
          "大厅交互语音1": {
            "words": 'notyet'
          },
          "大厅交互语音2": {
            "words": 'notyet'
          },
          "大厅交互语音3": {
            "words": 'notyet'
          },
          "大厅交互语音4": {
            "words": 'notyet'
          },
          "大厅交互语音5": {
            "words": 'notyet'
          },
          "大厅交互语音6": {
            "words": 'notyet'
          },
          "大厅交互语音7": {
            "words": 'notyet'
          },
          "大厅交互语音8": {
            "words": 'notyet'
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
        case 200001:
          chr.name = 'ダンチ';
          chr.name_chs = 'ダンチ';
          chr.name_en = 'Danchi';
          chr.name_jp = 'ダンチ';
          helper('desc_cv', 'Wataru Takagi');
          helper('desc', 'Danchi, one of Tetsuya*s gambling partners, acts as a foil to Tetsuya*s personality having a goofy, comedic personality.');
          helper('desc_age', '???');
          helper('desc_birth', '???');
          helper('desc_bloodtype', '?');
          helper('desc_hobby', 'Mahjong, Cheating');
          helper('desc_stature', '???');
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
    if (view.DesktopMgr.Inst["player_datas"][view.DesktopMgr.Inst["seat"]]["character"]["charid"] === 200001)
      Laya.SoundManager.playSound("sound/game_start_200001.mp3", 1, {
        run: () => {}
      });
    return oldNewRoundplay.call(this, e)
  }
  const oldmehule = view.ViewPlayer_Me.prototype.HulePrepare;
  view.ViewPlayer_Me.prototype.HulePrepare = function (e, i, n) {
    if (view.DesktopMgr.Inst["current_step"] > 0 && view.DesktopMgr.Inst["player_datas"][view.DesktopMgr.Inst["seat"]]["character"]["charid"] === 200001)
      Laya.SoundManager.playSound("sound/hupai_200001.mp3", 1, {
        run: () => {}
      });
    return oldmehule.call(this, e, i, n)
  }
})();
