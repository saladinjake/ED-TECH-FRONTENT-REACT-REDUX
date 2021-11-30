import Client from "./entity/Client"

export class Hacker extends Client {
  constructor(emailField,tokenField){
    this.emailField =emailField
    this.tokenField =tokenField;
    this.hackersMoves = [ 
    '/(\/\*.*\*\/)/Us',
    '/(\t)/',
    '/(javascript\s*:)/Usi',
    '/(@import)/Usi',
    '/style=[^<]*((expression\s*?\([^<]*?\))|(behavior\s*:))[^<]*(?=\>)/Uis',
    '/(ondblclick|onclick|onkeydown|onkeypress|onkeyup|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onload|onunload|onerror)=[^<]*(?=\>)/Uis',
    '/<\/?(script|meta|link|frame|iframe).*>/Uis',
    '/src=[^<]*base64[^<]*(?=\>)/Uis',]


  }
  checkUserActivity =() =>{}
  logAllUserActions =() =>{}

  tappedUrl =(url) =>{
    url = window.location.href;
    if(url.match()){

    }

  }


}
