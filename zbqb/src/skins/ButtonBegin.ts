class ButtonBegin extends eui.Button {
	public constructor() {
		super();
	}

	public Dispose():void {
		if(this._timer != null)
		{
			this._timer.stop();
			this._timer = null;
		}
	}

	public bgImage:eui.Image;
	public bgImage0:eui.Image;

	private _timer:egret.Timer = null;
	private _frame:number = 0;

	protected createChildren():void {
		super.createChildren();

		this._timer = new egret.Timer(500, 0);
		this._timer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
		this._timer.start();
	}

	private onTimer(event:egret.TimerEvent) : void {

		let v:boolean = (this._frame % 2 == 0);

		this.bgImage.$setVisible(v);
		this.bgImage0.$setVisible(!v);

		this._frame++;
	}
}