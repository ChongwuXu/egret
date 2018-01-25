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
var Avatar = (function (_super) {
    __extends(Avatar, _super);
    function Avatar(skin) {
        var _this = _super.call(this) || this;
        _this.isPause = false;
        _this._frame = 0;
        if (skin != null) {
            _this.skinName = skin;
        }
        else
            _this.createSkinName();
        return _this;
    }
    Avatar.createAvatar = function (skin) {
        var skin_name = skin.toLowerCase();
        var av = null;
        switch (skin_name) {
            case "g1":
                av = new Avatar(skins.AvatarG1Skin);
                break;
            case "ht1":
                av = new Avatar(skins.AvatarHt1Skin);
                break;
            case "j1":
                av = new Avatar(skins.AvatarJ1Skin);
                break;
            case "t1":
                av = new Avatar(skins.AvatarT1Skin);
                break;
            case "x1":
                av = new Avatar(skins.AvatarX1Skin);
                break;
            default:
                av = new Avatar();
                break;
        }
        return av;
    };
    Avatar.prototype.Dispose = function () {
        if (this._timer) {
            this._timer.stop();
            this._timer.removeEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
            this._timer = null;
        }
    };
    Avatar.prototype.createSkinName = function () {
        this.skinName = skins.AvatarSkin;
    };
    Avatar.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this._timer = new egret.Timer(500, 0);
        this._timer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
        this._timer.start();
    };
    Avatar.prototype.onTimer = function (evt) {
        if (this.isPause)
            return;
        var v = (this._frame % 2 == 0);
        this.avatar1.$setVisible(v);
        this.avatar2.$setVisible(!v);
        this._frame++;
    };
    Avatar.prototype.setAvatar = function (img1, img2) {
        this.avatar1.texture = RES.getRes(img1);
        this.avatar2.texture = RES.getRes(img2);
    };
    return Avatar;
}(eui.Component));
__reflect(Avatar.prototype, "Avatar");
