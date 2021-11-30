import Computer from "./entity/Computer"


/*ARTIFICIAL INTELLIGENCE IN SOFTWARE SECURITY 
*@AUTHOR: SALADIN JAKE VICTOR
**
*@DEFINITION: INTERFACE BETWEEN THE REACT APP AND USER ACTIVITY
*
*
*
****/
export class DIANA extends Computer{ 
  constructor(User){
  	super()
  	this.engage = true;
  	this.redFlag =false;
   
  	this.falseAlarm = true; //never always trust a user  online
  }


  isGoodGuy =(User) =>{
  	if(User.isAuthenticated()){ //doesnt mean he is good
      Diana.notifyUserPrecenceToAllModules(User.getCredentials())
           .reAlignSecurityChecksOn(User)
        
  	}else{
  		Diana.reRunLastSecurityCheckSteps()
  	}
  }
  isEnemy =() => {
    if( this.redFlag){
      Diana.getInstance("logger").notifyScreen("You have been blocked. Try again after 5mins.")
           .checkUserPersistence(function(trial){
            
           })
    }
  }
  learnFromUsersActivity =() =>{}
  disableKeys =() =>{}
  redFlag =() => {}
  safeMode =() => {}
  defenceMode =() => {}
  initiateSelfDefence =() =>{}
  
  sleep =()=>{
  	this.engage =false
  	//if this was set to false by some hacker
  	setTimeout(()=>{
  		this.engage =true
  		this.autoInitialize()
  	},2000)

  	//run the auto reboot sequence and dis engage the sleepmode
  }
  reboot =() =>{
  	setTimeout(()=>{
  		startAI()
  	},3000)
  }
  autoInitialize = () =>{
  	this.startAI()
  }
  startAI =() =>{
  	if(this.enngage==true){
      super.start()
  	}
  	this.sleep()	
  }


  
}

