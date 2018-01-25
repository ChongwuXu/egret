var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameConf = (function () {
    function GameConf() {
        this._avatarConfigs = [];
        this._rewardConfigs = [];
        this._lineConfigs = [];
        this._avatarPool = {};
    }
    Object.defineProperty(GameConf, "Instance", {
        get: function () {
            if (GameConf._instance == null) {
                GameConf._instance = new GameConf();
            }
            return GameConf._instance;
        },
        enumerable: true,
        configurable: true
    });
    GameConf.prototype.Init = function () {
        RES.getResByUrl("resource/config/TV_doll.xml", this.onXmlLoaded, this, RES.ResourceItem.TYPE_XML);
    };
    GameConf.prototype.onXmlLoaded = function (data, url) {
        var xml = data;
        for (var i = 0; i < xml.children.length; ++i) {
            var xmlNode = xml.children[i];
            if (xmlNode.name == "Worksheet") {
                var sheet = xmlNode["$ss:Name"];
                if (sheet == "avartar") {
                    this.processXmlAvatar(xmlNode);
                }
                else if (sheet == "reward") {
                    this.processXmlReward(xmlNode);
                }
                else if (sheet == "array") {
                    this.processXmlArray(xmlNode);
                }
                else if (sheet == "belt") {
                    this.processXmlBelt(xmlNode);
                }
            }
        }
    };
    GameConf.prototype.getChildByName = function (name, xml) {
        for (var i = 0; i < xml.children.length; ++i) {
            var xmlNode = xml.children[i];
            if (xmlNode.name == name)
                return xmlNode;
        }
        return null;
    };
    GameConf.prototype.processXmlAvatar = function (xmlNode) {
        var table = this.getChildByName("Table", xmlNode);
        if (table != null) {
            var rowIndex = 0;
            for (var t = 0; t < table.children.length; ++t) {
                var row = table.children[t];
                if (row.name == "Row") {
                    if (rowIndex > 0) {
                        var avConf = new AvatarConfig(row);
                        this._avatarConfigs.push(avConf);
                    }
                    rowIndex++;
                }
            }
        }
    };
    GameConf.prototype.processXmlReward = function (xmlNode) {
        var table = this.getChildByName("Table", xmlNode);
        if (table != null) {
            var rowIndex = 0;
            for (var t = 0; t < table.children.length; ++t) {
                var row = table.children[t];
                if (row.name == "Row") {
                    if (rowIndex > 0) {
                        var avConf = new RewardConfig(row);
                        this._rewardConfigs.push(avConf);
                    }
                    rowIndex++;
                }
            }
        }
    };
    GameConf.prototype.processXmlArray = function (xmlNode) {
        var table = this.getChildByName("Table", xmlNode);
        if (table != null) {
            var rowIndex = 0;
            for (var t = 0; t < table.children.length; ++t) {
                var row = table.children[t];
                if (row.name == "Row") {
                    if (rowIndex > 0) {
                        var avConf = new AvatarLoopLineConfig(row);
                        this._lineConfigs.push(avConf);
                    }
                    rowIndex++;
                }
            }
        }
    };
    GameConf.prototype.processXmlBelt = function (xmlNode) {
        var table = this.getChildByName("Table", xmlNode);
        if (table != null) {
            var rowIndex = 0;
            for (var t = 0; t < table.children.length; ++t) {
                var row = table.children[t];
                if (row.name == "Row") {
                    if (rowIndex > 0) {
                        var avConf = this._lineConfigs[rowIndex - 1];
                        avConf.parseBelt(row);
                    }
                    rowIndex++;
                }
            }
        }
    };
    GameConf.prototype.GetRewardById = function (id) {
        for (var i = 0; i < this._rewardConfigs.length; ++i) {
            if (this._rewardConfigs[i].Id == id)
                return this._rewardConfigs[i];
        }
        return null;
    };
    GameConf.prototype.GetAvatarById = function (id) {
        for (var i = 0; i < this._avatarConfigs.length; ++i) {
            if (this._avatarConfigs[i].Id == id)
                return this._avatarConfigs[i];
        }
        return null;
    };
    GameConf.prototype.GetLineById = function (id) {
        for (var i = 0; i < this._lineConfigs.length; ++i) {
            if (this._lineConfigs[i].Id == id)
                return this._lineConfigs[i];
        }
        return null;
    };
    GameConf.prototype.GetLine = function (id) {
        var line = [];
        for (var i = 0; i < this._lineConfigs.length; ++i) {
            if (this._lineConfigs[i].Id == id) {
                var lineConf = this._lineConfigs[i];
                var x = -(id * 165 + Math.floor(Math.random() * 165));
                for (var idx = 0; idx < lineConf.Lenght; ++idx) {
                    var itemIdx = Math.floor(Math.random() * lineConf.Items.length);
                    var interval = lineConf.IntervalRange[0] + Math.floor(Math.random() * (lineConf.IntervalRange[1] - lineConf.IntervalRange[0]));
                    var item = new AvatarLoopLineItem();
                    item.AvatarId = lineConf.Items[itemIdx][0];
                    item.RewardId = lineConf.Items[itemIdx][1];
                    item.Interval = interval;
                    if (idx == 0)
                        x -= 165;
                    else
                        x -= 165 + interval;
                    item.x = x;
                    line.push(item);
                }
            }
        }
        return line;
    };
    GameConf.prototype.Push = function (avatar) {
        var avatars = this._avatarPool[avatar.skinName];
        if (avatars == undefined) {
            avatars = [];
            this._avatarPool[avatar.skinName] = avatars;
        }
        avatars.push(avatar);
    };
    GameConf.prototype.Pop = function (skin) {
        var avatars = this._avatarPool[skin];
        if (avatars == undefined) {
            return Avatar.createAvatar(skin);
        }
        if (avatars.length > 0)
            return avatars.pop();
        return Avatar.createAvatar(skin);
    };
    GameConf.FIXED_DELTA_TIME = 1 / 60;
    GameConf._instance = null;
    return GameConf;
}());
__reflect(GameConf.prototype, "GameConf");
