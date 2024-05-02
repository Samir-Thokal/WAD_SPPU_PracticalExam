const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

const server  = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url);

  let filePath = path.join(__dirname, 'public', parsedUrl.pathname);

  if(filePath == path.join(__dirname, 'public', '/')) {
    filePath = path.join(__dirname, 'public', 'index.html');
  }

  fs.exists(filePath, (exists) => {
    if(exists) {
      fs.readFile(filePath, (err, data) => {
        if(err) {
          res.end('Internal Server error')
        }
        res.end(data);
      })
    }else{
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
    }
  })
})

server.listen(3000, () => {
  console.log("Server is listening on 3000");
})