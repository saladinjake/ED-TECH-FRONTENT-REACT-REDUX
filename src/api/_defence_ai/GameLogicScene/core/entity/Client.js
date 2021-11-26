class Client {
  constructor(uniqueEmail,uniqueTokenAccess) {
    
    if(!this.emailField && !this.tokenField){
      User.redirect("login")
    }
    this.emailField=uniqueEmail;
    this.tokenField=uniqueTokenAccess;
    this.previledges={
    	shoppingCart:true,
    	authenticatedRoute:true,
    	noAdminRights: true,
    	//guess the right word to grant u admin access heheh!!! 
    };
    this.isAuthenticated = false;

    this.shoppingCart = ShoppingCartEncrypted.getInstance() || []// you only have one shopping cart 
    User.instance=this;
  }

  static redirect =(path)=>{
  	window.location.href=process.env.PUBLIC_URL+ "/" +path
  }

  getMyCredentials =() =>{
  	let credentials = []
  	if(localStorage.getItem("user")){
  	  credentials = JSON.parse(localStorage.getItem("user"))
  	  this.isAuthenticated = true
  	  return credentials
  	}else{
  	 return [] 
  	}
    return credentials
  	
  }
  isAuthenticated =() => {
  	if(this.isAuthenticated){
  		return true
  	}
  	return false
  }
  isPreviledged =() => {
  	let previledges = this.previledges;
  	previledges = Object.keys(previledges);
  	const isTrue = (currentValue) => previledges[currentValue] == true;
  	return previledges.every(isTrue);

  }

  static getInstance() {
    if (!User.instance) {
      User.instance=new User(User.getEmail(),User.getToken());
    }
    return User.instance;
  }

  static getCart(){
  	
  }

  static getEmail(){
   return this.emailField
  }

  static getToken(){
   return this.tokenField
  }

  static die = (msg="try another move") =>{
     throw new Error(msg)
  }

    /*each of these calls will present unique algorithm for encryption and decrytion*/
  encodeUserData =() =>{
    //fake name_key : y3i4&^http://
  }
  encodeToken =() => {}
  encodeRolesAndPreviledges =() =>{}
  encodeAccessToken = () => {}

}