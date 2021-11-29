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

/*user can only have one cart*/
export class ShoppingCartEncrypted{
  //fake name is : giffy_image_*
  constructor(User){
    this.signature ="https://questence.org"
    this.key = process.env.PUBLIC_KEY_ENCRYPTER_1
    this.finalSignature = `${this.signature}_${this.key}`;
    this.redFlag = true;
    this.SecurityBot = new  ARTIFICIAL_INTELLIGENCE_BOT();
    this.userOnline =User.getInstance()  // one to one relationship
  }


  static getInstance() {
    if (!User.instance) {
      User.instance=new User('','');
    }
    return User.instance;
  }
    hasCartDataBeenTamperedWith =(cart) =>{
       if(this.isIllegalCart(cart)){
         this.SecurityBot.getCurrentUser(User)
          .banUser()
          .notifyAdmin()
          .initiateSelfDefence()// continously loops to determine user activity or persistence
          
       }
    }

    isIllegalCart =(cart) => {
        const decryptedCartString = this.DecryptCart(cart);
        if(this.cartWasInflatedOrDeflated(decryptedCartString)){
            return true
        }else{
            return false
        }
    }

    cartWasInflatedOrDeflated =(decryptedCartString) =>{
        const validated = this.analyseCartOriginality(decryptedCartString);
        if(!validated){
            return true
        }else{
            return false
        }
    }

    analyseCartOriginality =async (decryptedCartString) => {
        /*check if the price of the course has been inflated or deflated by the user*/
        /*also check if the digital decrypted data is of same signature*/
       //stopped here today 25/11/2021
      
    }

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
 