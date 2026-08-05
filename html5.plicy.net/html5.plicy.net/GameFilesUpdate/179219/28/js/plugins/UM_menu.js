(() => {
  'use strict';
      Scene_Map.prototype.callMenu = function() {
        SoundManager.playOk();
        // SceneManager.push( Scene_Menu );
        // Window_MenuCommand.initCommandPosition();
        SceneManager.callCustomMenu('Scene_Inn'); // 追加した行
        $gameTemp.clearDestination();
        this._mapNameWindow.hide();
        this._waitCount = 2;
    };
})();