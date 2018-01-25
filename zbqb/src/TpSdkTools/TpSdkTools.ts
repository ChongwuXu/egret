enum ResultCode
{
        CODE_INIT_SUCCESS = 1,
        CODE_INIT_FAIL,
        CODE_UNINIT,
        CODE_LOGIN_SUCCESS,
        CODE_LOGIN_FAIL,
        CODE_LOGIN_TIMEOUT,
        CODE_UNLOGIN,
        CODE_LOGOUT_SUCCESS,
        CODE_LOGOUT_FAIL,
        CODE_PAY_SUCCESS,
        CODE_PAY_FAIL,
        CODE_PAY_REFUND_OR_CANCELED,
        CODE_SHARE_SUCCESS,
        CODE_SHARE_FAIL,
        CODE_SWITCHACCOUNT_SUCCESS,
        CODE_SWITCHACCOUNT_FAIL,
        CODE_EXIT_SUCCESS,
        CODE_VIDEO_START_LOAD,
        CODE_VIDEO_FINISH_LOAD,
        CODE_VIDEO_ERROR_LOAD,
        CODE_VIDEO_CLOSED,
        CODE_VIDEO_COMPLETE_PLAY,
        CODE_VIDEO_PLAY_ERROR,
        CODE_VIDEO_WILL_PRESENT,
        CODE_VIDEO_VAILABLE,
        CODE_VERIFIED
}

class TpSdkTools{
    public constructor(){}
    private static instance:TpSdkTools;
    private call:CallNative;
    private callBacks:any;
    public static getInstance():TpSdkTools {
        if(!this.instance){
            this.instance = new TpSdkTools();
        }
        return this.instance;
    }
    public init(){
        this.call = new CallNative();
        egret.ExternalInterface.addCallback("onResult",function(message:string){
            let js = JSON.parse(message);
            if(js.resultCode == 4){

            }
        });
    }
    public login(loginSuccess,loginFail){
        this.call.login();
    }
    public pay(){
        this.call.pay();
    }
}