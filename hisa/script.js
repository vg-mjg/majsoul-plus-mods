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
            "words": 'Hm? You\'re today\'s guest? My name\'s Takei Hisa. For the record at this school it\'s not student council president, it\'s student congress president.',
          },
          "登录语音普通": {
            "words": 'Welcome back.'
          },
          "登录语音满羁绊": {
            "words": 'Oh, welcome back! Well, let\'s begin!'
          },
          "大厅交互语音1": {
            "words": 'I have a lot I\'d like to ask you but for now let\'s play mahjong.'
          },
          "大厅交互语音2": {
            "words": 'Student CONGRESS president.'
          },
          "大厅交互语音3": {
            "words": 'You seem to be having trouble. Even if you can\'t do it now, if you\'ll keep at it the effort won\'t be wasted.'
          },
          "大厅交互语音4": {
            "words": 'Sometimes you\'ll think that the odds are against you, or that you lack the talent. But if you keep moving foward, step by step, eventually your perspective will change.'
          },
          "大厅交互语音5": {
            "words": 'If I lost choosing bad waits, I would start making rational choices. But I end up choosing the waits with the worst odds and winning with them anyway. Choosing bad waits and winning with them. That\'s my playstyle... That\'s me.'
          },
          "大厅交互语音6": {
            "words": 'I just thought of something interesting. Hm? What is it? I wonder what you\'re talking about~'
          },
          "大厅交互语音7": {
            "words": 'Welcome to the mahjong club! Glad to have you.'
          },
          "大厅交互语音8": {
            "words": 'Will you live your one and only life deciding everything logically? This year\'s nationals are the only ones I\'m able to participate in.'
          },
          "送礼物语音普通": {
            "words": 'Not bad.'
          },
          "送礼物语音喜好": {
            "words": 'How exciting!'
          },
          "好感度升级语音1": {
            "words": 'You exceeded my expectations. Great job!'
          },
          "好感度升级语音2": {
            "words": 'It\'s about time...'
          },
          "好感度升级语音3": {
            "words": 'Things sure turned interesting, haven\'t they.'
          },
          "好感度升级语音4": {
            "words": 'This year is my last chance. If I lose it\'s all over. At least let me dream about winning the national championship.'
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
          chr.name = '竹井 久';
          chr.name_chs = '竹井 久';
          chr.name_en = 'Takei Hisa';
          chr.name_jp = '竹井 久';
          helper('desc_cv', 'Itou Shizuka');
          helper('desc', 'A third-year student at Kiyosumi High School who\'s the president of the mahjong club, as well as the student congress president. Hisa believes that there is a meaning to each tile she draws, utilizing the flow of the game, and changing her hand accordingly. During key moments she relies on bad waits because she feels that she always wins with them. She likes to throw off her opponents by switching between good and bad waits. Hisa has good foresight and can be very scheming. She is shown to have great confidence in her mahjong ability and will not back down from a challenge. Said to have bad manners due to her habit of slamming tiles when she declares tsumo.');
          helper('desc_age', '18');
          helper('desc_birth', 'December 13');
          helper('desc_bloodtype', 'O');
          helper('desc_hobby', 'Mahjong, Mihoko, Bad Waits');
          helper('desc_stature', '164 cm ');
          break;
      }
    });
  } catch (error) {
    raf = requestAnimationFrame(autoRun);
  }
});