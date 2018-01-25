var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameArraw = (function () {
    function GameArraw(speed) {
        this._arrowState = 0;
        this._stateFrames = 0;
        this._speed = 250;
        this._deltaSpeed = 0;
        this.ARROW_BEGIN_POS = -682;
        this.ARROW_END_POS = -232;
        this._catchAvatar = null;
        this._speed = speed;
    }
    GameArraw.prototype.Dispose = function () {
        if (this._gamePlay != null) {
            this._gamePlay = null;
        }
    };
    GameArraw.prototype.Init = function (gamePlay) {
        this._gamePlay = gamePlay;
        this._arrow = this._gamePlay.grpArraw;
        this._arrowArea = this._gamePlay.arrawArea;
        this._imgArrows = [gamePlay.arraw1, gamePlay.arraw2, gamePlay.arraw3];
        this._arrow.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onArray, this);
        this._arrow.addEventListener(GameArraw.ARROW_TOUCH_EVENT, this.onArrayCatch, this);
    };
    GameArraw.prototype.doArrowState = function (state) {
        switch (state) {
            case 0:
                {
                    this._imgArrows[0].visible = true;
                    this._imgArrows[1].visible = false;
                    this._imgArrows[2].visible = false;
                    this._arrow.y = this.ARROW_BEGIN_POS;
                }
                break;
            case 1:
                {
                    this._imgArrows[0].visible = true;
                    this._imgArrows[1].visible = false;
                    this._imgArrows[2].visible = false;
                    this._arrow.y = this.ARROW_BEGIN_POS;
                }
                break;
            case 2:
                this._imgArrows[0].visible = false;
                this._imgArrows[1].visible = true;
                this._imgArrows[2].visible = false;
                break;
        }
        this._arrowState = state;
        this._stateFrames = 0;
        this._arrow.dispatchEvent(new egret.Event(GameArraw.ARROW_STATE_EVENT, false, false, state));
    };
    GameArraw.prototype.simulateCatch = function () {
        var simulateFrames = 0;
        var doSimulate = true;
        this._arrow.y = this.ARROW_BEGIN_POS;
        var upAvatars = this._gamePlay.grpUpPanel.$children;
        var downAvatars = this._gamePlay.grpDownPanel.$children;
        var checkUpAvatars = [];
        var checkDownAvatars = [];
        for (var i = 0; i < upAvatars.length; ++i) {
            if (upAvatars[i].x > 556 || upAvatars[i].x < 226) {
                continue;
            }
            if (upAvatars[i].visible)
                checkUpAvatars.push(upAvatars[i]);
        }
        for (var i = 0; i < downAvatars.length; ++i) {
            if (downAvatars[i].x > 556 || downAvatars[i].x < 226) {
                continue;
            }
            if (downAvatars[i].visible)
                checkDownAvatars.push(downAvatars[i]);
        }
        var t = GameConf.Instance.GetLineById(0);
        var upSpeed = t != null ? t.Speed : 0;
        t = GameConf.Instance.GetLineById(1);
        var downSpeed = t != null ? t.Speed : 0;
        this._deltaSpeed = 0;
        while (doSimulate) {
            for (var i = 0; i < checkUpAvatars.length; ++i) {
                checkUpAvatars[i].x += upSpeed * GameConf.FIXED_DELTA_TIME;
            }
            for (var i = 0; i < checkDownAvatars.length; ++i) {
                checkDownAvatars[i].x += downSpeed * GameConf.FIXED_DELTA_TIME;
            }
            if (simulateFrames > 25) {
                if (this._arrow.y >= this.ARROW_END_POS) {
                    doSimulate = false;
                }
                else {
                    var arrowArea = this._gamePlay.arrawArea;
                    var gpos = this._gamePlay.grpArraw.localToGlobal(arrowArea.x, arrowArea.y);
                    var rect = new egret.Rectangle(gpos.x, gpos.y, arrowArea.width, arrowArea.height);
                    for (var i = 0; i < checkUpAvatars.length; ++i) {
                        var apos = checkUpAvatars[i].localToGlobal(checkUpAvatars[i].area.x, checkUpAvatars[i].area.y);
                        var arect = new egret.Rectangle(apos.x, apos.y, checkUpAvatars[i].area.width, checkUpAvatars[i].area.height);
                        if (rect.intersects(arect)) {
                            egret.log("Hello rect: " + simulateFrames + "arrow: " + this._arrow.y + " --: " + rect.topLeft + " arect:" + arect.topLeft);
                            doSimulate = false;
                            if (rect.x < arect.x)
                                this._deltaSpeed = -(64 * 60 / (simulateFrames - 24) + Math.random() * 16);
                            else
                                this._deltaSpeed = (64 * 60 / (simulateFrames - 24) + Math.random() * 16);
                        }
                    }
                    for (var i = 0; i < checkDownAvatars.length; ++i) {
                        var apos = checkDownAvatars[i].localToGlobal(checkDownAvatars[i].area.x, checkDownAvatars[i].area.y);
                        var arect = new egret.Rectangle(apos.x, apos.y, checkDownAvatars[i].area.width, checkDownAvatars[i].area.height);
                        if (rect.intersects(arect)) {
                            doSimulate = false;
                            if (rect.x < arect.x)
                                this._deltaSpeed = -(64 * 60 / (simulateFrames - 24) + Math.random() * 16);
                            else
                                this._deltaSpeed = (64 * 60 / (simulateFrames - 24) + Math.random() * 16);
                        }
                    }
                }
                this._arrow.y += GameConf.FIXED_DELTA_TIME * this._speed;
            }
            simulateFrames++;
        }
    };
    GameArraw.prototype.FixedUpdate = function () {
        switch (this._arrowState) {
            case 0:
                {
                }
                break;
            case 1:
                {
                    if (this._stateFrames == 10) {
                        this._imgArrows[0].visible = false;
                        this._imgArrows[1].visible = true;
                    }
                    else if (this._stateFrames == 20) {
                        this._imgArrows[1].visible = false;
                        this._imgArrows[2].visible = true;
                    }
                    else if (this._stateFrames > 25) {
                        this._arrow.y += GameConf.FIXED_DELTA_TIME * (this._speed + this._deltaSpeed);
                        if (this._arrow.y >= this.ARROW_END_POS) {
                            this._arrow.y = this.ARROW_END_POS;
                            this.doArrowState(2);
                            return;
                        }
                    }
                }
                break;
            case 2:
                {
                    if (this._stateFrames == 0) {
                        this._imgArrows[2].visible = false;
                        this._imgArrows[1].visible = true;
                    }
                    if (this._stateFrames >= 30) {
                        this._arrow.y -= GameConf.FIXED_DELTA_TIME * this._speed;
                        if (this._catchAvatar != null) {
                            this._catchAvatar.y -= GameConf.FIXED_DELTA_TIME * this._speed;
                        }
                        if (this._arrow.y <= this.ARROW_BEGIN_POS) {
                            this._arrow.y = this.ARROW_BEGIN_POS;
                            this.doArrowState(0);
                            if (this._catchAvatar != null) {
                                this._arrow.dispatchEvent(new egret.Event(GameArraw.ARROW_REWARD_EVENT, false, false));
                                this._catchAvatar.x = this._avatarOrigPos.x;
                                this._catchAvatar.y = this._avatarOrigPos.y;
                                this._catchAvatar.isPause = false;
                                this._catchAvatar = null;
                            }
                            return;
                        }
                    }
                }
                break;
        }
        this._stateFrames++;
        // egret.log("Hello arrow: " + this._arrow.y);
    };
    GameArraw.prototype.Update = function (delta) {
    };
    GameArraw.prototype.onArray = function (evt) {
        if (this._arrowState == 0) {
            //this.simulateCatch();
            this.doArrowState(1);
        }
    };
    GameArraw.prototype.onArrayCatch = function (evt) {
        this._catchAvatar = evt.data;
        if (this._catchAvatar != null) {
            egret.log("Hello frame: " + this._stateFrames + " arrow: " + this._arrow.y);
            this._avatarOrigPos = new egret.Point(this._catchAvatar.x, this._catchAvatar.y);
            var areaPos = this._arrow.localToGlobal(this._arrowArea.x, this._arrowArea.y);
            var avatarAreaPos = this._catchAvatar.globalToLocal(areaPos.x, areaPos.y);
            var toPos = new egret.Point();
            toPos.x = this._avatarOrigPos.x + avatarAreaPos.x - this._catchAvatar.area.x;
            toPos.y = this._avatarOrigPos.y + avatarAreaPos.y - this._catchAvatar.area.y;
            this._catchAvatar.x = toPos.x;
            this._catchAvatar.y = toPos.y;
            this._catchAvatar.isPause = true;
            this.doArrowState(2);
        }
    };
    GameArraw.ARROW_STATE_EVENT = "arrow_state_changed";
    GameArraw.ARROW_TOUCH_EVENT = "arrow_catch_state";
    GameArraw.ARROW_REWARD_EVENT = "arrow_get_reward";
    return GameArraw;
}());
__reflect(GameArraw.prototype, "GameArraw");
