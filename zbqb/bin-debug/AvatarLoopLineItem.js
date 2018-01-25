var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var AvatarLoopLineItem = (function () {
    function AvatarLoopLineItem() {
        this.AvatarId = 0;
        this.RewardId = 0;
        this.Interval = 100;
        //当前所在的位置的X坐标
        this.x = 0;
        //Avatar Group的宽
        this.width = 165;
    }
    return AvatarLoopLineItem;
}());
__reflect(AvatarLoopLineItem.prototype, "AvatarLoopLineItem");
