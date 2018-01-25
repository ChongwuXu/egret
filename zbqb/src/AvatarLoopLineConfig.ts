class AvatarLoopLineConfig {
	public constructor(xml:egret.XML) {
		this.init(xml);
	}

	private _id:number = 0;
	private _items:number[][] = [];
	private _interval:number[] = [];
	private _length:number = 0;
	private _speed:number = 465;

	public get Id():number {
		return this._id;
	}

	public get Items() :number[][] {
		return this._items;
	}

	public get IntervalRange():number[] {
		return this._interval;
	}

	public get Lenght():number {
		return this._length;
	}

	public get Speed():number {
		return this._speed;
	}

	private init(xml:egret.XML):void
	{
		if(xml == undefined || xml == null) return;

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
			else if(cidx == 2) {
				this._items = JSON.parse(text.text);
			}
			else if(cidx == 4) {
				this._interval = JSON.parse(text.text);
			}
			else if(cidx == 5) this._length = Number(text.text);
			else if(cidx == 6) this._speed = Number(text.text);
		}
	}

	public parseBelt(xml:egret.XML):void {
		if(xml == undefined || xml == null) return;

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

			if(cidx == 2) this._speed = Number(text.text);
		}

	}
}