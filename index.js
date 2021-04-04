const fs = require('fs');
const http = require('http');
const url = require('url');

const replaceTemplate = require('./modules/replaceTemplate'); 

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

            fs.writeFile('./txt/final.txt', `${data2}\n${This overview page"
});
console.log('Will read file!');
*/



/*========SERVER========*/

//Getting views
const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');

//Getting data
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

//Creating the server
const server = http.createServer( (req, res)=>{
    const {query, pathname} = url.parse(req.url, true);
    

    // Routing
    // Overview page
    if (pathname ==='/' || pathname === '/overview') {
        res.writeHead(200, {'Content-type': 'text/html'})

        // getting html code for each card in dataObj
        // using join to get single string and replace placeholder on template overview
        const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('');
        const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);

        res.end(output)
    // Product page
    } else if (pathname === '/product'){
        res.writeHead(200, {'Content-type': 'text/html'})
        const product = dataObj[query.id];
        const output = replaceTemplate(tempProduct, product);
        res.end(output);

    // API
    } else if (pathname === '/api'){
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