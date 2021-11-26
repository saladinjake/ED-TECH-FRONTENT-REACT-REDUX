/*An observer of all user activity*/
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
      this.config = Config;

      this.moveList =[];
      this.userActions =[];
      this.targetMachine="127.0.0.1";
      this.handshake=0;
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
