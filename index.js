const http = require("http");
const url = require("url");
const fs = require("fs");

const replaceTemplate = (card, data) => {
  let output = card.replace("{%PRODUCTNAME%}", data.productName);
  output = output.replace("{%FROM%}", data.from);
  output = output.replace("{%PRICE%}", data.price);
  output = output.replace("{%IMAGE%}", data.image);
  output = output.replace("{%ID%}", data.id);
  output = output.replace("{%NUTRIENT%}", data.nutrients);
  output = output.replace("{%QUANTITY%}", data.quantity);
  output = output.replace("{%DESCRIPTION%}", data.description);

  return output;
};

const data = fs.readFileSync("./apidata/data.JSON", "utf-8");
const dataObj = JSON.parse(data);
const overviewhtml = fs.readFileSync("./apidata/overview.html", "utf-8");
const producthtml = fs.readFileSync("./apidata/product.html", "utf-8");
const productcardhtml = fs.readFileSync("./apidata/productcard.html", "utf-8");

const server = http.createServer((req, res) => {
  const path = req.url;
  const pathName = url.parse(path, true).pathname;
  const query = url.parse(path, true).query;

  //overview/////////////////////////////
  if (pathName == "/" || pathName == "/overview") {
    const cardhtml = dataObj.map(el => replaceTemplate(productcardhtml, el));
    const output = overviewhtml.replace("PRODUCTSINGLE", cardhtml);
    res.end(output);
    res.writeHead(200, { "Content-type": "text/html" });
  }
  //product///////////////////////////
  else if (pathName == "/product") {
    const product = dataObj[query.id];
    const output = replaceTemplate(producthtml, product);
    res.end(output);
  }
  //api/////////////////////////////
  else if (pathName == "/api") {
    res.writeHead(200, { "Content-type": "application/JSON" });
    res.end(data);
  } else {
    res.writeHead(404, { "Content-type": "text/html" });
    res.end("page not found");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("srver is runnung");
});
