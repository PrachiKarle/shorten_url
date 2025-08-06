var url = require("url");
var http = require("http");
var fs = require("fs");
var path = require("path");
const querystring = require("querystring");

//generate random url path
function generateShortCode(length = 6) {
  const chars ="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < length; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}


//map that url
const urlMap = {};



var server = http.createServer((req, res) => {
  
    //load home page
  if (req.url === "/") {
    const filePath = path.join(__dirname, "public", "home.html");
    fs.readFile(filePath, (err, content) => {
      res.writeHead(200, { "content-type": "text/html" });
      res.end(content);
    });
  } 
  
  
  //shorten logic
  else if (req.url === "/shorten" && req.method === "POST") {

    //access url input
    let longurl = "";
    req.on("data", (d) => {
      longurl += d.toString();
    });

    req.on("end", () => {
      const parsedData = querystring.parse(longurl);
      const longUrl = parsedData.longUrl;

      //generate short code;
      const shortCode = generateShortCode();
      //store in object 
      urlMap[shortCode] = longUrl;
      
      //display to user
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(
        `<a href=http://localhost:3000/${shortCode}>http://localhost:3000/${shortCode}</a> `
      );
    });
  } 
  
  //shorten url redirection
  else if (req.method === "GET") {
    const code = req.url.slice(1);

    if (urlMap[code]) {
      res.writeHead(302, { Location: urlMap[code] });
      res.end();
    } 
    
    else {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Short URL not found");
    }
  }
});


//server listen
server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
