// プロフィール修正
requestAnimationFrame(function autoRun() {
  try {
    const arrBackup = cfg.voice.sound.groups_
    if (!arrBackup || arrBackup.length === 0) {
      throw new Error();
    }
    cfg.item_definition.character.rows_.forEach(chr => {
      const helper = (key, val) => {
        ['', '_chs', '_en', '_jp'].forEach(suffix => chr[key + suffix] = val)
      };
      switch (chr.id) {
        case 200001:
          helper('name', 'Syaro Kirima');
          helper('desc_cv', 'Maaya Uchida');
          helper('desc', 'She works part-time at the Fleur de Lapin café. She acts like a rich young lady, but in truth she lives a simple life. She also gets drunk off caffeine...');
          helper('desc_age', '17');
          helper('desc_birth', 'July 15');
          helper('desc_bloodtype', 'A');
          helper('desc_hobby', 'Porcelain and Glassware Collection');
          helper('desc_stature', '151cm');
          break;
        case 200002:
          helper('name', 'Rize Tedeza');
          helper('desc_cv', 'Risa Taneda');
          helper('desc', 'She is a part-time worker at Rabbit House. She carries a gun and has a military nature, but deep down she is a maiden.');
          helper('desc_age', '18');
          helper('desc_birth', 'Febuary 14');
          helper('desc_bloodtype', 'A');
          helper('desc_hobby', 'Model gun collection');
          helper('desc_stature', '160cm');
          break;
        case 200003:
          helper('name', 'Chiya Ujimatsu');
          helper('desc_cv', 'Satomi Satō');
          helper('desc', 'The poster girl of the Japanese-style cafe "Ama Usa An". She has the personality of a Yamato Nadeshiko, but has a penchant for giving bizarre names to her menu.');
          helper('desc_age', '17');
          helper('desc_birth', 'September 19');
          helper('desc_bloodtype', 'O');
          helper('desc_hobby', 'Naming Japanese sweets');
          helper('desc_stature', '157cm');
          break;
       case 200004:
          helper('name', 'Cocoa Hoto');
          helper('desc_cv', 'Ayane Sakura');
          helper('desc', 'She is a live-in student at Cafe Rabbit House. She loves cute and fuzzy things, and has a soft spot for Chino like a little sister.');
          helper('desc_age', '17');
          helper('desc_birth', 'April 10');
          helper('desc_bloodtype', 'B');
          helper('desc_hobby', 'Fluffing up cute things.');
          helper('desc_stature', '154cm');
          break;
        case 200005:
          helper('name', 'Chino Kafu');
          helper('desc_cv', 'Inori Minase');
          helper('desc', 'The only daughter of Rabbit House. She has a cool personality, but she doesn\'t hate Cocoa...? She knows a lot about coffee.');
          helper('desc_age', '15');
          helper('desc_birth', 'December 4');
          helper('desc_bloodtype', 'AB');
          helper('desc_hobby', 'Bottle ships, puzzles');
          helper('desc_stature', '144cm');
          break;
      }
    });
  } catch (error) {
    raf = requestAnimationFrame(autoRun);
  }
});


