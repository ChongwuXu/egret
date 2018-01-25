class LoadingGroup extends eui.Component {
	public constructor() {
		super();

		this.skinName = skins.LoadingSkin;
	}

	public load_1:eui.Image;
	public load_2:eui.Image;
	public load_3:eui.Image;
	public load_4:eui.Image;

	public load_j_1:eui.Image;
	public load_j_2:eui.Image;

	private _timer:egret.Timer;
	private _frame:number = 0;

	public Dispose():void {
		if(this._timer != null)
		{
			this._timer.stop();
			this._timer.removeEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
			this._timer = null;
		}
	}

	protected createChildren():void {
		super.createChildren();

		this._timer = new egret.Timer(500, 0);
		this._timer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
		this._timer.start();
	}

	private onTimer(evt:egret.TimerEvent):void {

		let y = this._frame % 4;
		this.load_1.$setVisible(y == 0);
		this.load_2.$setVisible(y == 1);
		this.load_3.$setVisible(y == 2);
		this.load_4.$setVisible(y == 3);

		this.load_j_1.$setVisible(y == 0 || y == 2);
		this.load_j_2.$setVisible(y == 1 || y == 3);

		this._frame++;
	}
}