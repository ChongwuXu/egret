var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var AvatarConfig = (function () {
    function AvatarConfig(xml) {
        this._name = "";
        this._avatarSkin = "";
        this._desc = "";
        this._id = 0;
        this.init(xml);
    }
    Object.defineProperty(AvatarConfig.prototype, "Name", {
        get: function () {
            return this._name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AvatarConfig.prototype, "Id", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AvatarConfig.prototype, "SkinName", {
        get: function () {
            return this._avatarSkin;
        },
        enumerable: true,
        configurable: true
    });
    AvatarConfig.prototype.init = function (xml) {
        if (xml == null)
            return;
        var cidx = 0;
        for (var i = 0; i < xml.children.length; ++i) {
            var cell = xml.children[i];
            var data = cell.children[0];
            var text = data.children[0];
            var cellIndex = cell["$ss:Index"];
            if (cellIndex != undefined && cellIndex != null) {
                cidx = Number(cellIndex);
            }
            else
                cidx += 1;
            if (cidx == 1)
                this._id = Number(text.text);
            else if (cidx == 2)
                this._name = text.text;
            else if (cidx == 3)
                this._desc = text.text;
            else if (cidx == 4)
                this._avatarSkin = text.text;
        }
    };
    return AvatarConfig;
}());
__reflect(AvatarConfig.prototype, "AvatarConfig");
