var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var MainScreen = (function (_super) {
    __extends(MainScreen, _super);
    function MainScreen() {
        var _this = _super.call(this) || this;
        _this._isLoading = false;
        _this._loadingComplete = false;
        _this._loadingTimerComplete = false;
        return _this;
    }
    MainScreen.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.createView();
    };
    MainScreen.prototype.createView = function () {
        var bg = RES.getRes("start_png");
        var bitmap = new egret.Bitmap();
        var stageWidth = this.stage.stageWidth;
        var stageHeight = this.stage.stageHeight;
        bitmap.texture = bg;
        var imageWidth = bitmap.texture.textureWidth;
        var imageHeight = bitmap.texture.textureHeight;
        var is16_9 = (imageWidth / imageHeight < stageWidth / stageHeight);
        bitmap.width = stageWidth;
        bitmap.height = imageHeight * stageWidth / imageWidth;
        bitmap.y = (stageHeight - bitmap.height);
        if (is16_9) {
            bitmap.y += (333 - 147) / 2;
        }
        this.addChild(bitmap);
        var btnBegin = new ButtonBegin();
        btnBegin.skinName = skins.ButtonBeginSkin;
        btnBegin.verticalCenter = is16_9 ? 0 : 10;
        btnBegin.horizontalCenter = 0;
        this.addChild(btnBegin);
        btnBegin.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickBegin, this);
        // let btnQuit = new eui.Button();
        // btnQuit.skinName = skins.ButtonLiangSkin;
        // btnQuit.labelDisplay.text = "退出游戏";
        // btnQuit.bottom = 38;
        // btnQuit.horizontalCenter = 0;
        // this.addChild(btnQuit);
        // btnQuit.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickQuit, this);
        RES.loadGroup("LoadingScreen");
    };
    MainScreen.prototype.onClickBegin = function (event) {
        if (this._isLoading == false) {
            this._loadingScreen = new LoadingScreen();
            this.addChild(this._loadingScreen);
            this._isLoading = true;
            RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.loadGroup("GamePlayScreen");
            this._loadingTimer = new egret.Timer(2000, 0);
            this._loadingTimer.addEventListener(egret.TimerEvent.TIMER, this.onLoadingTimer, this);
            this._loadingTimer.start();
        }
    };
    MainScreen.prototype.onClickQuit = function (event) {
    };
    MainScreen.prototype.onResourceLoadComplete = function (evt) {
        if (evt.groupName == "GamePlayScreen") {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            this._loadingComplete = true;
            this.enterGamePlay();
        }
    };
    MainScreen.prototype.onLoadingTimer = function (evt) {
        this._loadingTimer.removeEventListener(egret.TimerEvent.TIMER, this.onLoadingTimer, this);
        this._loadingTimer.stop();
        this._loadingTimer = null;
        this._loadingTimerComplete = true;
        this.enterGamePlay();
    };
    MainScreen.prototype.enterGamePlay = function () {
        if (this._loadingComplete && this._loadingTimerComplete) {
            this._isLoading = false;
            this.removeChild(this._loadingScreen);
            this._loadingScreen.Dispose();
            this._loadingScreen = null;
            this._gamePlayScreen = new GamePlayScreen();
            this.addChild(this._gamePlayScreen);
        }
    };
    return MainScreen;
}(eui.UILayer));
__reflect(MainScreen.prototype, "MainScreen");
