import DirectoryScanner "./DirectoryScanner"
export class TextFilesEncryption{
    constructor(){}
   encryptMyCodeFile= (file) => {
     /****code template by default is commented out****/
     const codeFiles = DirectoryScanner.nthDirectoryScanCodeFiles("./src") 
    /*code is encrypted but stillworks*/
    /*its useless to download something ciphered*/
     codeFiles.forEach(file=>{
         const filePaths = EncryptionAlgorithm.encryptIt(file);
         const fileContents = fs.readFileAsync(filePaths);
         let actionableEncryptedCode = Function('return ' + fileContents)();
         fs.writeFileAsync(filePaths,actionableEncryptedCode)
     })
    
   }

   decryptMyCodeFile = (file) => {
     /****code template by default is commented out****/
     const codeFiles = DirectoryScanner.nthDirectoryScanCodeFiles("/") // root directory
     codeFiles.forEach(file=>{
        const filePaths = DecryptionAlgorithm.decryptIt(file)
         const fileContents = fs.readFileAsync(filePaths);
         let unactionableDecryptedCode = this.removeActionableCode(fileContents)
         fs.writeFileAsync(filePaths,unactionableDecryptedCode)
     })
   }

   removeActionableCode(){

   }

   

   removeSriptSourceFilesIfIlegallyDownloadedByHostingProvider(){

   }
}
