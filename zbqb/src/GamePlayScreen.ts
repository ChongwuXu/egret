class GamePlayScreen extends eui.UILayer {
    public constructor() {
		super();
	}

	private _gameGrp:GamePlayGroup;

	private _lineUp:AvatarLoopLine = null;
	private _lineDown:AvatarLoopLine = null;

	private _arrow:GameArraw = null;

	protected createChildren():void {
		super.createChildren();

		this.createView();
	}

	private createView():void {
		this.stage.frameRate = 30;

        this._gameGrp = new GamePlayGroup();

		let stageWidth = this.stage.stageWidth;
		let stageHeight = this.stage.stageHeight;

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
		egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin
			context.onUpdate = () => {
				this.Update();
			};
        });
    }

	private FixedUpdate():void{
		this._lineUp.FixedUpdate();
		this._lineDown.FixedUpdate();
		this._arrow.FixedUpdate();
	}

	private _fixedTime:number = 0;
	private _updateTime:number = 0;
	private _frames:number = 0;
	private Update():void {
		// this._frames++;
		// if(this._frames % 2 == 1) return;

		let curUpdateTime:number = egret.getTimer() / 1000;
		let delta:number = curUpdateTime - this._updateTime;
		this._updateTime = curUpdateTime;

		//egret.log("Hello delta: " + delta);
		for(let t = this._fixedTime; t < this._updateTime; t += GameConf.FIXED_DELTA_TIME)
		{
			this.FixedUpdate();
			this._fixedTime += GameConf.FIXED_DELTA_TIME;
		}

		this._lineUp.Update(delta);
		this._lineDown.Update(delta);
		this._arrow.Update(delta);
	}

	private _rewardPage:GameRewardGroup;
	private onGetReward(evt:egret.Event):void {
		if(this._rewardPage == null)
		{
			this._rewardPage = new GameRewardGroup();
			let stageWidth = this.stage.stageWidth;
			let stageHeight = this.stage.stageHeight;

			this._rewardPage.x = (stageWidth - this._rewardPage.width) / 2;
			this._rewardPage.y = (stageHeight - this._rewardPage.height) / 2;

			this._rewardPage.btnplay.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickPlayAgain, this);
		}

		this.addChild(this._rewardPage);

		let reward:RewardConfig = GameConf.Instance.GetRewardById(GameConf.Instance.RewardId);
		if(reward != null)
		{
			this._rewardPage.labItemName.text = reward.Name;
			this._rewardPage.labDesc.text = reward.Description;
		}
	}

	private onClickPlayAgain(evt:egret.TouchEvent):void {
		if(this._rewardPage != null)
		{
			this.removeChild(this._rewardPage);
		}
	}
}