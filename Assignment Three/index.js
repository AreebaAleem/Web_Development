const http = require('http');

http.createServer(function(req, res) {
    console.log(req.url);
    switch(req.url) {
        case "/":
    res.write("<h1>Home Page</h1>");
        break;
        case "/products.html":
            res.write("<h1>Products</h1>");
                break;
    default:
    res.write("Page not found");
        break;
        
    }
    res.end();
})
.listen(8080);