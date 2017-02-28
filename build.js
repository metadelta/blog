var fs = require('fs');
var cheerio = require('cheerio');

var posts = [];
var htmlDir = __dirname + '/build/';

function getFileString(path){
  var file = fs.readFileSync(path, "utf8");
  return file;
}

console.log('Build directory:\n' + htmlDir);

var originalHtmlFiles = fs.readdirSync(htmlDir);
console.log('Files to be built:\n' + originalHtmlFiles);

// Grab titles and subtitles from each message
for(var i = 0; i < fs.readdirSync(htmlDir).length; i++){
  var $ = cheerio.load(getFileString(htmlDir + originalHtmlFiles[i]));
  var title = $('h1').text();
  var subtitle = $('h2').text();
  var link = 'build/' + originalHtmlFiles[i];

//  console.log('title: ' + title);
//  console.log('sub: ' + subtitle);
//  console.log('link: ' + link);

  posts.push({
    title: title.substring(0, title.length - 1),
    subtitle: subtitle.substring(0, subtitle.length - 1),
    link: link
  });
}

// add to index.html
var $ = cheerio.load(__dirname + '/index.html');

var injectionPayload = '';
for(var i = 0; i < posts.length; i++){
  injectionPayload += (''+
  '\n<header class="major">\n' + 
  '  <h2>\n    ' + 
    posts[i].title +
  '\n  </h2>\n' +
  '</header>\n' +
  '\n<p>\n'
  + posts[i].subtitle +
  '\n</p>\n' +
  '<ul class="actions"\n' +
  '  <li><a href="' + posts[i].link+ '">Read This</a></li>\n' +
  '</ul>');
}

// console.log('Payload to be injected into index.html: ' + injectionPayload);

// console.log('Original html: '+ getFileString($.html()) );
