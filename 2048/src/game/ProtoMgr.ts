class ProtoMgr extends Singleton{
	private static _instance:ProtoMgr;
	private _proto:any;
	public constructor() {
		super();
	}
	public static getInstance():ProtoMgr{
		if(!this._instance){
			this._instance = new ProtoMgr();
		}
		return this._instance;
	}
	public getProto(ID:number,body:Object):any{
		let ProMessage:any = this._proto.Message;
		let Clazz:any;
		switch(ID){
			case 1:
				Clazz = this._proto.Login;
				break;
		}
		let message:any={
			"ID":ID,
			"MSG":Clazz.encode(Clazz.create(body)).finish()
		}
		let messageBuf:any = ProMessage.encode(ProMessage.create(message)).finish();
		return messageBuf;
	}
	public getMessage(byte:egret.ByteArray):any{
		let uint8:Uint8Array = new Uint8Array(ByteUtils.Byte2Uint8Array(byte));
		let Message:any = this._proto.Message;
		let data:any = Message.decode(uint8);
		let Login:any = this._proto.Login;
		let lg:any = Login.decode(data.MSG);
		return lg;
	}
	public init():void{
		ProtoUtils.load("resource/protobuf/map.proto",(err:any,root:any)=>{
			console.log("root:" + root);
			this._proto = root.Test;
			console.log(this._proto);
		});
	}
}