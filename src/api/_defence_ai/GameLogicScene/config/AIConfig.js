import fs from "fs"
let _singleton = null
class AIConfig{
  constructor(){
    if(!_singleton){
       _singleton = this;
     }

    this.dataStore = {};
    this.stringify = JSON.stringify;
    this.parser = JSON.parse;
    this.stringify = JSON.stringify;
      //this.localStore = localStorage;
    this.loadConfigFile(); //already called
    return _singleton;
  }

  loadConfigFile(file="/config.json"){
    try {

      const data = fs.readFileSync('./config.json', 'utf8');
      // parse JSON string to JSON object
      const initialConfig = JSON.parse(data);
      Object.keys(initialConfig).forEach(key => {
          AIConfig.setItem(key, initialConfig[key])
      });
    } catch (err) {
        console.log(`Error reading file from disk: ${err}`);
    }
  }

  updateConfigStore(key, value){
    try {
      //feedin data
      const data = fs.readFileSync('./config.json', 'utf8');
      // parse JSON string to JSON object
      const initialConfig = JSON.parse(data);
      //added data
      initialConfig[key] =value;
      // convert JSON object to a string
      let newData = JSON.stringify(initialConfig, null, 4);
      // write file to disk
      fs.writeFileSync('./config.json', newData, 'utf8');
      console.log(`File is written successfully!`);
    } catch (err) {
        console.log(`Error writing file: ${err}`);
    }
   
  }

  parse(valu){
    return this.stringify(valu, (key, val) =>{
      return (typeof val ==='function') ? val.toString().replace(/\t|\n/g, ''): val
    })
  }

  stringify(valu){
    return this.stringify(valu, (key,val)=>{
       if(typeof val === 'string'){
         var regexMe =/^function\s*\([^()]*\)\s*{.*}$/;
          if (regexMe.exec(val) !==null){
            return eval('key =' + val)
          }else{
            return val
          }
       }else{
          return val;
       }
    })
  }


  setItem(key, val){
    this.dataStore[key] = val;
  }

  getItem(key){
    return this.dataStore[key];
  }

  setConfig(key, val){
    this.dataStore[key] = val;
  }

  getConfig(key){
    return this.dataStore[key];
  }
}

let Configurations = new AIConfig();

export default  Configurations;