//=============================================================================
//  Keke_AnytimeFontChange - いつでもフォント変更
// バージョン: 1.2.1
//=============================================================================
// Copyright (c) 2021 ケケー
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @target MZ
 * @plugindesc ゲーム中にパッとフォントを変更する
 * @author ケケー
 * @url https://kekeelabo.com
 * 
 * @help
 * 【1.2.1】
 * ゲーム中にパッとメインフォントを変更できる
 * メインフォントが変わるため、効果範囲が非常に広いのが特徴
 * 
 *
 * ● 使い方 ●
 *
 * 【1】ファイル投入
 * フォントファイルを fontsフォルダ の中に入れる
 *
 *
 * 【2】フォント登録
 * プラグインパラメータでフォントを登録する
 * ◎呼び出し名
 * 　フォントを呼び出す際に書く名前
 * ◎ファイル名
 * 　fontsフォルダに入れたファイルの名前
 *
 *
 * 【3】メインフォント変更
 * ゲーム中にメインフォントを変更する
 * 変更の仕方は二通り
 *
 * ●プラグインコマンド
 * => プラグインコマンド → フォント変更 → 呼び出し名
 * 【2】で登録した呼び出し名を書く
 *
 * ●制御文字
 * メッセージ中に
 *  \呼び出し名\fn
 * ※fn は fontName の略
 * 例: 
 * \kee\fn
 * 　呼び出し名が kee のフォントを呼び出す
 * \m\fn
 * 　メインフォントを元に戻す
 * ※m は mainFont の略
 * 　このように m はメインフォント戻しに割り当てられているので、
 * 　呼び出し名としては使わないこと
 *
 *
 * 【4】フォント変更の効果範囲
 * 本プラグインではメインフォントを変更する
 * 標準ではメインフォントはゲーム全体に適用されているため、
 * フォント変更の効果範囲も全体に及ぶ
 * ただし他プラグインでメインフォント以外のフォントも使用している場合は、
 * その適用箇所については変更されない
 *
 *
 * ● 利用規約 ●
 * MITライセンスのもと、自由に使ってくれて大丈夫です
 *
 *
 *
 * You can change the main font at a glance during the game
 * Since the main font is changed, the effect range is very wide.
 * 
 * 
 * ● How to use ●
 *
 * [1] File input
 * put the font file in the fonts folder
 *
 *
 * [2] Font registration
 * Register fonts with plugin parameters
 * ◎ Invocation name
 *   The name to write when calling the font
 * ◎File name
 *   The name of the file in the fonts folder
 *
 *
 * [3] Change main font
 * Change main font during game
 * There are two ways to change
 *
 * ● Plugin command
 * => plugin command → change font → call name
 * Write the invocation name registered in [2]
 *
 * ● Control characters
 * in a message
 * \invocation name\fn
 * ※ fn stands for fontName
 * example: 
 * \kee\fn
 *   Call the font whose call name is kee
 * \m\fn
 *   Restore the main font
 * ※ m stands for mainFont
 *   In this way, m is assigned to return the main font, so
 *   Do not use it as an invocation name
 *
 *
 * [4] Effect range of font change
 * This plugin changes the main font
 * By default, the main font is applied to the entire game, so
 * The effect range of font change also extends to the whole
 * However, if other plugins use fonts other than the main font,
 * No change to where it applies
 *
 *
 * ● Terms of Use ●
 * Feel free to use it under the MIT license.
 * 
 * 
 * 
 * @param フォント登録リスト
 * @desc 使うフォントのリスト。呼び出し名は自由に。ファイル名は拡張子まで入れること。空欄ダブルクリックで何個でも追加できる
 * @type struct<fontCfg>[]
 * @default []
 *
 *
 *
 * @command fontChange
 * @text メインフォント変更
 * @desc メインフォントを変更する
 * 
 * @arg fontName
 * @type string
 * @text 呼び出し名
 * @desc フォント登録した呼び出し名
 *
 *
 * @command fontReturn
 * @text メインフォント戻す
 * @desc メインフォントを元に戻す
 */
 
 
//==================================================
/*~struct~fontCfg:
//==================================================
 * @param 呼び出し名
 * @desc フォントの名前。フォントを呼び出すのに使う
 *
 * @param ファイル名
 * @desc フォントファイルの名前。fontsフォルダに置いてあるファイルの名前をそのまま入力する。拡張子まで入れること
 */



(() => {
    //- プラグイン名
    const pluginName = document.currentScript.src.match(/^.*\/(.*).js$/)[1];
    
    
    
    //==================================================
    //--  文字列オート変換 /ベーシック
    //==================================================
    
    // 文字列のハッシュ化
    function strToHash(str) {
        if (!str || !str.length) { return {}; }
        let hash = {};
        const strs = JSON.parse(str);
        let val = null;
        let val2 = null;
        for (let key in strs) {
            val = strs[key];
            if (!key || !val) { continue; }
            val2 = strToAuto(val, key);
            hash[key] = val2;
        }
        return hash;
    };
    
    
    // 文字列のリスト化
    function strToList(str) {
        if (!str || !str.length) { return []; }
        let array = JSON.parse(str);
        return array.map((val, i) => {
            return strToAuto(val);
        });
    };
    
    
    // 文字列の自動処理
    function strToAuto(val, key = "") {
        let val2 = null;
        let match = null;
        let end = false;
        if (!end) {
            if (val[0] == "{") {
                val2 = strToHash(val);
                end = true;
            }
        }
        if (!end) {
            if (val[0] == "[") {
                val2 = strToList(val);
                end = true;
            }
        }
        if (!end) { val = val + ","; }
        if (!end) {
            match = val.match(/^\s*(-?\d+,\s*-?\d+,\s*-?\d+,?\s*-?\d*\.?\d*)\s*,$/);
            if (match && !val.match(/[^\d\.\-,\s]/)) {
                if (key.match(/(カラー|色|塗り)/) && !key.includes("トーン") && !key.includes("ブレンド") && !key.includes("配色") && !key.includes("着色") &&  !key.includes("フラッシュ") && !key.includes("チェンジ") &&  !key.includes("選択")) {
                    val2 = "rgba(" +  match[1] + ")";
                } else {
                    val2 = JSON.parse("[" +  match[1] + "]");
                }
                end = true;
            }
        }
        if (!end) {
            match = val.match(/(-?\d+\.?\d*),\s*/g);
            if (match && match.length >= 2 && !val.match(/[^\d\.\-,\s]/)) {
                val2 = JSON.parse("[" + match.reduce((r, s) => r + s).replace(/,$/, "") + "]");
                end = true;
            }
        }
        if (!end) {
            match = val.match(/^(true|false)\s*,/);
            if (match) {
                val2 = match[1] == "true" ? true : false;
                end = true;
            }
        }
        if (!end) {
            match = val.match(/^(-?\d+\.?\d*)\s*,/);
            if (match && !val.match(/[^\d\.\-,\s]/)) {
                val2 = Number(match[1]); end = true;
                end = true;
            }
        }
        if (!end) {
            match = val.match(/^.+,\n?.+/);
            if (match) {
                val2 = val.replace(/\s/g, "").split(",").filter(v => v);
                end = true;
            }
        }
        if (!end) {
            if (val[0] == "\"") { val = val.slice(1); }
            val2 = val.slice(0, -1);
        }
        return val2;
    };
    
    
    
    //==================================================
    //--  プラグインコマンド基本 /ベーシック
    //==================================================
    
    //- プラグインコマンド呼び出しプリターを保存
    const _PluginManager_callCommand = PluginManager.callCommand;
    PluginManager.callCommand = function(self, pluginName, commandName, args) {
        $gameTemp._pluginCmdPreterKe = self;
        _PluginManager_callCommand.apply(this, arguments);
    };



    //==================================================
    //--  パラメータ受け取り
    //==================================================
    
    const parameters = PluginManager.parameters(pluginName);

    const keke_fontList = strToList(parameters["フォント登録リスト"]);



    //==================================================
    //--  プラグインコマンド
    //==================================================
    
    //- フォント変更
    PluginManager.registerCommand(pluginName, "fontChange", args => {
        // メインフォントの変更
        changeMainFont(args.fontName, $gameTemp._pluginCmdPreterKe);
    });
    
    
    //- フォント戻す
    PluginManager.registerCommand(pluginName, "fontReturn", args => {
        // 元のメインフォントに変更
        changeOriMainFont();
    });



    //==================================================
    //--  共通処理
    //==================================================

    let fontWait = 0;

    //- メインフォントの変更
    function changeMainFont(fontName, preter) {
        if (!fontName) { return; }
        // ファイル名を取得
        const fileName = getFontFileName(fontName);
        // あったらフォント変更
        if (fileName) {
            FontManager._states["rmmz-mainfont"] = null;
            FontManager.load("rmmz-mainfont", fileName);
        }
        // フォントウェイト開始
        fontWait = 1;
        return fileName;
    };
    
    
    //- フォントファイル名の取得
    function getFontFileName(fontName) {
        // フォント名がないならリターン
        if (!fontName) { return ""; }
         // m ならメインフォントを取得
        if (fontName == "m") {
            return $dataSystem.advanced.mainFontFilename;
        }
        let fileName = "";
        // フォントリスト展開
        for (const cfg of keke_fontList) {
            // 同じ名前があったらファイル名を取得
            if (cfg["呼び出し名"] == fontName) {
                fileName = cfg["ファイル名"];
            }
        }
        return fileName;
    };
    
    
    //- 元のメインフォントに変更
    function changeOriMainFont(preter) {
        FontManager._states["rmmz-mainfont"] = null;
        FontManager.load("rmmz-mainfont", $dataSystem.advanced.mainFontFilename);
        // フォントウェイト開始
        fontWait = 1;
    };
    
    
    //- インタープリターのフォントウェイト(コア追加)
    const _Game_Interpreter_updateWait = Game_Interpreter.prototype.updateWait;
    Game_Interpreter.prototype.updateWait = function() {
        let result = _Game_Interpreter_updateWait.apply(this);
        // ウェイト中なら
        if (fontWait) {
            // フォントのロード完了を待つ
            if (FontManager._states["rmmz-mainfont"] != "loaded") {
                result = true;
            // 完了したらウェイト削除
            } else {
                fontWait = null;
            }
        }
        return result 
    };



    //==================================================
    //--  制御文字でのフォント変更
    //==================================================

    let changedFont = null;

    //- 制御文字によるフォント変更 呼び出し(コア追加)
    const _Game_Interpreter_command101 = Game_Interpreter.prototype.command101;
    Game_Interpreter.prototype.command101 = function(params) {
        // 制御文字によるフォント変更
        if (waitFontControllChar(this)) { return false; };
        return _Game_Interpreter_command101.apply(this, arguments);
    };
    
    
    //- 制御文字によるフォント変更
    function waitFontControllChar(preter) {
        // フォント変更済みなら飛ばす
        if (changedFont) {
            changedFont = null;
            return false;
        }
        let success = false;
        // メッセージを取得
        const list = preter._list;
        let i = preter._index;
        let text = "";
        while (list[i + 1] && list[i + 1].code == 401) {
            i++;
            text += list[i].parameters[0];
        }
        // 制御文字がマッチしたら
        const match = text.match(/\\([^\\]+)\\fn/);
        if (match) {
            // フォント名を取得
            const fontName = match[1];
            // メインフォントの変更
            success = changeMainFont(fontName, preter);
            if (success) {
                changedFont = true;
                //const msgWindow = SceneManager._scene._messageWindow;
                //if (msgWindow) { msgWindow.open(); }
                return true;
            }
        }
        return success;
    };
    
    
    //- フォント変更文字の消去(コア追加)
    const _Game_Message_allText = Game_Message.prototype.allText;
    Game_Message.prototype.allText = function() {
        let text = _Game_Message_allText.apply(this);
        if (text) {
            text = text.replace(/\\([^\\]+)\\fn/g, "");
        }
        return text
    };
        
})();