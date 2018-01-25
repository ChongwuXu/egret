class RewardConfig {
	public constructor(xml:egret.XML) {
		this.init(xml);
	}

	private _id:number = 0;
	private _name:string = "";
	private _desc:string = "";
	private _rewardSkin:string = "";
	private _rate:number = 0;
	private _score:number = 0;

	public get Id():number {
		return this._id;
	}

	public get Name():string {
		return this._name;
	}

	public get Description():string {
		return this._desc;
	}

	public get RewardSkinName():string {
		return this._rewardSkin;
	}

	private init(xml:egret.XML):void {
		if (xml == null) return;

		let cidx = 0;
		for(let i = 0; i < xml.children.length; ++i)
		{
			let cell:egret.XML = <egret.XML>xml.children[i];
			let data:egret.XML = <egret.XML>cell.children[0];
			let text:egret.XMLText = <egret.XMLText>data.children[0];
			let cellIndex = cell["$ss:Index"];
			if(cellIndex != undefined && cellIndex != null)
			{
				cidx = Number(cellIndex);
			}
			else cidx += 1;

			if(cidx == 1) this._id = Number(text.text);
			else if(cidx == 2) this._name = text.text;
			else if(cidx == 3) this._rewardSkin = text.text;
			else if(cidx == 4) this._rate = Number(text.text);
			else if(cidx == 5) this._score = Number(text.text);
		}
	}
}