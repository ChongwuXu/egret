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
var ButtonBegin = (function (_super) {
    __extends(ButtonBegin, _super);
    function ButtonBegin() {
        var _this = _super.call(this) || this;
        _this._timer = null;
        _this._frame = 0;
        return _this;
    }
    ButtonBegin.prototype.Dispose = function () {
        if (this._timer != null) {
            this._timer.stop();
            this._timer = null;
        }
    };
    ButtonBegin.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this._timer = new egret.Timer(500, 0);
        this._timer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
        this._timer.start();
    };
    ButtonBegin.prototype.onTimer = function (event) {
        var v = (this._frame % 2 == 0);
        this.bgImage.$setVisible(v);
        this.bgImage0.$setVisible(!v);
        this._frame++;
    };
    return ButtonBegin;
}(eui.Button));
__reflect(ButtonBegin.prototype, "ButtonBegin");
