var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ByteUtils = (function () {
    function ByteUtils() {
    }
    ByteUtils.Byte2Uint8Array = function (byte) {
        var data = [];
        for (var i = 0; i < byte.dataView.byteLength; i++) {
            data.push(byte.dataView.getUint8(i));
        }
        return data;
    };
    return ByteUtils;
}());
__reflect(ByteUtils.prototype, "ByteUtils");
//# sourceMappingURL=ByteUtils.js.map