
/*A super AI......SYSTEM*/

import Config from "../../config/AIConfig"
 class AIComputer  {
	constructor(){
      this.modules ={
      	/**ALL AI LOGIC*/
      	logger: "../../services/openvision-ai/LoggerService",
      	spoofer:"../../services/openvision-ai/Spoofer",
      	domManager:'../../services/openvision-ai/HTMLDomManager',
      	client: "./Client", //user entity manager
      	diana:"../ComputerAI",
      };
      this.config = Config; // ai config settings
      /*an array of objects with key pair 
       @key: string event name
       @val: function acts as security checks for counter measures or counter attacks
      */
      this.moveList =[];// the computers learnt moves from studying the user
     
     /*an array of objects with key pair 
       @key: string event name
       @val: function to be fired when objects subscribes to fire up event
      */
      this.userActions =[]; // this is used to observe users action on our site.
      this.userBluePrintCredential={
      	"ipAddress":"",
      	"browserAgent":"",
      	"cookies":{},
      	"session_data":{},
      	"local_store":{
      		"user":[],
      		"access_token":"",
      		"brearer_token":"",
      		"lms_token":"",
      		"giffy_image_*":"" //refers to cart
      	},

      };
      this.handshake=0;
      //this.dianaRobot = AIComputer.getInstanceOf("diana")
	}


    lockOnTargetMachine =(User) =>{
     //get all info of the user who gets on the system
     // constantly update the user blue print to the computer ai to 
     // check if user has changed from guest user to authenticated user
     //or check if user tried an adultrated move 
     let clearIntervalValue = null; 
     //every 3 sec check if user has logged in and provide his full information via the api
     let computerHasIdentifiedUser = false;
     const reloopTimeFrame =3000 //3OOO MILLISEC
     clearIntervalValue = setInterval(() =>{
     	if(User.hasLoggedIn()){
     	  const Diana = this.getInstanceOf("diana");
     	  Diana.copyUserBluePrint(User) // diana now has user detail to know which user is the defaulter
           this.handshake = 1;
           this.userBluePrintCredential = User.getMachineInfo()
          // stop flooding the ai with useless request to constantly check his authentication request
          // let the ai do something else.. life is too short
          clearInterval(clearIntervalValue)
     	}else{
     		AIComputer.runBackgroundChecksOnUserEntity(User)
     	}
     },reloopTimeFrame)
    }

	getInstanceOf =(moduleKey)=>{
	  if(this.modules.hasOwnProperty(moduleKey)){
       return this.modules[moduleKey];
	  }else{
        console.log("what are you trying to do !!")
	  }
	}

	
	runSequence =() =>{
	 let allModules = Object.keys(this.modules);
	 allModules.forEach(moduleKeyName =>{
	 	this.modules[moduleKeyName] = require(this.modules[moduleKeyName]);
        const DianaRobot = AIComputer.getInstanceOf("diana")
	 	if(this.config.get("LEVEL_MODE")=="maintenance" && this.config.get("LEVEL_MODE")=="debug" || this.config.get("LEVEL_MODE")=="dev"){
			const isUserPermitted =  DianaRobot.checkUserRights(this.modules["client"]);
			if(isUserPermitted){
			    this.modules[moduleKeyName].sleep()
			}else{
			    this.modules[moduleKeyName].runSequence()
			}
		}else{
			DianaRobot.manageAndInspectAllModules(this.modules)
			 .handleTraceroute()
			 .administer()
		}

	 })
	}

  observeUserEventsSubscriptions =(User) =>{
    /*All attemptable users Event handlers are functions that will be notified when a certain event fires.*/
    const userEvents = {
      /*authentication subject and handlers*/
      "LOGIN_ATTEMPT":User.attachLoginEvents(),
      "SIGNUP_ATTEMPT":User.attachSignUpEvent(),
      "LOGOUT_ATTEMPTS": User.attachLogOutEvent(),
      "CART_ADDED_ATTEMPT":User.attachCartItemAddedEvent(),
      "CART_REMOVED_ATTEMPT":User.attachCartItemRemovedEvent(),
      "CART_ALTRATED_ATTEMPT":User.attachCartItemAlterEvent(),
      "USER_PROFILE_EDIT_ATTEMPT":User.attachCartItemAlterEvent(),
      "USER_PROFILE_DELETE_ATTEMPT":User.attachCartItemAlterEvent(),
      /*inspirations will come*/
    }

    this.userActions.push(userEvents)
  }

  masterUsersMoveList = () => {
  	const userMoves = this.userActions;
  	userMoves.forEach(userMove =>{
  		let moves = Object.keys(userMove).map(userAttempts =>{
  			if( AIComputer.redFlagRaisedOnAttempt(userAttempts)){
  				//block the move with a counter attack
  				AIComputer.unSubscribeEventSafely(userAttempts,userMoves[userAttempts] )
  			}else{
  				//allow the move as a safe move
  				AIComputer.fireEventSafely(userAttempts,userMoves[userAttempts] )
  			}
  		})
  	})
  }


   unSubscribeEventSafely =(KEY,User) => {

   	  	const userMoves = this.userActions;
	  	userMoves.forEach(userMove =>{
	  		let moves = Object.keys(userMove).map(userAttempts =>{
	  			if( AIComputer.redFlagRaisedOnAttempt(userAttempts)){
	  				//block the move with a counter attack
	  				console.log("you lost previledge to perform that action based on the fact that you cheated")
	  			    if(userAttempts==KEY){
                       delete userMoves[KEY];
                       this.userActions = userMoves;
	  			    }

	  			    if(typeof userMoves[KEY]!=="Function"){
                      // bad move probably a hack
                      AIComputer.penalize(User)
	  			    }
	  			}
	  		})
	  	})

    }

  

















    start =() =>{
    	this.runSequence();
    }

    shutDown =() =>{
    	
    }




	
}



let AI = new AIComputer();
export default AI;
//Strategy pattern allows you to switch the algorithm or strategy based upon the situation.



//Template method defines the skeleton of how certain algorithm could be performed but defers the implementation of those steps to the children classes.
