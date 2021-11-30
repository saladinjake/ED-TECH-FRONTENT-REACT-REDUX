export class HTMLDomManager{
	constructor(){
		this.allFormsOnCurrentPage = [];
		this.currentForm = null;
		this.currentInput = null;
	}
	onKeyUp = (event) =>{
		this.currentInput = event.target;
      this.preventInputFromSQLInjection(this.currentInput)
	}

	onLoadPage = (event) =>{
		this.allFormsOnCurrentPage = document.getElementsByTagName("form");
		this.preventAllFieldFromSQLInjection(this.allFormsOnCurrentPage)
	}

	onClickSubscriber = (event) =>{
		this.allFormsOnCurrentPage = document.getElementsByTagName("form");
		this.preventAllFieldFromSQLInjection(this.allFormsOnCurrentPage)
	
	}

	sqlInjectionPrevent = (inputValue) =>{
		inputValue =  inputValue.trim();
		inputValue = this.decodeHtmlEntity(inputValue)
	}


	decodeHtml(html) {
       var txt = document.createElement("textarea");
       txt.innerHTML = html;
       return txt.value;
    }



    // encode(decode) html text into html entity// var entity = '&#39640;&#32423;&#31243;&#24207;&#35774;&#35745;';
	// var str = '高级程序设计';
	// console.log(decodeHtmlEntity(entity) === str);
	// console.log(encodeHtmlEntity(str) === entity);
	decodeHtmlEntity = function(str) {
	  return str.replace(/&#(\d+);/g, function(match, dec) {
	    return String.fromCharCode(dec);
	  });
	};

	encodeHtmlEntity = function(str) {
	  var buf = [];
	  for (var i=str.length-1;i>=0;i--) {
	    buf.unshift(['&#', str[i].charCodeAt(), ';'].join(''));
	  }
	  return buf.join('');
	};


}