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
            "words": 'I`m gonna school your retard ass',
          },
          "登录语音普通": {
            "words": 'I`m gonna school your retard ass'
          },
          "登录语音满羁绊": {
            "words": 'I`m gonna school your retard ass'
          },
          "大厅交互语音1": {
            "words": 'I`m gonna school your retard ass'
          },
          "大厅交互语音2": {
            "words": 'I`m gonna school your retard ass'
          },
          "大厅交互语音3": {
            "words": 'I`m gonna school your retard ass'
          },
          "大厅交互语音4": {
            "words": 'I`m gonna school your retard ass'
          },
          "大厅交互语音5": {
            "words": 'I`m gonna school your retard ass'
          },
          "大厅交互语音6": {
            "words": 'I`m gonna school your retard ass'
          },
          "大厅交互语音7": {
            "words": 'I`m gonna school your retard ass'
          },
          "大厅交互语音8": {
            "words": 'I`m gonna school your retard ass'
          },
          "送礼物语音普通": {
            "words": 'I`m gonna school your retard ass'
          },
          "送礼物语音喜好": {
            "words": 'I`m gonna school your retard ass'
          },
          "好感度升级语音1": {
            "words": 'I`m gonna school your retard ass'
          },
          "好感度升级语音2": {
            "words": 'I`m gonna school your retard ass'
          },
          "好感度升级语音3": {
            "words": 'I`m gonna school your retard ass'
          },
          "好感度升级语音4": {
            "words": 'I`m gonna school your retard ass'
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
          chr.name = '神楽めあ';
          chr.name_chs = '神楽めあ';
          chr.name_en = 'Hiroe Atago';
          chr.name_jp = '赤木しげる';
          helper('desc_cv', 'Matsuda Satsumi');
          helper('desc', 'Hiroe is a loud, confident, and rather rude person. She has very little reservations about gloating, calling out her opponents, or calling them names, but is not mean spirited about it, just tactless. However she is kind to all of her teammates and cheers them on.');
          helper('desc_age', '18');
          helper('desc_birth', 'July 18 ');
          helper('desc_bloodtype', 'O');
          helper('desc_hobby', 'schooling your retard ass');
          helper('desc_stature', '156 cm ');
          break;
      }
    });
  } catch (error) {
    raf = requestAnimationFrame(autoRun);
  }
});