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
// TypeScript file
var UITest = (function (_super) {
    __extends(UITest, _super);
    function UITest() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddedToStage, _this);
        return _this;
    }
    UITest.prototype.onAddedToStage = function (event) {
        // this.initHSlider();
        // this.initProgressBar();
        this.initBution();
    };
    UITest.prototype.initBution = function () {
        var btn = new eui.Button();
        btn.x = 100;
        btn.y = 100;
        btn.width = 200;
        btn.height = 100;
        btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.addChild(btn);
    };
    UITest.prototype.onClick = function (event) {
        var sdk = new WochengSDK();
        sdk.doCheckNetwork(function (resultCode) {
            console.log("####:" + resultCode);
        });
    };
    UITest.prototype.initProgressBar = function () {
        this.pBar = new eui.ProgressBar();
        this.pBar.maximum = 210;
        this.pBar.minimum = 0;
        this.pBar.width = 200;
        this.pBar.height = 20;
        this.pBar.x = 200;
        this.pBar.y = 200;
        this.addChild(this.pBar);
        this.pBar.value = 42;
        var timer = new egret.Timer(10, 0);
        timer.addEventListener(egret.TimerEvent.TIMER, this.timerHandler, this);
        timer.start();
    };
    UITest.prototype.timerHandler = function (event) {
        this.pBar.value += 1;
        if (this.pBar.value >= 210) {
            this.pBar.value = 0;
        }
    };
    UITest.prototype.initHSlider = function () {
        var hSlider = new eui.HSlider();
        hSlider.width = 200;
        hSlider.x = 20;
        hSlider.y = 20;
        hSlider.minimum = 0;
        hSlider.maximum = 100;
        hSlider.value = 10;
        hSlider.addEventListener(eui.UIEvent.CHANGE, this.changeHandler, this);
        this.addChild(hSlider);
    };
    UITest.prototype.changeHandler = function (event) {
        console.log(event.target.value);
    };
    return UITest;
}(egret.DisplayObjectContainer));
__reflect(UITest.prototype, "UITest");
//# sourceMappingURL=UITest.js.map