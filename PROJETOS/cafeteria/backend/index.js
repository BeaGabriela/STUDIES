const express = require('express');
const cors = require('cors');

const app = express();

const niveis = require('../backend/src/routes/nivel.routes')
const usuario = require('../backend/src/routes/usuario.routes')
const topico = require('../backend/src/routes/topico.routes')
const comida = require('../backend/src/routes/comida.routes')
const finalizar = require('../backend/src/routes/finalizar.routes')
const popular = require('../backend/src/routes/popular.routes')
const pedidos = require('../backend/src/routes/pedidos.routes')

 const email = require('../backend/src/controllers/usuarios/server.js')

app.use(cors());

app.use(express.json());
app.use(niveis)
app.use(email)
app.use(usuario)
app.use(topico)
app.use(comida)
app.use(popular)
app.use(pedidos)
app.use(finalizar)

app.listen(3000, () => { console.log("Funcionando na porta 3000"); })