const express = require('express');
var cors = require('cors');
const mongoose = require('mongoose');
const { MONGO_URL} = require('./config');
//Rotas
const postsRoutes = require('./routes/api/post')

const app = express();

// Body parser
app.use(cors());
app.use(express.json());

//Conexão banco de dados
mongoose.connect(MONGO_URL)
    .then(() => console.log('Conectado com sucesso'))
    .catch(err => console.log(err))

app.use('/api/posts', postsRoutes);

const port = process.env.port || 5000;

app.listen(port, () => console.log(`Serve running at port ${port}`))