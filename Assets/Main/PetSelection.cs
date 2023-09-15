using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PetSelection : MonoBehaviour
{
    public GameObject button;
    private int selection = 0;
    
    public List<GameObject> models = new List<GameObject>();

    public void OnClick(){
        models[selection].SetActive(false);
        selection++;
        models[selection].SetActive(true);
    }

    private void Start(){
        foreach(GameObject go in models){
            go.SetActive(false);
        }
        models[selection].SetActive(true);
    }
    private void Update(){
        
    }
}
