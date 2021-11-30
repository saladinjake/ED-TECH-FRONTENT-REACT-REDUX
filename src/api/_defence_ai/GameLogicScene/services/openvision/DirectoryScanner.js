import fs from "fs"
import path from "path"
export class DirectoryScanner{
	constructor(){
     this.whiteList =["src/"];
     this.blackLists =[".git","node_modules","public"]
	}
	readFiles(dirname="/src", onFileContent, onError) {
	  fs.readdir(dirname, function(err, filenames) {
	    if (err) {
	      onError(err);
	      return;
	    }
	    filenames.forEach(function(filename) {
	      fs.readFile(dirname + filename, 'utf-8', function(err, content) {
	        if (err) {
	          onError(err);
	          return;
	        }
	        onFileContent(filename, content);
	      });
	    });
	  });
	}

	scanCodeFiles(){
		var allfiles = {};
		this.readFiles('src/', (filename, content)=> {
		   data[filename] = content;
		},
		 (err)=> {
		  throw err;
		});
		return allfiles;
	}

	

	nthDirectoryScanCodeFiles =(dir) =>{
     return  this.nthDirectoryFilesReader(dir)
	}

	//or


	nthDirectoryFilesReader  = function(dirPath, arrayOfFiles) {
	 const files = fs.readdirSync(dirPath)
	 arrayOfFiles = arrayOfFiles || []

	  files.forEach(function(file) {
	    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
	      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles)
	    } else {
	      arrayOfFiles.push(path.join(__dirname, dirPath, "/", file))
	    }
	  })

	  return arrayOfFiles
	}



	//
    //  findInDir('./public/audio/', /\.mp3$/);

	findInDir (dir, filter, fileList = []) {
	  const files = fs.readdirSync(dir);

	  files.forEach((file) => {
	    const filePath = path.join(dir, file);
	    const fileStat = fs.lstatSync(filePath);

	    if (fileStat.isDirectory()) {
	      findInDir(filePath, filter, fileList);
	    } else if (filter.test(filePath)) {
	      fileList.push(filePath);
	    }
	  });

	  return fileList;
	}



}