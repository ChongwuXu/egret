class TpSdkTools{
    public constructor(){}
    private static instance:TpSdkTools;
    private call:CallNative;
    public static getInstance():TpSdkTools {
        if(!this.instance){
            this.instance = new TpSdkTools();
        }
        return this.instance;
    }
    public init(){
        call = new CallNative();
    }
    public login(loginSuccess,loginFail){
        
    }
}