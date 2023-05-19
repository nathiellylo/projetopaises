const http = require('http');
const fs = require('fs');

// Define o caminho para o arquivo paises.json
const pathToFile = __dirname + '/paises.json';

http.createServer((req, res) => {
  if (req.url === '/paises') {
    // Define o cabeçalho da resposta para JSON
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Lê o arquivo paises.json
    fs.readFile(pathToFile, (err, data) => {
      if (err) {
        console.error(err);
        res.statusCode = 500;
        res.end('Erro interno do servido"r');
        return;
      }

      // Analisa o conteúdo JSON
      const paises = JSON.parse(data);

      // Obtém apenas os primeiros 20 países
      const primeirosPaises = paises.slice(0, 20);

      // Gera a resposta HTTP com o conteúdo JSON dos primeiros 20 países
      res.statusCode = 200;
      res.end(JSON.stringify(primeirosPaises));
    });
  } 
  
  if (req.url === '/paisescomb') {
    
    fs.readFile(pathToFile, (err, data) => {
      if (err) {
        console.error(err);
        res.statusCode = 500;
        res.end('Erro interno do servidor');
        return;
      }

      // Analisa o conteúdo JSON
      const paises = JSON.parse(data);

      var paisescomb=[];

      paises.forEach(element=>{
        var nomeTemp = element.nome_pais;

        nomeTemp = String(nomeTemp)

        var primeiraLetra = nomeTemp.substr(0,1);

        if(primeiraLetra == "B"){
            paisescomb.push(element.nome_pais);
        }
      })
      // Gera a resposta HTTP com o conteúdo JSON
      res.statusCode = 200;
      res.end(JSON.stringify(paisescomb));
    
    });
  }
}).listen(8000);

console.log('Visite-me em: http://localhost:8000');