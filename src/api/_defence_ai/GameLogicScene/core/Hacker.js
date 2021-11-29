import Client from "./entity/Client"
export class Hacker extends Client {
  constructor(emailField,tokenField){
    this.emailField =emailField
    this.tokenField =tokenField

  }
  checkUserActivity =() =>{}
  logAllUserActions =() =>{}


}
