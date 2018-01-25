var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var AvatarLoopLineConfig = (function () {
    function AvatarLoopLineConfig(xml) {
        this._id = 0;
        this._items = [];
        this._interval = [];
        this._length = 0;
        this._speed = 465;
        this.init(xml);
    }
    Object.defineProperty(AvatarLoopLineConfig.prototype, "Id", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AvatarLoopLineConfig.prototype, "Items", {
        get: function () {
            return this._items;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AvatarLoopLineConfig.prototype, "IntervalRange", {
        get: function () {
            return this._interval;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AvatarLoopLineConfig.prototype, "Lenght", {
        get: function () {
            return this._length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AvatarLoopLineConfig.prototype, "Speed", {
        get: function () {
            return this._speed;
        },
        enumerable: true,
        configurable: true
    });
    AvatarLoopLineConfig.prototype.init = function (xml) {
        if (xml == undefined || xml == null)
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
            else if (cidx == 2) {
                this._items = JSON.parse(text.text);
            }
            else if (cidx == 4) {
                this._interval = JSON.parse(text.text);
            }
            else if (cidx == 5)
                this._length = Number(text.text);
            else if (cidx == 6)
                this._speed = Number(text.text);
        }
    };
    AvatarLoopLineConfig.prototype.parseBelt = function (xml) {
        if (xml == undefined || xml == null)
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
            if (cidx == 2)
                this._speed = Number(text.text);
        }
    };
    return AvatarLoopLineConfig;
}());
__reflect(AvatarLoopLineConfig.prototype, "AvatarLoopLineConfig");
