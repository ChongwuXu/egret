class MainScreen extends eui.UILayer {

	public constructor() {
		super();
	}

	protected createChildren():void {
		super.createChildren();

		this.createView();
	}

	private createView():void {

		let bg = RES.getRes("start_png");
        let bitmap : egret.Bitmap = new egret.Bitmap();
        let stageWidth = this.stage.stageWidth;
        let stageHeight = this.stage.stageHeight;

        bitmap.texture = bg;

        let imageWidth = bitmap.texture.textureWidth;
        let imageHeight = bitmap.texture.textureHeight;
        let is16_9 = (imageWidth / imageHeight < stageWidth / stageHeight);

        bitmap.width = stageWidth;
        bitmap.height = imageHeight * stageWidth / imageWidth;
        bitmap.y = (stageHeight - bitmap.height);
        if(is16_9)
        {
            bitmap.y += (333 - 147) / 2;
        }

        this.addChild(bitmap);

        let btnBegin = new ButtonBegin();
        btnBegin.skinName = skins.ButtonBeginSkin;
        btnBegin.verticalCenter = is16_9 ? 0 : 10;
        btnBegin.horizontalCenter = 0;
        this.addChild(btnBegin);

        btnBegin.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickBegin, this);

        // let btnQuit = new eui.Button();
        // btnQuit.skinName = skins.ButtonLiangSkin;
        // btnQuit.labelDisplay.text = "退出游戏";
        // btnQuit.bottom = 38;
        // btnQuit.horizontalCenter = 0;
        // this.addChild(btnQuit);

        // btnQuit.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickQuit, this);
        RES.loadGroup("LoadingScreen");
    }

    private _isLoading:boolean = false;
    private _loadingScreen:LoadingScreen;
    private _loadingTimer:egret.Timer;
    private _loadingComplete:boolean = false;
    private _loadingTimerComplete:boolean = false;

    private onClickBegin(event:egret.TouchEvent) : void {
        if(this._isLoading == false)
        {
            this._loadingScreen = new LoadingScreen();
            this.addChild(this._loadingScreen);

            this._isLoading = true;
            RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.loadGroup("GamePlayScreen");

            this._loadingTimer = new egret.Timer(2000, 0);
            this._loadingTimer.addEventListener(egret.TimerEvent.TIMER, this.onLoadingTimer, this);
            this._loadingTimer.start();
        }
    }

    private onClickQuit(event:egret.TouchEvent) : void {
        
    }

    private _gamePlayScreen:GamePlayScreen;
    private onResourceLoadComplete(evt:RES.ResourceEvent):void {
        if(evt.groupName == "GamePlayScreen")
        {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            this._loadingComplete = true;
            this.enterGamePlay();
        }
    }

    private onLoadingTimer(evt:egret.TimerEvent):void
    {
        this._loadingTimer.removeEventListener(egret.TimerEvent.TIMER, this.onLoadingTimer, this);
        this._loadingTimer.stop();
        this._loadingTimer = null;

        this._loadingTimerComplete = true;
        this.enterGamePlay();
    }

    private enterGamePlay():void
    {
        if(this._loadingComplete && this._loadingTimerComplete)
        {
            this._isLoading = false;
            this.removeChild(this._loadingScreen);
            this._loadingScreen.Dispose();
            this._loadingScreen = null;

            this._gamePlayScreen = new GamePlayScreen();
            this.addChild(this._gamePlayScreen);
        }
    }

}