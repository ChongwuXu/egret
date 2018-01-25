class GamePlayGroup extends eui.Component {
	public constructor() {
		super();

		this.skinName = skins.GamePlaySkin;
	}

	public grpDownPanel:eui.Group;
	public grpUpPanel:eui.Group;
	public origAvatar1:Avatar;
	public origAvatar2:Avatar;

	public grpArraw:eui.Group;
	public arraw1:eui.Image;
	public arraw2:eui.Image;
	public arraw3:eui.Image;
	public arrawArea:eui.Group;

	protected createChildren():void {
		super.createChildren();

		if (this.origAvatar1 != null)
		{
			this.origAvatar1.$setVisible(false);
		}

		if(this.origAvatar2 != null)
		{
			this.origAvatar2.$setVisible(false);
		}
	}

}