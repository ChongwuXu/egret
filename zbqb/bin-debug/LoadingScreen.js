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
var LoadingScreen = (function (_super) {
    __extends(LoadingScreen, _super);
    function LoadingScreen() {
        return _super.call(this) || this;
    }
    LoadingScreen.prototype.Dispose = function () {
        if (this._grpLoading != null) {
            this.removeChild(this._grpLoading);
            this._grpLoading.Dispose();
            this._grpLoading = null;
        }
    };
    LoadingScreen.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this._grpLoading = new LoadingGroup();
        var stageWidth = this.stage.stageWidth;
        var stageHeight = this.stage.stageHeight;
        this._grpLoading.width = 1280;
        this._grpLoading.height = 960;
        this._grpLoading.scaleX = stageWidth / this._grpLoading.width;
        this._grpLoading.scaleY = this._grpLoading.scaleX;
        this._grpLoading.y = (stageHeight * this._grpLoading.scaleX - this._grpLoading.height) / 2;
        this.addChild(this._grpLoading);
    };
    return LoadingScreen;
}(eui.UILayer));
__reflect(LoadingScreen.prototype, "LoadingScreen");
