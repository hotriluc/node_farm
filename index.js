const fs = require('fs');
const http = require('http');
const url = require('url');

/*========FILES========*/
// blocking in synchronous way
// const textIn = fs.readFileSync('./txt/input.txt','utf-8');
// console.log(textIn);
// const textOut = `This is what we know about the avocado: ${textIn}\nCreated on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', textOut);
// console.log('File has been written into the file');

// non blockig asynchronous way
/*
fs.readFile('./txt/start.txt', 'utf-8',(e, data) => {
    fs.readFile(`./txt/${data}.txt`, 'utf-8',(e, data2) => {
        console.log(data2);
        fs.readFile(`./txt/append.txt`, 'utf-8',(e, data3) => {
            console.log(data3);

            fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', err =>{
                console.log('your file has been written');
            })
        });
    }); 
});
console.log('Will read file!');
*/



/*========SERVER========*/
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const productData = JSON.parse(data);

const server = http.createServer( (req, res)=>{
    // gettting URL
    const pathName = req.url;
    
    // Routing
    // Overview page
    if (pathName ==='/' || pathName === '/overview') {
        res.end("This overview page");
    // Product page
    } else if (pathName === '/product'){
        res.end("This is the product page");
    // API
    } else if (pathName === '/api'){
        res.writeHead(200, {'Content-type': 'application/json'} )
        res.end(data);
    // Not found
    } else {
        res.writeHead(404, {
            'Content-type': 'text/html'
        });
        res.end("<h1>Page not found</h1>");
    }
});

server.listen(8000, 'localhost', ()=>{
    console.log('Listening to requests on the port 8000');
});