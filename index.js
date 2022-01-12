const http = require("http")
const fs = require("fs")
const jimp = require("jimp")
const url = require("url")


http.createServer((req, res) => {
    const params = url.parse(req.url, true).query;
    const imgUrl = params.urlImg

    if (req.url == "/") {
        res.writeHead(200, {"Content-Type" : "text/html"})
        fs.readFile("index.html", "utf-8", (err, html) => {
            res.end(html)
        })
    }
    if (req.url == "/estilos") {
        res.writeHead(200, {"Content-Type" : "text/css"})
        fs.readFile("estilos.css", "utf-8", (err, css) => {
            res.end(css)
        })
        
    }
    if (req.url.includes("/resultado")) {

        jimp.read(imgUrl, (err, imagen) => {
            imagen
                .resize(325, jimp.AUTO)
                .quality(60)
                .greyscale()
                .writeAsync("newImg.jpg")
                .then(()=> {
                    fs.readFile("newImg.jpg", (err, img) => {
                        res.writeHead(200, {"Content-Type" : "image/jpeg"})
                        res.end(img)
                    })
                })
        })
    }
})
.listen(3000, () => console.log ("Servidor levantado en puerto 3000"))