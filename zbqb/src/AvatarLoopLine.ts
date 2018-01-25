class AvatarLoopLine {
	public constructor(layer:number) {
		this._layer = layer;
	}

	public Dispose():void {
		if(this._gamePlay != null)
		{
			this._gamePlay.grpArraw.removeEventListener(GameArraw.ARROW_STATE_EVENT, this.onArrawState, this);
			this._gamePlay = null;
		}

	}

	private _fixedDelta:number = 1 / 60;

	private _layer:number = 0;
	private _speed:number = 165;
	private _avatars:Avatar[] = null;
	private _lineConfig:AvatarLoopLineItem[] = null;
	private _gamePlay:GamePlayGroup = null;
	private _curAvatarIdxInShow : number = 0;
	private _curAvatarGrp:eui.Group = null;

	private _isPause:boolean = false;
	private _isValid:boolean = false;

	public get speed():number {
		return this._speed;
	}

	public get avatars():Avatar[] {
		return this._avatars;
	}

	public Init(config:AvatarLoopLineItem[], gamePlay:GamePlayGroup):void {
		this._isValid = config != null && config.length > 0;
		this._lineConfig = config;
		this._gamePlay = gamePlay;

		let avatar_length:number = 5;
		if (config.length < avatar_length)
		{
			avatar_length = config.length;
		}

		let grpAvatar:eui.Group = gamePlay.grpDownPanel;
		let origAvatar:Avatar = gamePlay.origAvatar1;
		if (this._layer == 0)
		{
			grpAvatar = gamePlay.grpUpPanel;
			origAvatar = gamePlay.origAvatar2;
		}

		grpAvatar.visible = false;
		if(!this._isValid) return;

		grpAvatar.visible = true;
		this._gamePlay.grpArraw.addEventListener(GameArraw.ARROW_STATE_EVENT, this.onArrawState, this);

		let lineConf:AvatarLoopLineConfig = GameConf.Instance.GetLineById(this._layer);
		this._speed = lineConf.Speed;

		this._curAvatarGrp = grpAvatar;
		this._avatars = [];
		this._curAvatarIdxInShow = 0;
		for(let i = 0; i < avatar_length; ++i)
		{
			let conf:AvatarConfig = GameConf.Instance.GetAvatarById(config[i].AvatarId);
			let avatar:Avatar = GameConf.Instance.Pop(conf.SkinName);
			
			grpAvatar.addChild(avatar);
			
			avatar.y = origAvatar.y;
			avatar.x = config[i].x;

			this._avatars.push(avatar);
		}

		// this._isPause = true;
		// this.doTween();
	}

	private doTween():void {
		this._avatars[0].x = 0;
		egret.Tween.get(this._avatars[0]).to({x:1280}, 6500).call(()=>{
			this.doTween();
		}, this);		
	}

	public FixedUpdate():void {
		this.UpdateAvatars(GameConf.FIXED_DELTA_TIME);
	}

	public Update(delta:number):void {

	}

	private UpdateAvatars(delta:number):void {
		if(this._isPause || !this._isValid) return;

		for(let i = 0; i < this._lineConfig.length; ++i)
		{
			this._lineConfig[i].x += delta * this._speed;
		}
		let lastIndex:number = this._curAvatarIdxInShow + this._avatars.length + 1;
		//! 5就是满屏的娃娃数量
		if(this._lineConfig.length <= 5)
		{
			lastIndex = this._curAvatarIdxInShow - 1;
			if(lastIndex < 0) lastIndex += this._lineConfig.length;
		}
		if(lastIndex >= this._lineConfig.length) lastIndex -= this._lineConfig.length;
		let lastItem:AvatarLoopLineItem = this._lineConfig[lastIndex];
		if(lastItem.x > -(lastItem.width + lastItem.Interval) && this._avatars.length < this._lineConfig.length)
		{
			let avConf:AvatarConfig = GameConf.Instance.GetAvatarById(lastItem.AvatarId);
			let av:Avatar = GameConf.Instance.Pop(avConf.SkinName);

			if(av.parent != this._curAvatarGrp)
			{
				this._curAvatarGrp.addChild(av);
				av.y = this._avatars[0].y;
			}
			this._avatars.push(av);
		}

		let curItem:AvatarLoopLineItem = this._lineConfig[this._curAvatarIdxInShow];
		if(curItem.x > 1290)
		{
			let prevItem:AvatarLoopLineItem = null;
			let prevIndex:number = this._curAvatarIdxInShow - 1;
			if(prevIndex < 0) prevIndex = this._lineConfig.length - 1;

			prevItem = this._lineConfig[prevIndex];
			curItem.x = prevItem.x - curItem.width - curItem.Interval;
			if(curItem.x > -curItem.width - curItem.Interval) curItem.x = -curItem.width - curItem.Interval;

			this._curAvatarIdxInShow++;
			if(this._curAvatarIdxInShow >= this._lineConfig.length) this._curAvatarIdxInShow = 0;

			GameConf.Instance.Push(this._avatars.shift());
		}

		for(let i = 0; i < this._avatars.length; i++)
		{
			let curIndex = this._curAvatarIdxInShow + i;
			if (curIndex >= this._lineConfig.length) curIndex -= this._lineConfig.length;

			this._avatars[i].x = this._lineConfig[curIndex].x;
		}

		if (this._arrawState == 1)
		{
			let arrowArea = this._gamePlay.arrawArea;
			let gpos = this._gamePlay.grpArraw.localToGlobal(arrowArea.x, arrowArea.y);
			let rect:egret.Rectangle = new egret.Rectangle(gpos.x, gpos.y, arrowArea.width, arrowArea.height);

			for(let i = 0; i < this._avatars.length; ++i)
			{
				let apos = this._avatars[i].localToGlobal(this._avatars[i].area.x, this._avatars[i].area.y);
				let arect:egret.Rectangle = new egret.Rectangle(apos.x, apos.y, this._avatars[i].area.width, this._avatars[i].area.height);

				if(rect.intersects(arect))
				{
					let curIndex = this._curAvatarIdxInShow + i;
					if (curIndex >= this._lineConfig.length) curIndex -= this._lineConfig.length;

					GameConf.Instance.RewardId = this._lineConfig[curIndex].RewardId;
					this._gamePlay.grpArraw.dispatchEvent(new egret.Event(GameArraw.ARROW_TOUCH_EVENT, false, false, this._avatars[i]));
				}
			}
		}
	}

	private _arrawState = 0;
	private onArrawState(evt:egret.Event):void
	{
		this._arrawState = evt.data as number;

		if(this._arrawState == 2)
		{
			this._isPause = true;
		}
		else this._isPause = false;
	}

}