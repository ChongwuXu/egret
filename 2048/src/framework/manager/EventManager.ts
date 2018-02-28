class EventManager extends Single  {
	private eventDispatcher: egret.EventDispatcher;

	protected constructor() {
		super();
		this.eventDispatcher = new egret.EventDispatcher();
	}
	public static get Instance(): EventManager{
		return this.getInstance();
	}
	public dispatchCustomEvent(type: string,data?: any): void{
		this.eventDispatcher.dispatchEventWith(type,false,data);
	}
	
	public addEventListener(type: string, listener: Function, thisObject: any, useCapture?: boolean, priority?: number): void{
		this.eventDispatcher.addEventListener(type,listener,thisObject,useCapture,priority);
	}
	public once(type: string, listener: Function, thisObject: any, useCapture?: boolean, priority?: number): void{
		this.eventDispatcher.once(type,listener,thisObject,useCapture,priority);
	}
	public removeEventListener(type: string, listener: Function, thisObject: any, useCapture?: boolean): void{
		this.eventDispatcher.removeEventListener(type,listener,thisObject,useCapture);
	}
	public hasEventListener(type: string): boolean{
		return this.eventDispatcher.hasEventListener(type);
	}
	public dispatchEvent(event: egret.Event): boolean{
		return this.eventDispatcher.dispatchEvent(event);
	}
	public willTrigger(type: string): boolean{
		return this.willTrigger(type);
	}
	
}