class LoadingScreen extends eui.UILayer {
	public constructor() {
		super();

	}

	private _grpLoading:LoadingGroup;

	public Dispose():void {
		if(this._grpLoading != null)
		{
			this.removeChild(this._grpLoading);
			this._grpLoading.Dispose();
			this._grpLoading = null;
		}
	}

	protected createChildren():void {
		super.createChildren();

		this._grpLoading = new LoadingGroup();
		let stageWidth = this.stage.stageWidth;
		let stageHeight = this.stage.stageHeight;

		this._grpLoading.width = 1280;
		this._grpLoading.height = 960;

		this._grpLoading.scaleX = stageWidth / this._grpLoading.width;
		this._grpLoading.scaleY = this._grpLoading.scaleX;

		this._grpLoading.y = (stageHeight * this._grpLoading.scaleX - this._grpLoading.height) / 2;
		this.addChild(this._grpLoading);
	}
}