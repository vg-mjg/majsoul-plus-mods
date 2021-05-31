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
            "words": 'Ryuumonbuchi Touka, desu wa!',
          },
          "登录语音普通": {
            "words": 'Ryuumonbuchi Touka, desu wa!'
          },
          "登录语音满羁绊": {
            "words": 'Good morning, good morning Nodocchi!'
          },
          "大厅交互语音1": {
            "words": 'Haramura Nodoka!'
          },
          "大厅交互语音2": {
            "words": 'Haramura Nodoka!'
          },
          "大厅交互语音3": {
            "words": 'Haramura Nodoka!'
          },
          "大厅交互语音4": {
            "words": 'Haramura Nodoka!'
          },
          "大厅交互语音5": {
            "words": 'Haramura Nodoka!'
          },
          "大厅交互语音6": {
            "words": 'Haramura Nodoka!'
          },
          "大厅交互语音7": {
            "words": 'Haramura Nodoka!'
          },
          "大厅交互语音8": {
            "words": 'Haramura Nodoka!'
          },
          "送礼物语音普通": {
            "words": 'Haramura Nodoka!'
          },
          "送礼物语音喜好": {
            "words": 'Haramura Nodoka!'
          },
          "好感度升级语音1": {
            "words": 'Haramura Nodoka!'
          },
          "好感度升级语音2": {
            "words": 'Haramura Nodoka!'
          },
          "好感度升级语音3": {
            "words": 'Haramura Nodoka!'
          },
          "好感度升级语音4": {
            "words": 'Haramura Nodoka!'
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
          chr.name_en = 'Ryuumonbuchi Touka';
          chr.name_jp = '赤木しげる';
          helper('desc_cv', 'Minori Chihara');
          helper('desc', 'Touka Ryuumonbuchi is a second year student at Ryuumonbuchi High School and is the president of the mahjong club. Touka is the daughter of Ryuumonbuchi High School`s principal and her grandfather owns the school. Koromo Amae is her cousin. She likes to draw attention to herself and at the same time she hates others who draw attention to themselves, particularly Nodoka Haramura. She is last year`s prefectural individual tournament winner. Hajime stated that Touka is like the mother in their family.');
          helper('desc_age', '17');
          helper('desc_birth', 'September 10');
          helper('desc_bloodtype', 'O');
          helper('desc_hobby', 'Mahjong, Koromo, Hajime');
          helper('desc_stature', '157 cm ');
          break;
      }
    });
  } catch (error) {
    raf = requestAnimationFrame(autoRun);
  }
});