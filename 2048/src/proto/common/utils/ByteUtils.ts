class ByteUtils {
	public constructor() {
	}
	public static Byte2Uint8Array(byte:egret.ByteArray):Array<number>{
		let data: Array<number> = [];
		for(let i:number = 0; i < byte.dataView.byteLength;i++){
			data.push(byte.dataView.getUint8(i));
		}
		return data;
	}
}