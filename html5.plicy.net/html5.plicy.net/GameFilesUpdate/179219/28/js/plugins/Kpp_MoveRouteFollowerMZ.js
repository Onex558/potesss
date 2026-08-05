//=============================================================================
// RPG Maker MZ - Kpp_MoveRouteFollowerMZ.js
//=============================================================================
// Copyright (c) 2020 カッピ
//
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
//
// ウェブサイト
// https://birdwind.net/
//
// Twitter
// https://twitter.com/kappi_bw

/*:ja
 * @target MZ
 * @plugindesc 隊列メンバーの移動ルートを設定
 * @author カッピ
 * @url https://birdwind.net/plugin/
 *
 * @help
 * イベントコマンド「移動ルートの設定」を使い、
 * 隊列歩行のメンバーを単独で動かします。
 *
 * 移動ルートの先頭に「スクリプト」を設定し、
 * そこに動かす隊列メンバーを記述します。
 *
 * 隊列２番目(操作キャラの次)であれば
 * FW1
 * とだけ入力してください。
 * 以降の移動ルートの対象が、そのキャラになります。
 *
 * その後ろのキャラは
 * FW2
 * その次は
 * FW3
 *
 * 以降、数字が 1 ずつ増えていきます。
 *
 * ※ダブルクォーテーション、シングルクォーテーションは不要です。
 */

(function() {
	'use strict';
	
	// Set Movement Route
	const _Game_Interpreter_command205 = Game_Interpreter.prototype.command205;
	Game_Interpreter.prototype.command205 = function(params) {
		$gameMap.refreshIfNeeded();
		
		if (params[1].list[0].code == Game_Character.ROUTE_SCRIPT) {
			let id = -1;
			
			for (let i = 1; i <= $gamePlayer._followers._data.length; i++) {
				if (params[1].list[0].parameters[0].toUpperCase() == ("FW" + i)) {
					id = i - 1;
					break;
				}
				if (parseInt(params[1].list[0].parameters[0]) >= 12000) {
					id = parseInt(params[1].list[0].parameters[0]) - 12000;
					break;
				}
			}
			
	    	if (id >= 0) {
	    		params[1].list[0].parameters[0] = String(12000 + id);
	    		this._characterId = 12000 + id;
	    		const character = $gamePlayer._followers.follower(id);
	    		if (character) {
			        character.forceMoveRoute(params[1]);
			        if (params[1].wait) {
			            this.setWaitMode("route");
			        }
			    }
			    return true;
	    	}
	    }
	    
	    return _Game_Interpreter_command205.apply(this, arguments);
	};
	
	const _Game_Interpreter_character = Game_Interpreter.prototype.character;
	Game_Interpreter.prototype.character = function(param) {
		if ($gameParty.inBattle()) {
	        return null;
	    } else if (param >= 12000 && param <= 12100) {
	    	return $gamePlayer._followers.follower(param - 12000);
	    }
	    
	    return _Game_Interpreter_character.apply(this, arguments);
	};

})();