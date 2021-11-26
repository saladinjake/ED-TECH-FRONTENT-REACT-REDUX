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

import Client from "./entity/Client"

/*there are no two users with the same userid*/

class User extends Client {
  constructor(email,token){
    super(email,token)
  }
}
