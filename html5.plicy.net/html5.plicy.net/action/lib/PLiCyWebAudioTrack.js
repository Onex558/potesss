
/**
 * MediaStreamを引数で渡すと、WebAudioを取得します（非同期）
 * @param {MediaStream} mediaStream
 * @returns {undefined}
 */
var PLiCyWebAudioTrack = function(mediaStream){
    "use strict";
    if(!this.check){
        return;
    }
    this.audioFlag = false;
    this.mediaStream = mediaStream;
    if(this.createClasses.length === 0){
        this.createClasses.push(this);
    }
    if(this.setupEnded){
        this.trackCopy();
    }
};
(function(){
    "use strict";
    window.PLiCyWebAudioTrack = PLiCyWebAudioTrack;
    PLiCyWebAudioTrack.prototype = {
        AudioContext:window.AudioContext || window.webkitAudioContext,
        createClasses:[],
        audioTracks:[],
        mikeSource:null,
        check:false,
        setupEnded:false,
        init:function(){
            var AudioContext;
            AudioContext = this.AudioContext;
            if((!AudioContext)||(!window.MediaRecorder)){
                //WebAudio非対応またはメディアレコーダー非対応
                return;
            }
            var canvas = document.getElementsByTagName("canvas")[0] || document.createElement("canvas");
            if(canvas.captureStream === undefined){
                return;
            }
            this.check = true;
            var CopyClassDatas,self,len,i,CLASS,CopyClassData,params;
            CopyClassDatas = [{
                    CLASS:window.GainNode,
                    params:["connect","disconnect"]
            }];
            self = this;
            len = CopyClassDatas.length;
            for(i=0;i<len;i++){
                CopyClassData = CopyClassDatas[i];
                CLASS = CopyClassData.CLASS;
                if(CLASS){
                    params = CopyClassData.params;
                    params.forEach(function(name){
                        var audioNodeConnect = CLASS.prototype[name];
                        CLASS.prototype[name] = function(){
                            var log,dest;
                            log = audioNodeConnect.apply(this,arguments);
                            dest = self.dest;
                            if(!dest){
                                return log;
                            }
                            try{
                                audioNodeConnect.call(this,dest);
                            }catch(e){
                                
                            }
                            return log;
                        };
                    });
                }
            }
            var self = this;
            var functionTable = this.functionTable = {
                nativeScript:{
                    createMediaElementSource:AudioContext.prototype.createMediaElementSource,
                    createBufferSource:AudioContext.prototype.createBufferSource
                },
                wait:{
                    createMediaElementSource:function(){
                        var log = null;
                        log = functionTable.nativeScript.createMediaElementSource.apply(this,arguments);
                        self.setup(this);
                        return log;
                    },
                    createBufferSource:function(){
                        var log = null;
                        log = functionTable.nativeScript.createBufferSource.apply(this,arguments);
                        self.setup(this);
                        return log;
                    }
                }
            };
            //wait関数に書き換え
            this.copyFunctions(AudioContext.prototype,functionTable.wait);
        },
        setup : function(audioAPIContext){
            //native関数に戻す
            var functionTable = this.functionTable;
            if(functionTable){
                if(this.equalFunctions(this.AudioContext.prototype,functionTable.wait)){
                    //一致したら、書き換え前に戻していい
                    this.copyFunctions(this.AudioContext.prototype,functionTable.nativeScript);
                }
                
                //初期設定開始
                //初期設定
                var dest = audioAPIContext.createMediaStreamDestination();
                var mediaRecorder = new MediaRecorder(dest.stream);

                this.audioAPIContext = audioAPIContext;
                this.mediaRecorder = mediaRecorder;
                this.mediaRecorder.start();
                this.setupEnded = true;
                this.dest = dest;
                mediaRecorder.ondataavailable = this.ondataavailable;
                mediaRecorder.onstop = this.onstop;
                this.audioTracks = dest.stream.getAudioTracks();


                var i,len,createClasses;
                createClasses = this.createClasses;
                len = createClasses.length;
                for(i=0;i<len;i++){
                    createClasses[i].trackCopy();
                }
                createClasses.length = 0;
                functionTable = null;
            }
        },
        trackCopy:function(){
            var mediaStream,audioTrack,audioTracks,i,len;
            if(!this.audioFlag){
                this.audioFlag = true;
                mediaStream = this.mediaStream;
                audioTracks = this.audioTracks;
                len = audioTracks.length;
                for(i=0;i<len;i++){
                    audioTrack = audioTracks[i];
                    if(audioTrack){
                        mediaStream.addTrack(audioTrack);
                    }
                }
                if(this.mikeSource){
                    try{
                        this.mikeSource.disconnect(this.dest);
                    }catch(e){

                    }
                    this.__proto__.mikeSource = null;
                }
            }
        },
        onstop:function(e){
        },
        ondataavailable:function(e){
            //Blob生成
            //  window.open(URL.createObjectURL(e.data));//blob
        },
        copyFunctions:function(prototype,table){
            //関数の一括代入
            var key;
            for(key in table){
                prototype[key] = table[key];
                //delete table[key];
            }
        },
        equalFunctions:function(prototype,table){
            //関数の一括代入
            var key;
            for(key in table){
                if(prototype[key] !== table[key]){
                    return false;
                }
                //delete table[key];
            }
            return true;
        },
        useMike:function(currentMikeStream){
            if(this.mikeSource){
                return;
            }
            var source = this.audioAPIContext.createMediaStreamSource(currentMikeStream);
            source.connect(this.dest);
            this.__proto__.mikeSource = source;
        }
    };
    PLiCyWebAudioTrack.prototype.init();
}());