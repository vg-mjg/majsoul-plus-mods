if (!!view && !!uiscript) {
  const musicDir = 'bg/'
  const riichiN=2
  const gameN=5
  const _showBackup = uiscript.UI_GameEnd.prototype.show
  uiscript.UI_GameEnd.prototype.show = function () {
    var musicPlayerFlag = false
    view.DesktopMgr.Inst.gameEndResult.players.forEach((player, index) => {
      if (player.seat == view.DesktopMgr.Inst.seat) {
      }
    })
    if (!musicPlayerFlag) {
    }
    _showBackup.apply(this, arguments)
  }
  var randomnumber = Math.floor(Math.random() * 1)+1;
  
  const lobbyMusic = musicDir + 'lobby.mp3' 
  const executeUIs = [['UI_Lobby', 'onEnable', 'lobby.mp3']]
  executeUIs.forEach(([scriptKey, funName, fileName]) => {
    uiscript[scriptKey].prototype[funName] = (() => {
      const functionBackup = uiscript[scriptKey].prototype[funName]
      return function () {
        view.AudioMgr.PlayMusic(musicDir + fileName, 1, false, true)
        return functionBackup.apply(this, arguments)
      }
    })()
  })

  let isRefreshPaiLeftHacked = false
  let isFastrecord = false
  let currentBGM
  let thisTurnBGM
  let richedCount = 0
  let fewPai = false
  const richMusicSet = { count: 0, file: '' }

  view.AudioMgr.PlayMusic = (() => {
    const functionBackup = view.AudioMgr.PlayMusic
    let lastTimeMusic = ''
    return function (audioDir, ...args) {
      if (args[2] !== true) {
        if (view.BgmListMgr.bgm_lobby_list.includes(audioDir)) {
          lastTimeMusic = lobbyMusic
        }
        return functionBackup.apply(this, [lastTimeMusic, ...args])
      } else {
        lastTimeMusic = audioDir
      }
      return functionBackup.apply(this, [audioDir, ...args])
    }
  })()
  const backupStopmusic = view.AudioMgr.StopMusic
  view.AudioMgr.StopMusic = function () {
    return backupStopmusic.apply(this, arguments)
  }

  const paiRemain = (number) => {
    return false
  }
  const playMusic = () => {
    let fileDir = ''
    if (richedCount > 0) {
      if (richMusicSet.count < richedCount) {
        richMusicSet.count = richedCount
        fileDir = (() => {
          var randomnumber = Math.floor(Math.random() * (riichiN-1))+1;
          let richFile = 'riichi' + randomnumber
          return richFile
        })()
        richMusicSet.file = fileDir
      } else {
        fileDir = richMusicSet.file
      }
    }
    if (!fileDir) {
      currentBGM = thisTurnBGM
    } else {
      currentBGM = fileDir
    }
    currentBGM = `${musicDir}${currentBGM}.mp3`
    if (!isFastrecord && currentBGM && view.DesktopMgr.Inst.gameing) {
      view.AudioMgr.PlayMusic(currentBGM, 0, false, true)
    }
  }
  const newRound = (roundInfo) => {
    if (!isRefreshPaiLeftHacked && view.DesktopMgr.Inst) {
      isRefreshPaiLeftHacked = true

      const functionBackup = view.DesktopMgr.Inst.RefreshPaiLeft
      view.DesktopMgr.Inst.RefreshPaiLeft = function (...args) {
        if (paiRemain(20)) {
          playMusic()
        }
        return functionBackup.apply(this, args)
      }
    }
    var randomnumber = Math.floor(Math.random() * (gameN-1))+1;
    thisTurnBGM = 'game' + randomnumber 
    richedCount = 0
    fewPai = false
    richMusicSet.count = 0
    richMusicSet.file = ''
    playMusic()
  }

  view.ViewPlayer.prototype.AddQiPai = (function () {
    const functionBackup = view.ViewPlayer.prototype.AddQiPai
    return function (r, isRich, y, z) {
      if (isRich) {
        richedCount++
        playMusic()
      }
      return functionBackup.apply(this, arguments)
    }
  })()
  ;['play', 'fastplay', 'record', 'fastrecord'].forEach((key) => {
    const functionBackup = view.ActionNewRound[key]
    view.ActionNewRound[key] = function (...args) {
      isFastrecord = false
      if (key === 'fastrecord') {
        isFastrecord = true
      }
      const resultBackup = functionBackup.apply(this, args)
      newRound(...args)
      return resultBackup
    }
  })

  Object.entries({
    Replay: '_refreshBarshow',
    Live_Broadcast: '_fastSync',
  }).forEach(([key, value]) => {
    uiscript['UI_' + key]['prototype'][value] = (() => {
      const oldFunction = uiscript['UI_' + key]['prototype'][value]
      return function () {
        const resultBackup = oldFunction.apply(this, arguments)
        if (isFastrecord) {
          isFastrecord = false
          playMusic()
        }
        return resultBackup
      }
    })()
  })

  const backupFun = view.DesktopMgr.prototype.initRoom
  view.DesktopMgr.prototype.initRoom = function (...args) {
    try {
      const player_datas = args[1]
      if (Array.isArray(player_datas)) {
        player_datas.forEach((player_data) => {
          const views = player_data.views
          if (views && views.length) {
            if (Array.isArray(views)) {
              player_data.views = views.filter((view) => {
                const slot = view.slot
                const id = view.item_id
                return !(slot == game.EView.lizhi_bgm)
              })
            }
          }
        })
      }
      args[1] = player_datas
    } catch (e) {
      console.warn(e)
    }
    return backupFun.call(this, ...args)
  }
}
