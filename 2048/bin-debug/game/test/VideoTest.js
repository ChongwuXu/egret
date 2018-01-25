var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var VideoTest = (function (_super) {
    __extends(VideoTest, _super);
    function VideoTest() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddedToStage, _this);
        return _this;
    }
    VideoTest.prototype.onAddedToStage = function () {
        this.video = new egret.Video();
        this.video.width = 640;
        this.video.height = 320;
        this.video.x = 0;
        this.video.y = 0;
        this.video.fullscreen = false;
        this.video.load("http://media.w3.org/2010/05/sintel/trailer.mp4");
        this.addChild(this.video);
        this.video.once(egret.Event.COMPLETE, this.onLoad, this);
        this.video.once(egret.IOErrorEvent.IO_ERROR, this.onLoadError, this);
    };
    VideoTest.prototype.onLoad = function (event) {
        var btnPlay = new eui.Button();
        btnPlay.label = "播放";
        btnPlay.x = this.video.x + 20;
        btnPlay.y = this.video.y + this.video.height + 20;
        this.addChild(btnPlay);
        btnPlay.addEventListener(egret.TouchEvent.TOUCH_TAP, this.play, this);
        console.log(this.video.length);
    };
    VideoTest.prototype.onLoadError = function (event) {
        console.log("video load error");
    };
    VideoTest.prototype.play = function (event) {
        this.video.play();
    };
    return VideoTest;
}(egret.DisplayObjectContainer));
__reflect(VideoTest.prototype, "VideoTest");
//# sourceMappingURL=VideoTest.js.map