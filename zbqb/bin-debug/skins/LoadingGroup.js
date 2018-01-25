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
var LoadingGroup = (function (_super) {
    __extends(LoadingGroup, _super);
    function LoadingGroup() {
        var _this = _super.call(this) || this;
        _this._frame = 0;
        _this.skinName = skins.LoadingSkin;
        return _this;
    }
    LoadingGroup.prototype.Dispose = function () {
        if (this._timer != null) {
            this._timer.stop();
            this._timer.removeEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
            this._timer = null;
        }
    };
    LoadingGroup.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this._timer = new egret.Timer(500, 0);
        this._timer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
        this._timer.start();
    };
    LoadingGroup.prototype.onTimer = function (evt) {
        var y = this._frame % 4;
        this.load_1.$setVisible(y == 0);
        this.load_2.$setVisible(y == 1);
        this.load_3.$setVisible(y == 2);
        this.load_4.$setVisible(y == 3);
        this.load_j_1.$setVisible(y == 0 || y == 2);
        this.load_j_2.$setVisible(y == 1 || y == 3);
        this._frame++;
    };
    return LoadingGroup;
}(eui.Component));
__reflect(LoadingGroup.prototype, "LoadingGroup");
