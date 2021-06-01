// 修改一姬语音台词以及人物简介
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
            "words": 'Maybe I\'m not fit to play in the captain battle. ... It looks like I let my insecurity get the better of me.',
          },
          "登录语音普通": {
            "words": 'It\'s been a while.'
          },
          "登录语音满羁绊": {
            "words": 'You\'re late.'
          },
          "大厅交互语音1": {
            "words": 'It wouldn\'t be bad to instill some fear in them.'
          },
          "大厅交互语音2": {
            "words": 'Mahjong isn\'t about luck. However, if it\'s just a couple of hanchan an amateur can beat a pro.'
          },
          "大厅交互语音3": {
            "words": 'I won\'t lose as long as I keep winning.'
          },
          "大厅交互语音4": {
            "words": 'I won\'t lose as long as I keep winning.'
          },
          "大厅交互语音5": {
            "words": 'Don\'t let a target escape after it enters the range.'
          },
          "大厅交互语音6": {
            "words": 'Mahjong isn\'t about luck. However, if it\'s just a couple of hanchan an amateur can beat a pro.'
          },
          "大厅交互语音7": {
            "words": 'It wouldn\'t be bad to instill some fear in them.'
          },
          "大厅交互语音8": {
            "words": 'Don\'t let a target escape after it enters the range.'
          },
          "送礼物语音普通": {
            "words": 'I\'m grateful.'
          },
          "送礼物语音喜好": {
            "words": 'Thank you.'
          },
          "好感度升级语音1": {
            "words": 'When things turn out this way people start to get greedy.'
          },
          "好感度升级语音2": {
            "words": 'If only we can get past this hurdle...'
          },
          "好感度升级语音3": {
            "words": 'You\'re number one.'
          },
          "好感度升级语音4": {
            "words": 'I want you!'
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
          chr.name = '加治木 ゆみ';
          chr.name_chs = '加治木 ゆみ';
          chr.name_en = 'Kajiki Yumi';
          chr.name_jp = '加治木 ゆみ';
          helper('desc_cv', 'Kobayashi Yuu');
          helper('desc', 'A third-year at Tsuruga Academy. Under her somewhat cold and distant exterior, Yumi has shown a more human, humble, and even insecure side. Yumi is a great, caluclating leader. She\'s able to grasp concepts at a fast pace, picking up on subtle things that others wouldn\'t notice immediately. Thanks to being perceptive she\'s quick to recognize other players\' playstyles and counter them.');
          helper('desc_age', '18');
          helper('desc_birth', 'December 21');
          helper('desc_bloodtype', 'O');
          helper('desc_hobby', 'Mahjong, Momo');
          helper('desc_stature', '164 cm ');
          break;
      }
    });
  } catch (error) {
    raf = requestAnimationFrame(autoRun);
  }
});