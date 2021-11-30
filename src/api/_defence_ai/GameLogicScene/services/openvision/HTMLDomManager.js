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



  decodeHTMLEntities (str) {
    // this prevents any overhead from creating the object each time
    var element = document.createElement('div');
    if(str && typeof str === 'string') {
      // strip script/html tags
      str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '');
      str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '');
      element.innerHTML = str;
      str = element.textContent;
      element.textContent = '';
    }

    return str;
  }


  badAttemptsNotifyAI(){

  }


  sanitize(input){

    var tagsToReplace = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;'
    };
    return input.replace(/[&<>]/g, function(tag) {
        return tagsToReplace[tag] || tag;
    });

  }

  encodeUrl(baseUrl,partsQuery){
  	var url = baseUrl +"/?data=" + encodeURIComponent(partsQuery)
  }

  escapeData(data){
  	return encodeURIComponent(data)
  }


}