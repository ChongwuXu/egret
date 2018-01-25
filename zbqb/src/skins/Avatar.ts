class Avatar extends eui.Component {
	public constructor(skin?:any) {
		super();

		if(skin!=null)
		{
			this.skinName = skin;
		}
		else this.createSkinName();
	}

	public static createAvatar(skin:string) : Avatar {
		let skin_name = skin.toLowerCase();
		let av:Avatar = null;
		switch(skin_name)
		{
			case "g1": av = new Avatar(skins.AvatarG1Skin); break;
			case "ht1": av = new Avatar(skins.AvatarHt1Skin); break;
			case "j1": av = new Avatar(skins.AvatarJ1Skin); break;
			case "t1": av = new Avatar(skins.AvatarT1Skin); break;
			case "x1": av = new Avatar(skins.AvatarX1Skin); break;
			default: av = new Avatar(); break;
		}
		return av;
	}

	public avatar1 : eui.Image;
	public avatar2 : eui.Image;

	public area : eui.Group;
	public isPause : boolean = false;

	private _timer : egret.Timer;
	private _frame : number = 0;

	public Dispose():void {
		if(this._timer)
		{
			this._timer.stop();
			this._timer.removeEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
			this._timer = null;
		}
	}

	protected createSkinName() : void {
		this.skinName = skins.AvatarSkin;
	}

	protected createChildren() : void {
		super.createChildren();

		this._timer = new egret.Timer(500, 0);
		this._timer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
		this._timer.start();
	}

	private onTimer(evt:egret.TimerEvent) : void {
		if (this.isPause) return;

		let v:boolean = (this._frame % 2 == 0);

		this.avatar1.$setVisible(v);
		this.avatar2.$setVisible(!v);
		this._frame++;
	}

	public setAvatar(img1:string, img2:string) : void {
		this.avatar1.texture = RES.getRes(img1);
		this.avatar2.texture = RES.getRes(img2);	
	}
}