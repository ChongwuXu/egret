/**
  * 在线页面
	* @author Created by peony on 2016/8/4.
	*
	*/
class OnlinePanel extends eui.Component {

  public btnClose: eui.Button;//关闭按钮
  public onlineList: eui.List;//列表

  public textv:eui.Label;

  /** 在线数据*/
  private OnlineListUp = [
    { icon: "icon_general_01_png" }
  ];

  public constructor() {
    super();
    this.addEventListener(egret.Event.ADDED_TO_STAGE,this.initPanel,this);
    this.skinName = "OnlineSkin";
  }

  private isVis = true;

  public initPanel(): void {
    this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closePanel, this);
    for(let i = 0; i < 1000; i++){
      this.OnlineListUp.push({ icon: "icon_general_01_png" });
    }
    this.onlineList.itemRenderer = onlineList;
    this.onlineList.dataProvider = new eui.ArrayCollection(this.OnlineListUp);
    this.onlineList.useVirtualLayout = this.isVis;
    var layout: eui.VerticalLayout = new eui.VerticalLayout();
    layout.gap = 10;
    layout.paddingLeft = 2;
    this.onlineList.layout = layout;
  }

  public initData(): void {

  }

  private refresh(): void {
  }

  public destory(): void {
    this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.closePanel, this)
  }

  public closePanel() {
    this.isVis = !this.isVis;
    this.onlineList.useVirtualLayout = !this.isVis;

    let str = this.isVis ? '关闭虚拟布局' : '开启虚拟布局';
    this.textv.text = str;
  }
}
