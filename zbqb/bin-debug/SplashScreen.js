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
var SplashScreen = (function (_super) {
    __extends(SplashScreen, _super);
    function SplashScreen() {
        var _this = _super.call(this) || this;
        _this._isThemeLoadEnd = false;
        _this._isPreloadEnd = false;
        _this._isSplashTimeout = false;
        return _this;
    }
    SplashScreen.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.stage.frameRate = 30;
        var assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
        GameConf.Instance.Init();
        this.createView();
    };
    SplashScreen.prototype.onConfigComplete = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        // load skin theme configuration file, you can manually modify the file. And replace the default skin.
        //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
        var theme = new eui.Theme("resource/default.thm.json", this.stage);
        theme.addEventListener(eui.UIEvent.COMPLETE, this.onThemeLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.loadGroup("MainScreen");
    };
    SplashScreen.prototype.onThemeLoadComplete = function () {
        this._isThemeLoadEnd = true;
        this.doSplashEnd();
    };
    SplashScreen.prototype.onResourceLoadComplete = function (event) {
        if (event.groupName == "MainScreen") {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            this._isPreloadEnd = true;
            this.doSplashEnd();
        }
    };
    SplashScreen.prototype.onResourceLoadError = function (event) {
        console.warn("Group: " + event.groupName + " has failed.");
        this.onResourceLoadComplete(event);
    };
    SplashScreen.prototype.doSplashEnd = function () {
        if (this._isPreloadEnd &&
            this._isSplashTimeout &&
            this._isThemeLoadEnd) {
            var screen_1 = new MainScreen();
            this.stage.addChild(screen_1);
            this.stage.removeChild(this);
        }
    };
    SplashScreen.prototype.createView = function () {
        var thisObject = this;
        function onComplete(data, url) {
            if (url == SplashScreen.BG_IMAGE) {
                var bg = new egret.Bitmap();
                var stageWidth = thisObject.stage.stageWidth;
                var stageHeight = thisObject.stage.stageHeight;
                bg.texture = data;
                var imageWidth = bg.texture.textureWidth;
                var imageHeight = bg.texture.textureHeight;
                if (imageWidth > imageHeight) {
                    bg.width = stageWidth;
                    bg.height = imageHeight * stageWidth / imageWidth;
                    bg.y = (stageHeight - bg.height) / 2;
                }
                else {
                    bg.width = imageWidth * stageHeight / imageHeight;
                    bg.height = stageHeight;
                    bg.x = (stageWidth - bg.width) / 2;
                }
                thisObject.addChild(bg);
                var t = new egret.Timer(2000, 1);
                t.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.onTimerComplete, this);
                thisObject.mSplashTimer = t;
                thisObject.mSplashTimer.start();
            }
        }
        ;
        RES.getResByUrl(SplashScreen.BG_IMAGE, onComplete, this);
    };
    SplashScreen.prototype.onTimerComplete = function (event) {
        this.mSplashTimer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.onTimerComplete, this);
        this.mSplashTimer.stop();
        this.mSplashTimer = null;
        this._isSplashTimeout = true;
        this.doSplashEnd();
    };
    SplashScreen.BG_IMAGE = "resource/assets/logo_960.jpg";
    return SplashScreen;
}(eui.UILayer));
__reflect(SplashScreen.prototype, "SplashScreen");
