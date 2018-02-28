class Socket {
	private socket:egret.WebSocket;
	
	public constructor() {
		this.socket = new egret.WebSocket();
	}
	public init(host:string = "",port:number = 80,type:string):void{
		this.socket.type = type;
		this.socket.addEventListener(egret.ProgressEvent.SOCKET_DATA,this.onReceiveMessage,this);
		this.socket.addEventListener(egret.Event.CONNECT,this.onSocketOpen,this);
		this.socket.addEventListener(egret.Event.CLOSE,this.onSocketClose,this);
		this.socket.addEventListener(egret.IOErrorEvent.IO_ERROR,this.onSocketError,this);
		this.socket.connect(host,port);
	}
	public isConnected():boolean{
		if(this.socket){
			this.socket.connected;
		}
		return false;
	}

	private onReceiveMessage(event:egret.Event):void{
		console.log("event:" + event);
	}
	private onSocketOpen(event:egret.Event):void{
		console.log("event:" + event);
	}
	private onSocketClose(event:egret.Event):void{
		console.log("event:" + event);
	}
	private onSocketError(event:egret.Event):void{
		console.log("event:" + event);
	}

}