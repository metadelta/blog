var fs = require('fs');
var cheerio = require('cheerio');

var posts = [];
var htmlDir = __dirname + '/posts/';

function getFileString(path){
  var file = fs.readFileSync(path, "utf8");
  return file;
}

function writeFileString(path, dataStr){
  fs.writeFileSync(path, dataStr, { encoding: 'utf8', flag: 'w' });
}

console.log('Build directory:\n' + htmlDir);

var originalHtmlFiles = fs.readdirSync(htmlDir);
console.log('Files to be built:\n' + originalHtmlFiles);

// Grab titles and subtitles from each message
for(var i = 0; i < fs.readdirSync(htmlDir).length; i++){
  var $ = cheerio.load(getFileString(htmlDir + originalHtmlFiles[i]));
  var title = $('h1').text();
  var subtitle = $('h2').text();
  var link = 'posts/' + originalHtmlFiles[i];

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
var $ = cheerio.load(__dirname + '/template.html');

var injectionPayload = '';
for(var i = 0; i < posts.length; i++){
  injectionPayload += (''+
  '\n<section> <header class="major">\n' + 
  '  <h2>\n    ' + 
    posts[i].title +
  '\n  </h2>\n' +
  '</header>\n' +
  '\n<p>\n'
  + posts[i].subtitle +
  '\n</p>\n' +
  '<ul class="actions">\n' +
  '  <li><a href="' + posts[i].link+ '" class="button">Read This</a></li>\n' +
  '</ul></section>');

  if(i != posts.length - 1)
    injectionPayload += '<hr />';
}

// console.log('Payload to be injected into index.html: ' + injectionPayload);

// console.log('Original html: '+ getFileString($.html()) );

// Insert payload
// console.log(getFileString($.html()).replace('{{ LINKS }}', injectionPayload));

writeFileString(__dirname + '/index.html', getFileString($.html()).replace('{{ LINKS }}', injectionPayload));
