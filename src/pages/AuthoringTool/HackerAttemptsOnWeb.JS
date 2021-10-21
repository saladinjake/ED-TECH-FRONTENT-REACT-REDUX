/*
*Secures all events of the user
* Artificial Intelligence Detector
*/

class HackerDetected{
	//detects how many worng attempts has been done to 
	//gain access or action failed attempt
	constructor(){
	  this.redFlagRaised = false;
	  this.redflagRegex = /^$/;
	  this.attempts = 1; // dont be so graceful once he tries to hack once
	   // launch your own browser attack back to the user who is trying to hack into questence application
	}
	

   
    detected(){
      if(this.redFlagRaised){
        let allforms =$("form");
        allforms.each(() => {
           let fleetForm = $(this);
           fleetForm.fadeOut("fast");
           let childrenOfForms = fleetForm.children();
           childrenOfForms.each(() => {
              let element = $(this);
              element.remove();
           });
        })
        this.makeUserBrowserAhellLoop()
      }
    }

    makeUserBrowserAhellLoop(){
      setInterval(()=> {
         // every 5mill micro sec 
         //send buffer packet to user local storage system
         for(let i =0; i<2000000000000000000000; i++){ ///  
           localStorage.setItem(Math.random()+new Date().toString(),"Dont ever try to hack into questence you fucker");
           // ensure user app still preopts to reload and send blob of new data for larg files //as packets to the user
           let arrayBufferPackets = new Blob(new Array(30000000000000));

           // if(window.sessionStorage){
           //    //set the cookie as a nice string of deception thinking he is gaining access to the service
           //    //
           //    if(){

           //    }
           // }
         }
      },500)

       //SEND USER TARGET IP ADDRESS WITH A BACKEND DENIAL OF SERVICE
    }
}