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
var GamePlayScreen = (function (_super) {
    __extends(GamePlayScreen, _super);
    function GamePlayScreen() {
        var _this = _super.call(this) || this;
        _this._lineUp = null;
        _this._lineDown = null;
        _this._arrow = null;
        _this._fixedTime = 0;
        _this._updateTime = 0;
        _this._frames = 0;
        return _this;
    }
    GamePlayScreen.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.createView();
    };
    GamePlayScreen.prototype.createView = function () {
        var _this = this;
        this.stage.frameRate = 30;
        this._gameGrp = new GamePlayGroup();
        var stageWidth = this.stage.stageWidth;
        var stageHeight = this.stage.stageHeight;
        this._gameGrp.width = 1280;
        this._gameGrp.height = 960;
        this._gameGrp.scaleX = stageWidth / this._gameGrp.width;
        this._gameGrp.scaleY = this._gameGrp.scaleX;
        this._gameGrp.y = (stageHeight * this._gameGrp.scaleX - this._gameGrp.height) / 2;
        this.addChild(this._gameGrp);
        this._lineUp = new AvatarLoopLine(0);
        this._lineUp.Init(GameConf.Instance.GetLine(0), this._gameGrp);
        this._lineDown = new AvatarLoopLine(1);
        this._lineDown.Init(GameConf.Instance.GetLine(1), this._gameGrp);
        this._arrow = new GameArraw(350);
        this._arrow.Init(this._gameGrp);
        this._gameGrp.grpArraw.addEventListener(GameArraw.ARROW_REWARD_EVENT, this.onGetReward, this);
        this._fixedTime = egret.getTimer() / 1000;
        this._updateTime = this._fixedTime;
        egret.lifecycle.addLifecycleListener(function (context) {
            // custom lifecycle plugin
            context.onUpdate = function () {
                _this.Update();
            };
        });
    };
    GamePlayScreen.prototype.FixedUpdate = function () {
        this._lineUp.FixedUpdate();
        this._lineDown.FixedUpdate();
        this._arrow.FixedUpdate();
    };
    GamePlayScreen.prototype.Update = function () {
        // this._frames++;
        // if(this._frames % 2 == 1) return;
        var curUpdateTime = egret.getTimer() / 1000;
        var delta = curUpdateTime - this._updateTime;
        this._updateTime = curUpdateTime;
        //egret.log("Hello delta: " + delta);
        for (var t = this._fixedTime; t < this._updateTime; t += GameConf.FIXED_DELTA_TIME) {
            this.FixedUpdate();
            this._fixedTime += GameConf.FIXED_DELTA_TIME;
        }
        this._lineUp.Update(delta);
        this._lineDown.Update(delta);
        this._arrow.Update(delta);
    };
    GamePlayScreen.prototype.onGetReward = function (evt) {
        if (this._rewardPage == null) {
            this._rewardPage = new GameRewardGroup();
            var stageWidth = this.stage.stageWidth;
            var stageHeight = this.stage.stageHeight;
            this._rewardPage.x = (stageWidth - this._rewardPage.width) / 2;
            this._rewardPage.y = (stageHeight - this._rewardPage.height) / 2;
            this._rewardPage.btnplay.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickPlayAgain, this);
        }
        this.addChild(this._rewardPage);
        var reward = GameConf.Instance.GetRewardById(GameConf.Instance.RewardId);
        if (reward != null) {
            this._rewardPage.labItemName.text = reward.Name;
            this._rewardPage.labDesc.text = reward.Description;
        }
    };
    GamePlayScreen.prototype.onClickPlayAgain = function (evt) {
        if (this._rewardPage != null) {
            this.removeChild(this._rewardPage);
        }
    };
    return GamePlayScreen;
}(eui.UILayer));
__reflect(GamePlayScreen.prototype, "GamePlayScreen");
