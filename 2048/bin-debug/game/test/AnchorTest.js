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
var AnchorTest = (function (_super) {
    __extends(AnchorTest, _super);
    function AnchorTest() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    AnchorTest.prototype.onAddToStage = function (event) {
        this.drawText();
        this.button = new egret.Shape();
        this.button.graphics.beginFill(0xFF0000);
        this.button.graphics.drawRect(200, 200, 100, 100);
        this.button.graphics.endFill();
        this.button.touchEnabled = true;
        this.button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
        this.addChild(this.button);
        var rect = new egret.Rectangle(120, 120, 30, 50);
        this.shp = new egret.Shape();
        this.shp.graphics.beginFill(0xFF0000);
        this.shp.graphics.drawRect(100, 100, 100, 100);
        this.shp.graphics.endFill();
        // this.shp.mask = rect;
        // this.shp.anchorOffsetX = this.shp.width/2;
        // this.shp.anchorOffsetY = this.shp.height/2;
        // this.shp.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClick,this);
        // this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.startMove,this)
        // this.stage.addEventListener(egret.TouchEvent.TOUCH_END,this.stopMove,this);
        this.addChild(this.shp);
        this.shp2 = new egret.Shape();
        this.shp2.graphics.beginFill(0x00ff00);
        this.shp2.graphics.drawCircle(100, 100, 20);
        this.shp2.graphics.endFill();
        this.shp2.x = 20;
        this.shp2.y = 20;
        // this.shp2.alpha = 0.5;
        this.addChild(this.shp2);
        // this.shp.mask = this.shp2
        var isHit = this.shp.hitTestPoint(100, 100, true);
        this.infoText.text = "isHit:" + isHit;
    };
    AnchorTest.prototype.onButtonClick = function () {
        var http = new Http();
        http.HttpGet("http://httpbin.org/get?a=1&b=2");
    };
    AnchorTest.prototype.drawText = function () {
        this.infoText = new egret.TextField();
        this.infoText.type = egret.TextFieldType.INPUT;
        this.infoText.y = 200;
        this.infoText.text = "isHit";
        this.infoText.textColor = 0xFF0000;
        this.addChild(this.infoText);
    };
    // private onClick():void{
    //     let targetPoint : egret.Point = this.globalToLocal(0,0);
    //     this.shp.x = targetPoint.x;
    //     this.shp.y = targetPoint.y;
    // }
    AnchorTest.prototype.startMove = function (e) {
        this.offsetX = e.stageX - this.shp.x;
        this.offsetY = e.stageY - this.shp.y;
        this.shp.scaleX = 2;
        this.shp.scaleY = 2;
        this.shp.skewX = this.offsetX + 10;
        this.offsetX = this.shp.skewX;
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMove, this);
    };
    AnchorTest.prototype.onMove = function (e) {
        this.shp.x = e.stageX - this.offsetX;
        this.shp.y = e.stageY - this.offsetY;
    };
    AnchorTest.prototype.stopMove = function (e) {
        this.shp.scaleX = 1;
        this.shp.scaleY = 1;
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMove, this);
    };
    return AnchorTest;
}(egret.DisplayObjectContainer));
__reflect(AnchorTest.prototype, "AnchorTest");
//# sourceMappingURL=AnchorTest.js.map