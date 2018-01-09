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
var TimerTest = (function (_super) {
    __extends(TimerTest, _super);
    function TimerTest() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    TimerTest.prototype.onAddToStage = function (event) {
        this.timeText = new egret.TextField();
        this.timeText.width = 200;
        this.timeText.height = 100;
        this.timeText.x = this.stage.width / 2 - 100;
        this.timeText.y = this.stage.height / 2 - 50;
        this.addChild(this.timeText);
        this.startBtn = new eui.Button();
        this.startBtn.label = "开始";
        this.startBtn.width = 100;
        this.startBtn.height = 50;
        this.startBtn.x = this.stage.width / 3 - 50;
        this.startBtn.y = this.stage.height / 3 * 2 - 25;
        this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.startClick, this);
        this.addChild(this.startBtn);
        this.resetBtn = new eui.Button();
        this.resetBtn.label = "重置";
        this.resetBtn.width = 100;
        this.resetBtn.height = 50;
        this.resetBtn.x = this.stage.width / 2 - 50;
        this.resetBtn.y = this.stage.height / 3 * 2 - 25;
        this.resetBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.resetClick, this);
        this.addChild(this.resetBtn);
        this.stopBtn = new eui.Button();
        this.stopBtn.label = "停止";
        this.stopBtn.width = 100;
        this.stopBtn.height = 50;
        this.stopBtn.x = this.stage.width / 3 * 2 - 50;
        this.stopBtn.y = this.stage.height / 3 * 2 - 25;
        this.stopBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.stopClick, this);
        this.addChild(this.stopBtn);
        this.times = 0;
        this.timer = new egret.Timer(1000);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
        this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timerComFunc, this);
    };
    TimerTest.prototype.timerFunc = function () {
        this.times += 1;
        this.timeText.text = "times:" + this.times;
    };
    TimerTest.prototype.startClick = function (event) {
        this.timer.start();
    };
    TimerTest.prototype.resetClick = function (event) {
        this.timer.reset();
    };
    TimerTest.prototype.stopClick = function (event) {
        this.timer.stop();
    };
    TimerTest.prototype.timerComFunc = function () {
        this.times = 0;
    };
    return TimerTest;
}(egret.DisplayObjectContainer));
__reflect(TimerTest.prototype, "TimerTest");
//# sourceMappingURL=TimerTest.js.map