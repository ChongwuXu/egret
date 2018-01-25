var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Net = (function () {
    function Net() {
        this.socket = new egret.WebSocket();
    }
    Net.prototype.init = function (host, port, type) {
        if (host === void 0) { host = ""; }
        if (port === void 0) { port = 80; }
        this.socket.type = type;
        this.socket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);
        this.socket.addEventListener(egret.Event.CONNECT, this.onSocketOpen, this);
        this.socket.addEventListener(egret.Event.CLOSE, this.onSocketClose, this);
        this.socket.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onSocketError, this);
        this.socket.connect(host, port);
    };
    Net.prototype.isConnected = function () {
        if (this.socket) {
            this.socket.connected;
        }
        return false;
    };
    Net.prototype.onReceiveMessage = function (event) {
        console.log("event:" + event);
    };
    Net.prototype.onSocketOpen = function (event) {
        console.log("event:" + event);
    };
    Net.prototype.onSocketClose = function (event) {
        console.log("event:" + event);
    };
    Net.prototype.onSocketError = function (event) {
        console.log("event:" + event);
    };
    return Net;
}());
__reflect(Net.prototype, "Net");
//# sourceMappingURL=Net.js.map