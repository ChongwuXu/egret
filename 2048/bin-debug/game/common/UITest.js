var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
// TypeScript file
var UITest = (function (_super) {
    __extends(UITest, _super);
    function UITest() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddedToStage, _this);
        return _this;
    }
    UITest.prototype.onAddedToStage = function (event) {
        // this.initHSlider();
        // this.initProgressBar();
        this.initBution();
    };
    UITest.prototype.initBution = function () {
        var btn = new eui.Button();
        btn.label = "发送";
        btn.x = 100;
        btn.y = 100;
        btn.width = 200;
        btn.height = 100;
        btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.addChild(btn);
        var btn1 = new eui.Button();
        btn1.label = "连接";
        btn1.x = 100;
        btn1.y = 200;
        btn1.width = 200;
        btn1.height = 100;
        btn1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick1, this);
        this.addChild(btn1);
    };
    UITest.prototype.onClick1 = function (event) {
        this.sock = new egret.WebSocket();
        this.sock.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);
        this.sock.addEventListener(egret.Event.CONNECT, this.onScoketOpen, this);
        this.sock.connect("echo.websocket.org", 80);
    };
    UITest.prototype.onClick = function (event) {
        var _this = this;
        protobuf.load("resource/protobuf/test.proto", function (errr, root) {
            _this._proto = root.Test;
            console.log(_this._proto);
        });
        if (this.sock && this.sock.connected) {
            var cmd = '{"cmd":"uzwan_login","gameId":"0","from":"guzwan","userId":"3565526"}';
            this.sock.writeUTF(cmd);
        }
        else {
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
    };
    UITest.prototype.onReceiveMessage = function (event) {
        var msg = this.sock.readUTF();
        console.log("收到数据：" + msg);
    };
    UITest.prototype.onScoketOpen = function (event) {
        console.log("链接服务器成功！");
    };
    UITest.prototype.initProgressBar = function () {
        this.pBar = new eui.ProgressBar();
        this.pBar.maximum = 210;
        this.pBar.minimum = 0;
        this.pBar.width = 200;
        this.pBar.height = 20;
        this.pBar.x = 200;
        this.pBar.y = 200;
        this.addChild(this.pBar);
        this.pBar.value = 42;
        var timer = new egret.Timer(10, 0);
        timer.addEventListener(egret.TimerEvent.TIMER, this.timerHandler, this);
        timer.start();
    };
    UITest.prototype.timerHandler = function (event) {
        this.pBar.value += 1;
        if (this.pBar.value >= 210) {
            this.pBar.value = 0;
        }
    };
    UITest.prototype.initHSlider = function () {
        var hSlider = new eui.HSlider();
        hSlider.width = 200;
        hSlider.x = 20;
        hSlider.y = 20;
        hSlider.minimum = 0;
        hSlider.maximum = 100;
        hSlider.value = 10;
        hSlider.addEventListener(eui.UIEvent.CHANGE, this.changeHandler, this);
        this.addChild(hSlider);
    };
    UITest.prototype.changeHandler = function (event) {
        console.log(event.target.value);
    };
    return UITest;
}(egret.DisplayObjectContainer));
__reflect(UITest.prototype, "UITest");
//# sourceMappingURL=UITest.js.map