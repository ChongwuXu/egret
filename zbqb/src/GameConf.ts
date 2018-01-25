class GameConf {
	protected constructor() {
	}

	public static FIXED_DELTA_TIME:number = 1 / 60;

	private static _instance:GameConf = null;
	public static get Instance():GameConf {
		if(GameConf._instance == null)
		{
			GameConf._instance = new GameConf();
		}
		return GameConf._instance;
	}

	public Init():void {
		RES.getResByUrl("resource/config/TV_doll.xml", this.onXmlLoaded, this, RES.ResourceItem.TYPE_XML);
	}

	private _avatarConfigs:AvatarConfig[] = [];
	private _rewardConfigs:RewardConfig[] = [];
	private _lineConfigs:AvatarLoopLineConfig[] = [];
	private _avatarPool:{[key:string]:Avatar[]} = {};

	public RewardId:number;

	private onXmlLoaded(data:any, url:string):void {
		let xml:egret.XML = <egret.XML>data;
		for(let i = 0; i < xml.children.length; ++i)
		{
			let xmlNode:egret.XML = <egret.XML>xml.children[i];
			if(xmlNode.name == "Worksheet")
			{
				let sheet:string = xmlNode["$ss:Name"];
				if(sheet == "avartar")
				{
					this.processXmlAvatar(xmlNode);
				}
				else if(sheet == "reward")
				{
					this.processXmlReward(xmlNode);
				}
				else if(sheet == "array")
				{
					this.processXmlArray(xmlNode);
				}
				else if(sheet == "belt")
				{
					this.processXmlBelt(xmlNode);
				}
			}
		}
	}

	private getChildByName(name:string, xml:egret.XML) : egret.XML
	{
		for(let i = 0; i < xml.children.length; ++i)
		{
			let xmlNode:egret.XML = <egret.XML>xml.children[i];
			if(xmlNode.name == name) return xmlNode;
		}
		return null;
	}

	private processXmlAvatar(xmlNode:egret.XML) : void {
		let table = this.getChildByName("Table", xmlNode);
		if(table != null)
		{
			let rowIndex:number = 0;
			for(let t = 0; t < table.children.length; ++t)
			{
				let row:egret.XML = <egret.XML>table.children[t];
				if(row.name == "Row")
				{
					if(rowIndex > 0)
					{
						let avConf:AvatarConfig = new AvatarConfig(row);
						this._avatarConfigs.push(avConf);
					}
					rowIndex++;
				}
			}
		}
	}

	private processXmlReward(xmlNode:egret.XML) : void {
		let table = this.getChildByName("Table", xmlNode);
		if(table != null)
		{
			let rowIndex:number = 0;
			for(let t = 0; t < table.children.length; ++t)
			{
				let row:egret.XML = <egret.XML>table.children[t];
				if(row.name == "Row")
				{
					if(rowIndex > 0)
					{
						let avConf:RewardConfig = new RewardConfig(row);
						this._rewardConfigs.push(avConf);
					}
					rowIndex++;
				}
			}
		}
	}

	private processXmlArray(xmlNode:egret.XML) : void {
		let table = this.getChildByName("Table", xmlNode);
		if(table != null)
		{
			let rowIndex:number = 0;
			for(let t = 0; t < table.children.length; ++t)
			{
				let row:egret.XML = <egret.XML>table.children[t];
				if(row.name == "Row")
				{
					if(rowIndex > 0)
					{
						let avConf:AvatarLoopLineConfig = new AvatarLoopLineConfig(row);
						this._lineConfigs.push(avConf);
					}
					rowIndex++;
				}
			}
		}
	}

	private processXmlBelt(xmlNode:egret.XML) : void {
		let table = this.getChildByName("Table", xmlNode);
		if(table != null)
		{
			let rowIndex:number = 0;
			for(let t = 0; t < table.children.length; ++t)
			{
				let row:egret.XML = <egret.XML>table.children[t];
				if(row.name == "Row")
				{
					if(rowIndex > 0)
					{
						let avConf:AvatarLoopLineConfig = this._lineConfigs[rowIndex - 1];
						avConf.parseBelt(row);
					}
					rowIndex++;
				}
			}
		}
	}


	public GetRewardById(id:number):RewardConfig {
		for(let i = 0; i < this._rewardConfigs.length; ++i)
		{
			if (this._rewardConfigs[i].Id == id) return this._rewardConfigs[i];
		}
		return null;
	}

	public GetAvatarById(id:number):AvatarConfig {
		for(let i = 0; i < this._avatarConfigs.length; ++i)
		{
			if(this._avatarConfigs[i].Id == id) return this._avatarConfigs[i];
		}
		return null;
	}

	public GetLineById(id:number):AvatarLoopLineConfig {
		for(let i = 0; i < this._lineConfigs.length; ++i)
		{
			if(this._lineConfigs[i].Id == id) return this._lineConfigs[i];
		}
		return null;
	}

	public GetLine(id:number) : AvatarLoopLineItem[] {
		let line:AvatarLoopLineItem[] = [];
		for(let i = 0; i < this._lineConfigs.length; ++i)
		{
			if(this._lineConfigs[i].Id == id)
			{
				let lineConf:AvatarLoopLineConfig = this._lineConfigs[i];
				let x:number = -(id * 165 + Math.floor(Math.random() * 165));
				for(let idx = 0; idx < lineConf.Lenght; ++idx)
				{
					let itemIdx = Math.floor(Math.random() * lineConf.Items.length);
					let interval:number = lineConf.IntervalRange[0] + Math.floor(Math.random() * (lineConf.IntervalRange[1] - lineConf.IntervalRange[0]));
					let item:AvatarLoopLineItem = new AvatarLoopLineItem();
					item.AvatarId = lineConf.Items[itemIdx][0];
					item.RewardId = lineConf.Items[itemIdx][1];
					item.Interval = interval;

					if (idx == 0) x -= 165;
					else x -= 165 + interval;
					item.x = x;

					line.push(item);
				}
			}
		}
		return line;
	}

	public Push(avatar:Avatar):void {
		let avatars = this._avatarPool[avatar.skinName];
		if(avatars == undefined)
		{
			avatars = [];
			this._avatarPool[avatar.skinName] = avatars;
		}

		avatars.push(avatar);
	}

	public Pop(skin:string) : Avatar {
		let avatars = this._avatarPool[skin];
		if(avatars == undefined)
		{
			return Avatar.createAvatar(skin);
		}

		if(avatars.length > 0) return avatars.pop();

		return Avatar.createAvatar(skin);
	}
}