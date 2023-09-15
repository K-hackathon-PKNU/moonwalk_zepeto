import { Transform } from 'UnityEngine'
import { NavMeshAgent } from 'UnityEngine.AI';
import { Button } from 'UnityEngine.UI';
import { ZepetoPlayers } from 'ZEPETO.Character.Controller'
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { WorldService } from 'ZEPETO.World';
 
export default class PetController extends ZepetoScriptBehaviour {
 
    private _target: Transform;
    private _navMeshAgent: NavMeshAgent;
 
    Start() {
        this._navMeshAgent = this.GetComponent<NavMeshAgent>();
 
        ZepetoPlayers.instance.OnAddedLocalPlayer.AddListener(() => {
            this._target = ZepetoPlayers.instance.GetPlayer(WorldService.userId).character.transform;
        })
    }
 
    Update() {
        if (this._target == null) {
            return;
        }
        
        this._navMeshAgent = this.GetComponent<NavMeshAgent>();

        ZepetoPlayers.instance.OnAddedLocalPlayer.AddListener(() => {
            this._target = ZepetoPlayers.instance.GetPlayer(WorldService.userId).character.transform;
        })

        this._navMeshAgent.SetDestination(this._target.position);
    }
}