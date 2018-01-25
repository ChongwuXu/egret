class SplashScreen extends eui.UILayer {
	static BG_IMAGE : string = "resource/assets/logo_960.jpg";

	public constructor() {
		super();
	}

	private _isThemeLoadEnd = false;
	private _isPreloadEnd = false;
	private _isSplashTimeout = false;

	protected createChildren():void {
		super.createChildren();

		this.stage.frameRate = 30;

        let assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());

        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");

		GameConf.Instance.Init();

		this.createView();
	}

	private onConfigComplete(event:RES.ResourceEvent) : void {
		RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        // load skin theme configuration file, you can manually modify the file. And replace the default skin.
        //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
        let theme = new eui.Theme("resource/default.thm.json", this.stage);
        theme.addEventListener(eui.UIEvent.COMPLETE, this.onThemeLoadComplete, this);

        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.loadGroup("MainScreen");
	}

	private onThemeLoadComplete() : void {
		this._isThemeLoadEnd = true;
		this.doSplashEnd();
	}

	private onResourceLoadComplete(event:RES.ResourceEvent) : void {
		if (event.groupName == "MainScreen") {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
			this._isPreloadEnd = true;
			this.doSplashEnd();
        }
	}

	private onResourceLoadError(event:RES.ResourceEvent) : void {
		console.warn("Group: " + event.groupName + " has failed.");
		this.onResourceLoadComplete(event);
	}

	private doSplashEnd():void {
		if(this._isPreloadEnd &&
			this._isSplashTimeout &&
			this._isThemeLoadEnd) {

			let screen = new MainScreen();
			this.stage.addChild(screen);

			this.stage.removeChild(this);
		}
	}

	private mSplashTimer:egret.Timer;

	private createView():void {

		let thisObject:SplashScreen = this;
		function onComplete(data:any, url:string):void {
			if(url == SplashScreen.BG_IMAGE)
			{
				let bg:egret.Bitmap = new egret.Bitmap();
				let stageWidth = thisObject.stage.stageWidth;
				let stageHeight = thisObject.stage.stageHeight;

				bg.texture = data;

				let imageWidth = bg.texture.textureWidth;
				let imageHeight = bg.texture.textureHeight;

				if(imageWidth > imageHeight)
				{
					bg.width = stageWidth;
					bg.height = imageHeight * stageWidth / imageWidth;
					bg.y = (stageHeight - bg.height) / 2;
				}
				else
				{
					bg.width = imageWidth * stageHeight / imageHeight;
					bg.height = stageHeight;

					bg.x = (stageWidth - bg.width) / 2;
				}

				thisObject.addChild(bg);

				let t:egret.Timer = new egret.Timer(2000, 1);
				t.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.onTimerComplete, this);
				thisObject.mSplashTimer = t;
				thisObject.mSplashTimer.start();
			}
		};
		
		RES.getResByUrl(SplashScreen.BG_IMAGE, onComplete, this);
    }

	private onTimerComplete(event: egret.TimerEvent)
	{
		this.mSplashTimer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.onTimerComplete, this);
		this.mSplashTimer.stop();
		this.mSplashTimer = null;

		this._isSplashTimeout = true;
		this.doSplashEnd();
	}
}