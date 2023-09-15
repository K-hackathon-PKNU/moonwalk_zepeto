using System.Collections;
using System.Collections.Generic;
using System.Net;
using UnityEngine;
using UnityEngine.Networking;
using UnityEngine.SceneManagement;

public class LoginController : MonoBehaviour
{
    public void ButtonClick()
    {
        Debug.Log("Btn Clicked");
        //StartCoroutine(getRequest("http://www.my-server.com/myform"));
        //StartCoroutine(postRequset("http://www.my-server.com/myform"));
        SceneManager.LoadScene("Main");
    }

    // GET
    IEnumerator getRequest(string url){
        UnityWebRequest www = UnityWebRequest.Get(url);
        yield return www.SendWebRequest();
        
        if(www.isNetworkError || www.isHttpError){
            Debug.Log(www.error);
        }
        else{
            Debug.Log("Received : " + www.downloadHandler.text);
        }
    }

    // POST
    IEnumerator postRequset(string url){
        WWWForm form = new WWWForm();
        form.AddField("myField", "myData");

        UnityWebRequest www = UnityWebRequest.Post(url, form);
        yield return www.SendWebRequest();
        
        if(www.isNetworkError || www.isHttpError){
            Debug.Log(www.error);
        }
        else{
            Debug.Log("Received : " + www.downloadHandler.text);
        }
    }
}
