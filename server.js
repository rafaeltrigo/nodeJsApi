// server.js
import express from 'express';
import dotenv from 'dotenv';
//import cors from 'cors';
import data from './data.js';
import Datastore from 'nedb';
//import { SpeedInsights } from "@vercel/speed-insights/next"

dotenv.config();
const app = express();
app.use(express.static('public'))
app.use(express.json())
//app.use(cors()); // Configuração do CORS

const database = new Datastore('database.db')
database.loadDatabase()
// database.insert({id:2,name:"Rafael",data:Date.now()});
//database.insert({id:2,name:"Eliete"})

//database.insert({id:5,date:Date.now()})
const porta = process.env.PORT || 3000; // Vem do Arquivo .env se nao achar usa a porta 3000
const Local_URL = 'http://localhost:'
const server = app.listen(porta, () => {
  console.log(`Servidor rodando em ${Local_URL}${porta}/api`);

  // database.remove({ id: 1}, { multi: true });
  // database.find({}, function (err, docs) {
  //   console.log(docs);
  // });
});


// Define uma rota raiz
app.get('/api', (req, res) => {
return  res.json(data);
});

// Define uma rota para buscar um item específico com base no ID
app.get(`/api/:id`, (req, res) => {
  const id = parseInt(req.params.id);
  const item = data.find(e => e.id === id);
  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ error: 'Item not found , Please type /api or api/<id>' });
  }
});


// Define uma rota para buscar uma informação específica de um item com base no ID
app.get(`/api/:id/:info`, (req, res) => {
  const id = parseInt(req.params.id);
  const info = req.params.info; // O parâmetro info determina qual informação do item buscar
  const item = data.find(e => e.id === id);

  if (item && item[info]) {
    res.json({ [info]: item[info] });
  } else {
    res.status(404).json({ error: 'Item not found or Information not available' });
  }
});


// Define uma rota para Post
app.post('/apiPost', (request, response) => {
  const dataPost = request.body
  database.insert(dataPost);
   console.log(dataPost)
   response.json(dataPost)

})










