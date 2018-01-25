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
var GamePlayGroup = (function (_super) {
    __extends(GamePlayGroup, _super);
    function GamePlayGroup() {
        var _this = _super.call(this) || this;
        _this.skinName = skins.GamePlaySkin;
        return _this;
    }
    GamePlayGroup.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        if (this.origAvatar1 != null) {
            this.origAvatar1.$setVisible(false);
        }
        if (this.origAvatar2 != null) {
            this.origAvatar2.$setVisible(false);
        }
    };
    return GamePlayGroup;
}(eui.Component));
__reflect(GamePlayGroup.prototype, "GamePlayGroup");
