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
            "words": '今日からお世話になります。橘ありすです。橘と呼んでください。アイドルになったら、プロとしてのお仕事はちゃんとするつもりですので。これからよろしくお願いします。',
          },
          "登录语音普通": {
            "words": 'おはようございます。朝から頑張るのは、大事だと思います'
          },
          "登录语音满羁绊": {
            "words": 'あの、ずっと黙っていられると、ちょっと…。どうしたんですか？'
          },
          "大厅交互语音1": {
            "words": '…あ、すみません。本を読んでいて気が付きませんでした'
          },
          "大厅交互语音2": {
            "words": 'か、過去は振り返りませんよ。恥ずかしい言動のひとつやふたつ！'
          },
          "大厅交互语音3": {
            "words": 'いえ、あの…橘って呼ばれても、どの橘かわからないし、その…'
          },
          "大厅交互语音4": {
            "words": '{var:player_nickname}プロデューサーさんは、どうして私をスカウトしたんだろう…'
          },
          "大厅交互语音5": {
            "words": '…5年後を見ていてくださいね。気絶させるほどの美人になる予定です'
          },
          "大厅交互语音6": {
            "words": '私も、なれるでしょうか。みんなを照らして、心を動かすような光に…'
          },
          "大厅交互语音7": {
            "words": 'はい。タブレットは、電子書籍とか…ゲームとかに使っています'
          },
          "大厅交互语音8": {
            "words": '新しいことが始まる予感がする…。ううん、きっと予感だけじゃないです'
          },
          "送礼物语音普通": {
            "words": '{var:player_nickname}プロデューサーさんは信用できそうって思います'
          },
          "送礼物语音喜好": {
            "words": '{var:player_nickname}プロデューサーさんのお仕事、私全部受けるつもりです'
          },
          "好感度升级语音1": {
            "words": 'はい論破って…そういう仲、卒業しませんか、{var:player_nickname}プロデューサーさん'
          },
          "好感度升级语音2": {
            "words": '泣いてません。まだ泣いてないってことに してくれませんか、{var:player_nickname}プロデューサーさん。最後まで、やりきらないといけないから。'
          },
          "好感度升级语音3": {
            "words": 'でも、私……今は…一番、信頼しています。うまく子供扱いしたり、大人扱いしたりして、 ここまで連れてきてくれたから。'
          },
          "好感度升级语音4": {
            "words": 'それから最後に。私…本音なんて言う気ありませんでした。でも胸がいっぱいで隠せなくて。ホントの感動って、こわいですね。以上です。'
          },
          "好感度升级语音5": {
            "words": '……泣き虫じゃありません。もう、立派なアイドルなんですから。ただ……。ただきっと……あなたが、特別なだけです。'
          },
          "契约语音": {
            "words": '見えますか、不思議の国の童話を着こなす、私の姿が。聞こえますか、私を呼んでくれる、たくさんの声が。他の誰でもありません、このお伽噺はもう私…橘ありすのものです'
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
          chr.name = '橘爱丽丝';
          chr.name_chs = '橘爱丽丝';
          chr.name_en = 'Tachibana Arisu';
          chr.name_jp = '橘ありす';
          helper('desc_cv', '佐藤亚美菜');
          helper('desc', '威风凛凛的睫毛，及腰的棕色长发，头上一个大大的蓝色蝴蝶结，又叫做爱丽丝，让人联想到童话故事中的人物。因此曾经为自己的名字不像日本人而深深感到苦恼。\n作为12岁的小女孩，伦理逻辑相当严密，比同龄人更加成熟。很擅长学习，是一名小小优等生。\n因为对人对己都很严格，有时候会显得刻薄冷淡。与此印象相反，认为音乐里充满力量，对于音乐富有热情。\n兴趣是玩游戏和读推理小说，经常全神贯注地投入到爱好中。另外，平常还喜欢带着平板电脑。');
          helper('desc_age', '12');
          helper('desc_birth', '7月31日');
          helper('desc_bloodtype', 'A');
          helper('desc_hobby', '游戏、读推理小说');
          helper('desc_stature', '141厘米');
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