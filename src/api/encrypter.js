/*
*@code_description: 
*to encrypt user session or local store data on browser to avoid xss sniffing
* to prevent stealing users session
* production use only
*Also Used to encrypt the entire codebase to prevent stolen code in the production pipeline
*
*/
import AES from "crypto-js/aes";
import Utf8 from "crypto-js/enc-utf8";
import dotenv from "dotenv";


dotenv.config();

export class CartEncrypter{
  //fake name is : giffy_image_*
    hasCartDataBeenTamperedWith =() =>{

    }

    isIllegalCart =() => {}

    /*cart encryption decryption*/
     EncryptCart = (value)=> 
    {
      var result="";
      for(let i=0;i<value.length;i++)
      {
        if(i<value.length-1)
        {
            result+=value.charCodeAt(i)+10;
            result+="-";
        }
        else
        {
            result+=value.charCodeAt(i)+10;
        }
      }
      return result;
    }

     DecryptCart = (value) =>
    {
      var result="";
      var array = value.split("-");
      for(let i=0;i<array.length;i++)
      {
        result+=String.fromCharCode(array[i]-10);
      }
      return result;
    } 

    reEncrypt = (noOfTimes=9, input,addJaraToMixIt) =>{
        //more secured algorithm
    }

    reDecrypt = (noOfTimes=9, inputFeed,addJaraToMixIt) => {
          //more secured algorithm
          let i =0;
          let initialHeadCrypto = [inputFeed];

          //a cyclic encryption
         do{
           if(i==0){
             inputFeed =DecryptCart(inputFeed)
           }else{
             inputFeed =DecryptCart(inputFeed)
           }
           i++
         }while(i<noOfTimes)
          
    }
   
}

export class UserCredentialEncrypter{
  /*each of these calls will present unique algorithm for encryption and decrytion*/
  encodeUserData =() =>{
    //fake name_key : y3i4&^http://
  }
  encodeToken =() => {}
  encodeRolesAndPreviledges =() =>{}
  encodeAccessToken = () => {}
}

export class TextToBinaryBitsEncrypter{

}

export class TextFilesEncryption{

}

export class AHackerWasHere{
  checkUserActivity =() =>{}
  logAllUserActions =() =>{}

}

export class ARTIFICIAL_INTELLIGENCE_BOT{
  lockOnTargetMachine =() =>{}
  isGoodGuy =() =>{}
  isEnemy =() => {}
  learnFromUsersActivity =() =>{}
  disableKeys =() =>{}
  redFlag =() => {}
  safeMode =() => {}
  defenceMode =() => {}
}



export default class QuestenceObfuscate{

  constructor(){
    this.allowedHost = [{
      host_type: "dev",
      host_port:"9999",
      code_developer:"saladinjake",
      host_origin:"http://localhost:9999",
      host_signature:"A_signature_key_with_the_backend_server_api",
      user_token:"",
      user_data:[]
    },

    {
       host_type: "staging",
      host_port:"9999",
      code_developer:"tobi",
      host_origin:"http://localhost:9999",
      host_signature:"A_signature_key_with_the_backend_server_api",
      user_token:"",
      user_data:[]
    },

    {
       host_type: "production",
      host_port:"",
      code_developer:"Chief Kayode Sodimu",
      host_origin:"https://questence.org",
      host_signature:"A_signature_key_with_the_backend_server_api",
      user_token:"",
      user_data:[]
    },

    {

       host_type: "production",
      host_port:"",
      code_developer:"Nil",
      isClient:true, // FOR ANY OTHER CLIENTEL BROWSING THE SYSTEM
      host_origin:"https://questence.org",
      host_signature:"A_signature_key_with_the_backend_server_api",
      user_token:"",
      user_data:[]
    },


    ]
  }


  launch = () =>{
    let url = window.location.href;
    const userIsAllowed = false
    for(let index=0;index<this.allowedHost.length;index++){
       const safeHaven = this.allowedHost[index];
       const linkAllowedToRun = safeHaven.host_origin;
       if(url==linkAllowedToRun){
         userIsAllowed = true;
         break;
       }
    }
    if(userIsAllowed){
      const { 
        PUBLIC_KEY_ENCRYPTER_1,
        PUBLIC_KEY_ENCRYPTER_2,
        PUBLIC_KEY_ENCRYPTER_3,
        PUBLIC_KEY_ENCRYPTER_4  
       } = process.env;
      this.______reverseEngineer([ //encapsulate internal workings
        PUBLIC_KEY_ENCRYPTER_1,
        PUBLIC_KEY_ENCRYPTER_2,
        PUBLIC_KEY_ENCRYPTER_3,
        PUBLIC_KEY_ENCRYPTER_4 ]) // ensure user browser data are encrypted
    }else{
      this.killScript(`
        You are not allowed to run
       this software on your machine. 
       You are not a questence developer`)
    }

  }

  killScript = (message) =>{
    setInterval(()=>{
       //hehe!! a hell loop for you
       ((forEver)=>{
         if(forEver==true){
           const allTagsShouldCryOut = document.querySelector("*");
           allTagsShouldCryOut.textContent = message;
         }else{
          //you cant escape
          this.killScript()
         }
        
       })(true)

    },3000)
  }



  plain = (publicKeys=[]) =>{
    this._______remake(publicKeys);
  }

  ______reverseEngineer  = (publicKeys = []) =>{
      /*decription algorithm*/
      /*logged in users browser data that needs to be secured against hackers*/
      const localStorageKeys = [
        "total",
        "totalwish",
        "wishes",
        "cart",
        "user",
        "access_token",
        "user_roles",
        "token"
           ]; // lets secure all these data from being stolen
      
      localStorageKeys.forEach(placeHolder =>{
          if(localStorage.getItem(placeHolder)){
             const plain_content = localStorage.getItem(placeHolder);
             const encryptStep1 = this.___encryptLogicOne(
              publicKeys[0],
              placeHolder,
              plain_content
            );
             const encryptStep2 = this.___encryptLogicOne(
              publicKeys[0],
              placeHolder,
              encryptStep1
            );
             const encryptStep3 = this.___encryptLogicOne(
              publicKeys[0],
              placeHolder,
              encryptStep2
            );
             const encryptStep4 = this.___encryptLogicOne(
              publicKeys[0],
              placeHolder,
              encryptStep3
            );
          }
      })
  }



  _______remake = (publicKeys,keyHolder,encryptedData) => {
     const localStorageKeys = [
        "total",
        "totalwish",
        "wishes",
        "cart",
        "user",
        "access_token",
        "user_roles",
        "token"
           ]; // lets secure all these data from being stolen
      
      localStorageKeys.forEach(placeHolder =>{
          if(localStorage.getItem(placeHolder)){
             const plain_content = localStorage.getItem(placeHolder);
             const encryptStep1 = this.___decipherLogicFour(
              publicKeys[0],
              placeHolder,
              plain_content
            );
             const encryptStep2 = this.___decipherLogicThree(
              publicKeys[0],
              placeHolder,
              encryptStep1
            );
             const encryptStep3 = this.___decipherLogicTwo(
              publicKeys[0],
              placeHolder,
              encryptStep2
            );
             const encryptStep4 = this.___decipherLogicOne(
              publicKeys[0],
              placeHolder,
              encryptStep3
            );
          }
      })

  }

   ___decipherLogicOne = (publicKey, keyHolder,lineOfCode) =>{
    const textToChars = (text) => text.split("").map((c) => c.charCodeAt(0));
    const applySaltToChar = (code) => textToChars(publicKey).reduce((a, b) => a ^ b, code);
    lineOfCode = lineOfCode.match(/.{1,2}/g)
      .map((hex) => parseInt(hex, 16))
      .map(applySaltToChar)
      .map((charCode) => String.fromCharCode(charCode))
      .join("");
      localStorage.setItem(keyHolder,lineOfCode);
      return lineOfCode
  }

  ___decipherLogicTwo = (publicKey, keyHolder,lineOfCode) =>{

    const bytes = AES.decrypt(lineOfCode, publicKey);
    const originalText = bytes.toString(Utf8);
    localStorage.setItem(keyHolder,originalText);
    return originalText;
  }

  ___decipherLogicThree = (publicKey, keyHolder,lineOfCode) =>{
    

    localStorage.setItem(keyHolder,lineOfCode);
     
  }

  ___decipherLogicFour = (publicKey, keyHolder,lineOfCode) =>{
    

    localStorage.setItem(keyHolder,lineOfCode);
    
  }

  ___encryptLogicOne = (publicKey,keyHolder, plain) =>{

    const textToChars = (plain) => plain.split("").map((c) => c.charCodeAt(0));
  const byteHex = (n) => ("0" + Number(n).toString(16)).substr(-2);
  const applySaltToChar = (code) => textToChars(publicKey).reduce((a, b) => a ^ b, code);

  plain = plain.split("").map(textToChars)
          .map(applySaltToChar)
          .map(byteHex)
          .join("");
    localStorage.setItem(keyHolder,plain);
    return plain
  }

  ___encryptLogicTwo = (publicKey,keyHolder, plain) =>{

    plain = AES.encrypt(plain, publicKey).toString();
    localStorage.setItem(keyHolder,plain);
     return plain
  }

  ___encryptLogicThree = (publicKey,keyHolder, plain) =>{

    localStorage.setItem(keyHolder,plain);
     return plain
    
  }

  ___encryptLogicFour = (publicKey,keyHolder, plain) =>{

    localStorage.setItem(keyHolder,plain);
     return plain
    
  }
}






















function encryption(publicKey,text)    
{    
    var inputString = text;      
    var outputString = ""    
    var asciiArr = new Array();    
    var atozArr = new Array();    
    var encryptedString = new Array();    
    if(inputString.length != 0)    
    {    
        outputString = "";    
        //First Step: Convert all characters in ascii code       
        for(let i = 0; i < inputString.length; i++)    
        {    
            asciiArr[i] = inputString[i].charCodeAt(0);    
        }    
        //Second Step: Fill AtoZ array in capital or small letters       
        for(let i = 0, code = 65; i < 26; i++, code++)    
        {    
            atozArr[i] = String.fromCharCode(code);    
        }    
        //Third Step: Choose random single character index from A to Z      
       let position = randomIndexFromInterval(0, atozArr.length - 1);    
       let positionAscii = atozArr[position].charCodeAt(0);    
        //Fourth Step: Addition of every inputString element to positionAscii      
        for(let i = 0; i < inputString.length; i++)    
        {    
            encryptedString[i] = parseInt(asciiArr[i]) + parseInt(atozArr[position].charCodeAt(0));    
        }    
        //Fifth Step: Attach key to encrypted string      
        encryptedString[asciiArr.length] = positionAscii;    
        //Sixth Step: Finally your encryption is ready to send      
        for(let i = 0; i < encryptedString.length; i++)    
        {    
            outputString = outputString + String.fromCharCode(encryptedString[i]);    
        }    
        return outputString    
    }    
      
}    
    
function decryption(publicKey,cypheredText)    
{    
    var inputBox = cypheredText;    
    var plainText = "";    
    if(inputBox!= 0)    
    {    
        var encryptedString = inputBox;    
        var key = encryptedString[encryptedString.length - 1];    
        var decryptedString = new Array();    
        for(let i = 0; i < encryptedString.length - 1; i++)    
        {    
            decryptedString[i] = encryptedString[i].charCodeAt(0) - key.charCodeAt(0);    
        }    
        plainText = "";    
        for(let i = 0; i < decryptedString.length; i++)    
        {    
            plainText= plainText + String.fromCharCode(decryptedString[i]);    
        }    
    }    
      
}    
    
function randomIndexFromInterval(min, max)    
{    
    return Math.floor(Math.random() * (max - min + 1) + min);    
}   









/*cart encryption decryption*/
export const EncryptCart = (value)=> 
{
  var result="";
  for(let i=0;i<value.length;i++)
  {
    if(i<value.length-1)
    {
        result+=value.charCodeAt(i)+10;
        result+="-";
    }
    else
    {
        result+=value.charCodeAt(i)+10;
    }
  }
  return result;
}

export const DecryptCart = (value) =>
{
  var result="";
  var array = value.split("-");
  for(let i=0;i<array.length;i++)
  {
    result+=String.fromCharCode(array[i]-10);
  }
  return result;
} 