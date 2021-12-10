
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
      /**is client confirmed will be true only if credentials are true*/
       isClientConfirmed: false,
      /*is client is allowed true for guest pages*/
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