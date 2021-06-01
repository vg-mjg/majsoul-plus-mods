// 强制开启便捷提示
if (game) {
  const backupFun = view.DesktopMgr.prototype.initRoom
  view.DesktopMgr.prototype.initRoom = function(...args) {
    try {
      args[0].mode.detail_rule.bianjietishi = true
    } catch (e) {
      console.warn(e)
    }
    return backupFun.call(this, ...args)
  }
}
