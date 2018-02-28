// TypeScript file
class UITest extends egret.DisplayObjectContainer{
    private _proto:any;
    private pBar:eui.ProgressBar;
    private sock:egret.WebSocket;
    public constructor(){
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddedToStage,this);
    }
    private onAddedToStage(event:egret.Event):void{
        // this.initHSlider();
        // this.initProgressBar();
        this.initBution();
    }
    private initBution():void{
        let btn : eui.Button = new eui.Button();
        btn.label = "发送";
        btn.x = 100;
        btn.y = 100;
        btn.width = 200;
        btn.height = 100;
        btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClick,this);
        this.addChild(btn);

        let btn1 : eui.Button = new eui.Button();
        btn1.label = "连接";
        btn1.x = 100;
        btn1.y = 200;
        btn1.width = 200;
        btn1.height = 100;
        btn1.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClick1,this);
        this.addChild(btn1);

    }
     private onClick1(event:egret.TouchEvent):void{
        this.sock = new egret.WebSocket();
        this.sock.type = egret.WebSocket.TYPE_BINARY;
        this.sock.addEventListener(egret.ProgressEvent.SOCKET_DATA,this.onReceiveMessage,this);
        this.sock.addEventListener(egret.Event.CONNECT,this.onScoketOpen,this);
        this.sock.addEventListener(egret.Event.CLOSE, this.onSocketClose, this);
        this.sock.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onSocketError, this);
        // this.sock.connect("echo.websocket.org",80);
        // this.sock.connect("192.168.8.246",65529);
        this.sock.connect("127.0.0.1",65529);
     }

    private onSocketClose(e:egret.Event): void {
        console.log("WebSocketClose");
    }

    private onSocketError(): void {
        console.log("WebSocketError");
    }
    private onClick(event:egret.TouchEvent):void{
        if(this.sock && this.sock.connected){
            // var cmd = '{"cmd":"uzwan_login","gameId":"0","from":"guzwan","userId":"3565526"}';
            // this.sock.writeUTF(cmd);

            var obj: Object = {
                SID: "123456",
                RID: 0,
                GPS_LNG: 0,
                GPS_LAT: 0,
                openid: "000",
                token: undefined
            }
            let buff:Uint8Array = ProtoMgr.getInstance().getProto(1,obj);
            let byte:egret.ByteArray = new egret.ByteArray();
            byte._writeUint8Array(buff);
            this.sock.writeBytes(byte);
            this.sock.flush();

        }else{
            console.log("socket not connected!");
        }
            // var sdk:WochengSDK = new WochengSDK();
            // var boxId = "";
            // var productId = "1000000003";
            // var customerId = "test032401";
            // var contentId = "test";
            // var contentName = "欢喜冤家";
            // var price = 100;
            // var redirectUrl = "http://www.baidu.com";
            // var failUrl = "http://www.126.com";
            // var broadbandid = "1";
            // var param2 = "";
            // var param3 = "";
            // var param4 = "";
            // var param5 = "";
            // var userCode = "";
            // var productIdThird = "";
            // var platform = "";
            // var payVersion = "8002";
            // var payChannelId = "30190";
            // var payAppId = "117951617";
            // var payAppName = "山东广电";
            // var payUA = "OTHERTVSTORE_SDGDTV";
            // sdk.doOrderProduct(boxId, productId, customerId, contentId, contentName, price, redirectUrl, failUrl, broadbandid, param2, param3, param4, param5, userCode, productIdThird, platform, payVersion, payChannelId, payAppId, payAppName, payUA, function (resultCode, resultMsg) {
            //         console.log("resultCode:" + resultCode + ";resultMsg:" + resultMsg);
            //     }
            // );
        // sdk.doCheckNetwork((resultCode)=>{
        //     console.log("####:"+resultCode);
        // })
    }
    private onReceiveMessage(event:egret.ProgressEvent):void{
        // let msg = this.sock.readUTF();
        let byte:egret.ByteArray = new egret.ByteArray();
        this.sock.readBytes(byte);
        let msg = ProtoMgr.getInstance().getMessage(byte);
        console.log("收到数据："+ msg.SID);
    }
    private onScoketOpen(event:egret.Event):void{
        console.log("链接服务器成功！");
    }
    private initProgressBar():void{
        this.pBar = new eui.ProgressBar();
        this.pBar.maximum = 210;
        this.pBar.minimum = 0;
        this.pBar.width = 200;
        this.pBar.height = 20;
        this.pBar.x = 200;
        this.pBar.y = 200;
        this.addChild(this.pBar);
        this.pBar.value = 42;
        let timer:egret.Timer = new egret.Timer(10,0);
        timer.addEventListener(egret.TimerEvent.TIMER,this.timerHandler,this);
        timer.start();
    }
    private timerHandler(event:egret.TimerEvent) :void{
        this.pBar.value +=1;
        if(this.pBar.value >= 210) {
            this.pBar.value = 0;
        }
    }
    private initHSlider():void{
        let hSlider : eui.HSlider = new eui.HSlider();
        hSlider.width = 200;
        hSlider.x = 20;
        hSlider.y = 20;
        hSlider.minimum = 0;
        hSlider.maximum = 100;
        hSlider.value  = 10;
        hSlider.addEventListener(eui.UIEvent.CHANGE,this.changeHandler,this);
        this.addChild(hSlider);
    }
    private changeHandler(event:eui.UIEvent):void{
        console.log(event.target.value);
    }
}