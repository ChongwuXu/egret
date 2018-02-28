class Handler {
	public method:Function;
	public thisObj:any;
	public constructor(method:Function = null,thisObj:any = null) {
		this.method = method;
		this.thisObj = thisObj;
	}
	public dispose(){
		this.method = null;
		this.thisObj = null;
	}
	public static create(method:Function = null,thisObj:any = null):Handler{
		return new Handler(method,thisObj);
	}
}