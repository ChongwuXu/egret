class AvatarConfig {
	public constructor(xml:egret.XML) {
		this.init(xml);
	}

	private _name:string = "";
	private _avatarSkin:string = "";
	private _desc:string = "";
	private _id:number = 0;

	public get Name():string {
		return this._name;
	}

	public get Id():number {
		return this._id;
	}

	public get SkinName():string {
		return this._avatarSkin;
	}

	private init(xml:egret.XML):void {
		if(xml == null) return;

		let cidx = 0;
		for(let i = 0; i < xml.children.length; ++i)
		{
			let cell:egret.XML = <egret.XML>xml.children[i];
			let data:egret.XML = <egret.XML><any>cell.children[0];
			let text:egret.XMLText = <egret.XMLText>data.children[0];
			let cellIndex = cell["$ss:Index"];
			if(cellIndex != undefined && cellIndex != null)
			{
				cidx = Number(cellIndex);
			}
			else cidx += 1;

			if(cidx == 1) this._id = Number(text.text);
			else if(cidx == 2)this._name = text.text;
			else if(cidx == 3) this._desc = text.text;
			else if(cidx == 4) this._avatarSkin = text.text;
		}
	}
}