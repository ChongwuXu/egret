class CallNative{
    public constructor(){}
    public login():void{
        egret.ExternalInterface.call("login","");
    }
    public pay():void{
        egret.ExternalInterface.call("pay","");
    }
}