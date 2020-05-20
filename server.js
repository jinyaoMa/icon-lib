var http = require('http')
var fs = require('fs')

var TARGET_TEST_HTML_FILE = './build/index.html'; // 修改测试目标

http.createServer().on('request', function (req, res) {
  try {
    if (req.url === '/') {
      fs.readFile(TARGET_TEST_HTML_FILE, function (err, data) {
        if (err) {
          res.setHeader('Content-Type', 'text/plain; charset=utf-8')
          res.end('ERROR')
        } else {
          res.setHeader('Content-Type', 'text/html; charset=utf-8')
          res.end(data)
        }
      })
    } else if (req.url.includes('font-mustom')) {
      fs.readFile('./build' + req.url, function (err, data) {
        if (err) {
          res.end('ERROR')
        } else {
          res.end(data)
        }
      })
    }
  } catch (error) {
    console.log(error)
  }
}).listen(3000, function () {
  console.log('http://localhost:3000')
})