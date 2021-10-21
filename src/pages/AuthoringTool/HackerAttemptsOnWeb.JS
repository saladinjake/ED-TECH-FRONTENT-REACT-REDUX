/*
*Secures all events of the user
* Artificial Intelligence Detector
*/

import swal from "sweetalert"
import $ from "jquery"
class HackerDetectedObj {
	//detects how many worng attempts has been done to 
	//gain access or action failed attempt
	constructor(){
	  this.redFlagRaised = false;
	  this.redflagRegex = /^$/;
	  this.attempts = 1; // dont be so graceful once he tries to hack once
	   // launch your own browser attack back to the user who is trying to hack into questence application
	
    // the db does not handle sanity chk in the backend
    //this is bad
    this.scriptTagRegexAttack =  /<script\b[^>]*>([\s\S]*?)<\/script>/gm;
    this.alertRegexAttack = /^/
    this.securityMeasuresMiddleWares =[
      'browserLoop',
      'deleteUserAccount',
      'hijackUserBrowsers',
      'disableClicksAndOtherMousePointerEvents',
       // more inspirations will come



    ];
  }


  dataInputScanner(rawInputData){
    //var nameBuilder = `[name=${key}]`;
    var lines = rawInputData.split('\n');
      for(var i = 0;i < lines.length;i++){
         //code here using lines[i] which will give you each line
         //scrutinize each line against a flaw or attack
         var sample = `A bad person might want to do this type
           of thing to save a bad content to break the application
           you cant trust anybody on the internet

          <script type="text/javascript">\nalert(\'1\');
          \n</script>\n\n<div>Test</div>\n\n
          <script type="text/javascript">\nalert(\'2\');\n</script>`;
         var scripttext = lines[i]; //loop thru each line of text
         var match;
         while (match = this.scriptTagRegexAttac.exec(scripttext)) {
            // full match is in match[0], whereas captured groups are in ...[1], ...[2], etc.
            console.log(match[1]);
            //if match is made once
            //then let the AI LAUNCH ITS OWN PREVENTION MECHANISM
            //TO DESTROY USERS BROWSERS ACTION
            if(match[1]){
               this.redFlagRaised = true;
               break; // bail out of the user  flagged as hacker
            }
         }
      }
      if(this.redFlagRaised){
        this.raiseAlarm(); // you cant save any of the data here
        //since it fails sanitization test
        //most especially if exploit is made in the html forms that accepts
        //html inputs as data, one needs to be very careful
        return false
      }else{
        //safe check so user can save his data now
        return true

      }
  }


  raiseAlarm(){
     this.detected()
  }
	 
  detected(){
    if(this.redFlagRaised){
      let allforms =$("form");
      // in real life scenario all gates will be locked down
      //due to security breach
      //so we need to hide all form inputs
      //disable all form inputs first
      //then lauch security counter attack on the user
      allforms.each(() => {
         let fleetForm = $(this);
         fleetForm.fadeOut("fast");
         let childrenOfForms = fleetForm.children();
         childrenOfForms.each(() => {
            let element = $(this);
            element.remove();
         });
         
         //yes let the hack see this nav run away from him
         $("header").animate({
            position:"absolute",
             top:"-900000px"
           }).css({display:"none"}).fadeOut(function(){
             //trigger the instantiation of the counter attack here
             // send email to the admin that the current user
             //or anonymous user is a hacker by geting the users ip address
               let hackerIp = this.getUsersIPAddress();
               //build the email to the admin
               let emailBuilder = {
                 to:"admin@questence.org",
                 from:"juwavictor@gmail.com",
                 message:`
                    <style>
                      /*beaty jacket of the html css alert message*/
                    </style>
                    <div class="message-hacked">
                   <h1>Hello Admin, <h1>
                         <p>it has been noticed that
                           the user with the ip address ${hackerIp}
                           has performed ${this.attempts} hacking attempts
                           on the application form in the url link threathened for 
                           exploitation ${window.location.href}. Please if your
                           backend supports ip black listing or banning , you are expected
                           to treat this message as a critical one.</p>
                           <h4>-- Support Team</h4>
                           <p>Victor Juwa : Questence Software Team </p>
                    </div>
                 `
               }
             //so admin can blacklist the user too

             // or send info to backend that the user is a hacker

             //so that python  backend can send hacking attempts to users browser
             //that will affect the users machine since python
             // is built for penetration and testing
             swal("Warning", "DO NOT TRY TO HACK INTO QUESTENCE !!!");
           },4000)

          $("body > div").css({display:"none"})
      });


      //launch security measures as middlewares power pack async action

     
    }
  }

  getUsersIPAddress() {
    let xmlhttp = null;
    if (window.XMLHttpRequest){
      xmlhttp = new XMLHttpRequest();
    }else {
      xmlhttp = new window.ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.open("GET","http://api.hostip.info/get_html.php",false);
    xmlhttp.send();

    let hostipInfo = xmlhttp.responseText.split("\n");
    let hackersIpAddress = null;

    for (let i=0; hostipInfo.length >= i; i++) {
        let ipAddress = hostipInfo[i].split(":");
        if ( ipAddress[0] == "IP" ){
         hackersIpAddress = ipAddress[1];
        } 
    }
    let recheckIp = [];

    if(!hackersIpAddress){
       //try another source  to confirm the ip address is not hopping
       $.getJSON('https://api.ipify.org?format=json', function(data){
          console.log(data.ip);
          recheckIp.push(data.ip)
        });
    }

    if(recheckIp.length> 0){
       if(recheckIp[0]== hackersIpAddress){
          return hackersIpAddress
       }
       return recheckIp[0]
    }else{
      return hackersIpAddress
    }

    return false;
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


//test the working of the hack classlet 
export const HackerDetected = new HackerDetectedObj();
