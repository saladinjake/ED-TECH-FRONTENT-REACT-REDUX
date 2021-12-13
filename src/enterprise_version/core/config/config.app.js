
/*Application Configuration settings*/
const url = window.location.href;

const isProduction = () => {
	if( url.match(/(https:\/\/)(questence)\.[a-z]{3}/) ){
      return true
	}else{
		return false
	}
}

const SecurityBreached = (isBreached=false) => {
  //incase of xss attack , mitm attacks, xcsrf attacks
}

const isDomanOfQuestence = () =>{
	//application will only run if its from questence production url
	// else all incoming request will be denied access
	if(window.location.href.match("https://questence.org")){
      return true
	}else{
		SecurityBreached(true)
		return false
	}
}





export const  ConfigApp = {
	APP_NAME: process.env.APP_NAME,
	APP_LOGO: process.env.APP_LOGO_URL,
	LOGIN_REQUIRED_ACCESS: true,
	SSO_SESSION_ENABLED: true,
	BANNING_ENABLED: true,
	IP_CONFIG_FINDER: true
	//"GEO_LOCATION_ADMIN_ACCESS": true, //for admin app
	PRODUCTION: isProduction()

}