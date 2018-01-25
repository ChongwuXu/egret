var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var RewardConfig = (function () {
    function RewardConfig(xml) {
        this._id = 0;
        this._name = "";
        this._desc = "";
        this._rewardSkin = "";
        this._rate = 0;
        this._score = 0;
        this.init(xml);
    }
    Object.defineProperty(RewardConfig.prototype, "Id", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RewardConfig.prototype, "Name", {
        get: function () {
            return this._name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RewardConfig.prototype, "Description", {
        get: function () {
            return this._desc;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RewardConfig.prototype, "RewardSkinName", {
        get: function () {
            return this._rewardSkin;
        },
        enumerable: true,
        configurable: true
    });
    RewardConfig.prototype.init = function (xml) {
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
                this._rewardSkin = text.text;
            else if (cidx == 4)
                this._rate = Number(text.text);
            else if (cidx == 5)
                this._score = Number(text.text);
        }
    };
    return RewardConfig;
}());
__reflect(RewardConfig.prototype, "RewardConfig");
