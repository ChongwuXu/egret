class LoginLayer extends Layer {
	private input_name: eui.TextInput;
	private input_pwd: eui.TextInput;
	private btn_login: eui.Button;
	public constructor() {
		super();
		this.skinName = "skins.LoginLayer";
		this.percentWidth = 100;
		this.percentHeight = 100;
	}
	public init(){
		super.init();
		let userName = egret.localStorage.getItem("userName");
		let pwd = egret.localStorage.getItem("pwd");
		this.input_name.text = userName;
		this.input_pwd.text = pwd;
	}
	public setOnTouchListener(){
		super.setOnTouchListener;
		this.btn_login.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onLoginClick,this);
	}
	public removeOnTouchListener(){
		super.removeOnTouchListener();
		this.btn_login.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onLoginClick,this);
	}
	private onLoginClick(event: egret.TouchEvent){
		let userName = this.input_name.text;
		let pwd = this.input_pwd.text;
		egret.localStorage.setItem("userName",userName);
		egret.localStorage.setItem("pwd",pwd);
		console.log("userName:" + userName);
		console.log("pwd:" + pwd);
	}
}