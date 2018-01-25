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
var ProtoMgr = (function (_super) {
    __extends(ProtoMgr, _super);
    function ProtoMgr() {
        return _super.call(this) || this;
    }
    ProtoMgr.getInstance = function () {
        if (!this._instance) {
            this._instance = new ProtoMgr();
        }
        return this._instance;
    };
    ProtoMgr.prototype.getProto = function (ID, body) {
        var ProMessage = this._proto.Message;
        var Clazz;
        switch (ID) {
            case 1:
                Clazz = this._proto.Login;
                break;
        }
        var message = {
            "ID": ID,
            "MSG": Clazz.encode(Clazz.create(body)).finish()
        };
        var messageBuf = ProMessage.encode(ProMessage.create(message)).finish();
        return messageBuf;
    };
    ProtoMgr.prototype.getMessage = function (byte) {
        var uint8 = new Uint8Array(ByteUtils.Byte2Uint8Array(byte));
        var Message = this._proto.Message;
        var data = Message.decode(uint8);
        var Login = this._proto.Login;
        var lg = Login.decode(data.MSG);
        return lg;
    };
    ProtoMgr.prototype.init = function () {
        var _this = this;
        ProtoUtils.load("resource/protobuf/map.proto", function (err, root) {
            console.log("root:" + root);
            _this._proto = root.Test;
            console.log(_this._proto);
        });
    };
    return ProtoMgr;
}(Singleton));
__reflect(ProtoMgr.prototype, "ProtoMgr");
//# sourceMappingURL=ProtoMgr.js.map