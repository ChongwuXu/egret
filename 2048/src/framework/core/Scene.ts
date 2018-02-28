/**
 * 场景类
 */
class Scene extends eui.UILayer {
	protected TAG: string = "";
	private _isRunning: boolean;
	public constructor() {
		super();
		this.TAG = egret.getQualifiedClassName(this);
		this.addEventListener(egret.Event.ADDED_TO_STAGE,this.init,this);
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE,this.onDestroy,this);
	}
	
	protected init(){
		console.log(this.TAG+" init");
		this._isRunning = true;
	}
	public get isRunning(): boolean{
		return this._isRunning;
	}

	public onEnterAnimation(){
		console.log(this.TAG + " onEnterAnimation");
	}
	public onExitAnimation(){
		console.log(this.TAG + " onExitAnimation");
	}

	protected onDestroy(){
		console.log(this.TAG + " onDestroy")
		this.removeChildren();
	}
}