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








