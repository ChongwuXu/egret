/**
* @author Created by peony on 2017/2/14.
* @see 在线领取列表
*
*/
  class onlineList extends eui.ItemRenderer{
    public btnReceive:eui.Button;//领取
    public textTime:eui.Label;//倒计时显示
    public textDescribe:eui.Label;//描述
    public onlineRw:eui.Image;//图标
		public textGemAward:eui.Label;//宝石奖励数量
    public img_complete:eui.Image;//领取完成图片
    private timelimit:number;//倒计时时间
 
    public constructor(){
      super();
      this.skinName = "onlineListSkin";      
      this.addEventListener(egret.Event.ADDED_TO_STAGE,this.show,this);
      this.addEventListener(egret.Event.REMOVED_FROM_STAGE,this.hide,this);
    }

    private show():void{
      this.btnReceive.addEventListener(egret.TouchEvent.TOUCH_TAP, this.requestHandle, this);
    }

    private hide():void{
      this.btnReceive.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.requestHandle, this);
    }

    private refresh():void{
    }

    /** 数据变化*/
    protected dataChanged():void {
      this.onlineRw.source = this.data.icon;
      this.refresh();
    }

    /** 请求处理*/
    private requestHandle():void{
    }

    /** 请求回调*/
    private onPostComplete(event:egret.Event):void {
    }
}   