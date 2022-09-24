const express = require('express');
var cors = require('cors');
const fileUpload = require("express-fileupload");
const mongoose = require('mongoose');
const { MONGO_URL} = require('./config');
//Rotas
const editaisRoutes = require('./routes/api/edital')

const app = express();

// Body parser
app.use(cors());
app.use(express.json());

//Conexão banco de dados
mongoose.connect(MONGO_URL)
    .then(() => console.log('Conectado com sucesso'))
    .catch(err => console.log(err))

app.use('/api/editais', editaisRoutes);

app.use(
    fileUpload({
        useTempFiles:true,
        saleFileNames: true,
        preserveExtensions: true,
        tempFileDir: `${__dirname}/public/files/temp`
    })
);

app.post('/upload', (req, res, next) => {
    let uploadFile = req.files.file;
    const name = uploadFile.name;
    //const md5 = uploadFile.md5();
    const saveAs = `${name}`;
    uploadFile.mv(`${__dirname}/public/files/${saveAs}`, function(err) {
        if (err) {
            return res.status(500).send(err);
        }

        return res.status(200).json({ status: 'uploaded', name, saveAs});
    });
});

const port = process.env.port || 5000;

app.listen(port, () => console.log(`Serve running at port ${port}`))