import { AnimationClip, Animator, GameObject, HumanBodyBones, Object, Transform, Vector3, WaitForEndOfFrame } from 'UnityEngine'
import { Button } from 'UnityEngine.UI';
import { SpawnInfo, ZepetoPlayers, LocalPlayer, ZepetoCharacter } from 'ZEPETO.Character.Controller';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { WorldService } from 'ZEPETO.World';


export default class AttachPetController extends ZepetoScriptBehaviour {

    public Pet: Transform;
    public bodyBond: HumanBodyBones;
    public _btn: Button;

    private _localCharacter: ZepetoCharacter;
    @SerializeField() private animationClip: AnimationClip;

    Start() {
        ZepetoPlayers.instance.OnAddedLocalPlayer.AddListener(() => {
            this._localCharacter = ZepetoPlayers.instance.LocalPlayer.zepetoPlayer.character;
            const localCharacter = ZepetoPlayers.instance.LocalPlayer.zepetoPlayer.character;
            const animator: Animator = localCharacter.ZepetoAnimator;
            const bone: Transform = animator.GetBoneTransform(this.bodyBond);
            this._btn.onClick.AddListener(() => {        
                this.Pet.localScale = new Vector3(3, 3, 3);
                Object.Instantiate(this.Pet, bone) as GameObject;
                
                this.StartCoroutine(this.WaitForExit());
                this._localCharacter.SetGesture(this.animationClip);
            })
        });
    }

    private *WaitForExit(){
        if(this._localCharacter){
            while(true){
                if(this._localCharacter.tryJump){
                    this._localCharacter.CancelGesture();
                    break;
                }
                yield new WaitForEndOfFrame();
            }
        }
    }
}