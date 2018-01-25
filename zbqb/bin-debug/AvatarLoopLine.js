var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var AvatarLoopLine = (function () {
    function AvatarLoopLine(layer) {
        this._fixedDelta = 1 / 60;
        this._layer = 0;
        this._speed = 165;
        this._avatars = null;
        this._lineConfig = null;
        this._gamePlay = null;
        this._curAvatarIdxInShow = 0;
        this._curAvatarGrp = null;
        this._isPause = false;
        this._isValid = false;
        this._arrawState = 0;
        this._layer = layer;
    }
    AvatarLoopLine.prototype.Dispose = function () {
        if (this._gamePlay != null) {
            this._gamePlay.grpArraw.removeEventListener(GameArraw.ARROW_STATE_EVENT, this.onArrawState, this);
            this._gamePlay = null;
        }
    };
    Object.defineProperty(AvatarLoopLine.prototype, "speed", {
        get: function () {
            return this._speed;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AvatarLoopLine.prototype, "avatars", {
        get: function () {
            return this._avatars;
        },
        enumerable: true,
        configurable: true
    });
    AvatarLoopLine.prototype.Init = function (config, gamePlay) {
        this._isValid = config != null && config.length > 0;
        this._lineConfig = config;
        this._gamePlay = gamePlay;
        var avatar_length = 5;
        if (config.length < avatar_length) {
            avatar_length = config.length;
        }
        var grpAvatar = gamePlay.grpDownPanel;
        var origAvatar = gamePlay.origAvatar1;
        if (this._layer == 0) {
            grpAvatar = gamePlay.grpUpPanel;
            origAvatar = gamePlay.origAvatar2;
        }
        grpAvatar.visible = false;
        if (!this._isValid)
            return;
        grpAvatar.visible = true;
        this._gamePlay.grpArraw.addEventListener(GameArraw.ARROW_STATE_EVENT, this.onArrawState, this);
        var lineConf = GameConf.Instance.GetLineById(this._layer);
        this._speed = lineConf.Speed;
        this._curAvatarGrp = grpAvatar;
        this._avatars = [];
        this._curAvatarIdxInShow = 0;
        for (var i = 0; i < avatar_length; ++i) {
            var conf = GameConf.Instance.GetAvatarById(config[i].AvatarId);
            var avatar = GameConf.Instance.Pop(conf.SkinName);
            grpAvatar.addChild(avatar);
            avatar.y = origAvatar.y;
            avatar.x = config[i].x;
            this._avatars.push(avatar);
        }
        // this._isPause = true;
        // this.doTween();
    };
    AvatarLoopLine.prototype.doTween = function () {
        var _this = this;
        this._avatars[0].x = 0;
        egret.Tween.get(this._avatars[0]).to({ x: 1280 }, 6500).call(function () {
            _this.doTween();
        }, this);
    };
    AvatarLoopLine.prototype.FixedUpdate = function () {
        this.UpdateAvatars(GameConf.FIXED_DELTA_TIME);
    };
    AvatarLoopLine.prototype.Update = function (delta) {
    };
    AvatarLoopLine.prototype.UpdateAvatars = function (delta) {
        if (this._isPause || !this._isValid)
            return;
        for (var i = 0; i < this._lineConfig.length; ++i) {
            this._lineConfig[i].x += delta * this._speed;
        }
        var lastIndex = this._curAvatarIdxInShow + this._avatars.length + 1;
        //! 5就是满屏的娃娃数量
        if (this._lineConfig.length <= 5) {
            lastIndex = this._curAvatarIdxInShow - 1;
            if (lastIndex < 0)
                lastIndex += this._lineConfig.length;
        }
        if (lastIndex >= this._lineConfig.length)
            lastIndex -= this._lineConfig.length;
        var lastItem = this._lineConfig[lastIndex];
        if (lastItem.x > -(lastItem.width + lastItem.Interval) && this._avatars.length < this._lineConfig.length) {
            var avConf = GameConf.Instance.GetAvatarById(lastItem.AvatarId);
            var av = GameConf.Instance.Pop(avConf.SkinName);
            if (av.parent != this._curAvatarGrp) {
                this._curAvatarGrp.addChild(av);
                av.y = this._avatars[0].y;
            }
            this._avatars.push(av);
        }
        var curItem = this._lineConfig[this._curAvatarIdxInShow];
        if (curItem.x > 1290) {
            var prevItem = null;
            var prevIndex = this._curAvatarIdxInShow - 1;
            if (prevIndex < 0)
                prevIndex = this._lineConfig.length - 1;
            prevItem = this._lineConfig[prevIndex];
            curItem.x = prevItem.x - curItem.width - curItem.Interval;
            if (curItem.x > -curItem.width - curItem.Interval)
                curItem.x = -curItem.width - curItem.Interval;
            this._curAvatarIdxInShow++;
            if (this._curAvatarIdxInShow >= this._lineConfig.length)
                this._curAvatarIdxInShow = 0;
            GameConf.Instance.Push(this._avatars.shift());
        }
        for (var i = 0; i < this._avatars.length; i++) {
            var curIndex = this._curAvatarIdxInShow + i;
            if (curIndex >= this._lineConfig.length)
                curIndex -= this._lineConfig.length;
            this._avatars[i].x = this._lineConfig[curIndex].x;
        }
        if (this._arrawState == 1) {
            var arrowArea = this._gamePlay.arrawArea;
            var gpos = this._gamePlay.grpArraw.localToGlobal(arrowArea.x, arrowArea.y);
            var rect = new egret.Rectangle(gpos.x, gpos.y, arrowArea.width, arrowArea.height);
            for (var i = 0; i < this._avatars.length; ++i) {
                var apos = this._avatars[i].localToGlobal(this._avatars[i].area.x, this._avatars[i].area.y);
                var arect = new egret.Rectangle(apos.x, apos.y, this._avatars[i].area.width, this._avatars[i].area.height);
                if (rect.intersects(arect)) {
                    var curIndex = this._curAvatarIdxInShow + i;
                    if (curIndex >= this._lineConfig.length)
                        curIndex -= this._lineConfig.length;
                    GameConf.Instance.RewardId = this._lineConfig[curIndex].RewardId;
                    this._gamePlay.grpArraw.dispatchEvent(new egret.Event(GameArraw.ARROW_TOUCH_EVENT, false, false, this._avatars[i]));
                }
            }
        }
    };
    AvatarLoopLine.prototype.onArrawState = function (evt) {
        this._arrawState = evt.data;
        if (this._arrawState == 2) {
            this._isPause = true;
        }
        else
            this._isPause = false;
    };
    return AvatarLoopLine;
}());
__reflect(AvatarLoopLine.prototype, "AvatarLoopLine");
