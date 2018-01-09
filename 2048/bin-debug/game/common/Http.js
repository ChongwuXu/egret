var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
// TypeScript file
var Http = (function () {
    function Http() {
    }
    Http.prototype.HttpGet = function (url) {
        var request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        request.open(url, egret.HttpMethod.GET);
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        request.send();
        request.addEventListener(egret.Event.COMPLETE, this.onGetComplete, this);
        request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onGetIOError, this);
        request.addEventListener(egret.ProgressEvent.PROGRESS, this.onGetProgress, this);
    };
    Http.prototype.onGetComplete = function (event) {
        var request = event.currentTarget;
        console.log("get data:", request.response);
    };
    Http.prototype.onGetIOError = function (event) {
        console.log("get error:" + event);
    };
    Http.prototype.onGetProgress = function (event) {
        console.log("get progress:" + Math.floor(100 * event.bytesLoaded / event.bytesTotal) + "%");
    };
    return Http;
}());
__reflect(Http.prototype, "Http");
//# sourceMappingURL=Http.js.map