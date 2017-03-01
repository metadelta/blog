var fs = require('fs');

var findAndAddTo = '<script src="https://cdnjs.cloudflare.com/ajax/libs/require.js/2.1.10/require.min.js"></script>';

function getFileString(path){
  var file = fs.readFileSync(path, "utf8");
  return file;
}

function writeFileString(path, dataStr){
  fs.writeFileSync(path, dataStr, { encoding: 'utf8', flag: 'w' });
}

var htmlDir = __dirname + '/posts/';
var oFiles = fs.readdirSync(htmlDir);

for(var i = 0; i < fs.readdirSync(htmlDir).length; i++){
  writeFileString(getFileString(htmlDir + oFiles[i]).replace(findAndAddTo, findAndAddTo +
  '<meta name="twitter:card" content="summary">
                <meta name="twitter:site" content="@metadeltamath">
                <meta name="twitter:title" content="Metadelta">
                <meta name="twitter:description" content="A blog at the intersection of math and computer science.">' )); 
}
