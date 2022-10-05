const express = require('express');
var cors = require('cors');
const fileUpload = require("express-fileupload");
const mongoose = require('mongoose');
const { MONGO_URL } = require('./config');
const fs = require('fs');

//Rotas
const editaisRoutes = require('./routes/api/edital');
//const eventosRoutes = require('./routes/api/event');

const Edital = require('./models/Edital');

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
        useTempFiles: true,
        //safeFileNames: true,
        preserveExtension: true,
        tempFileDir: `${__dirname}/public/files/temp`
    })
);


app.post('/uploadjson', (req, res) => {
    let uploadFile = req.files.file;
    const name = uploadFile.name;
    //const md5 = uploadFile.md5();
    const saveAs = `${name}`;

    const caminho = `${__dirname}/public/files`;

    uploadFile.mv(`${__dirname}/public/files/${saveAs}`, function (err) {
        if (err) {
            return res.status(500).send(err);
        }
        console.log("Arquivo enviado");

        let editais = fs.readFileSync(`${caminho}/${saveAs}`);
        let editaisTransformados = JSON.parse(editais);
        console.log(editaisTransformados);
        Edital.insertMany(editaisTransformados);

        console.log("Deu bom!");

        return res.status(200).json({ status: 'uploaded', name, saveAs });
    });

});

/*
// Regra CRON para limpar a pasta files
cron.schedule('10 * * * * *', function () {
    console.log('Regra rodando a cada 10 segundos, verificando pasta files...');
    console.log(`Iniciando às ${horaAtual}`);
    fs.readdir(caminhoFiles, (err, files) => {
        if (err) {
            throw err;
        } else {
            if (files.lenght !== null) {
                for (const file of files) {
                    fs.unlink(path.join(caminhoFiles, file), (err) => {
                        //if (err) throw err;
                    });
                    console.log('[FILES] Limpeza efetuada na pasta files');
                }
            }
        }
    });
})
// Regra CRON para limpar a pasta files
cron.schedule('11 * * * * *', function () {
    console.log('Regra rodando a cada 10 segundos, verificando pasta temp...');
    console.log(`Iniciando às ${horaAtual}`);
    fs.readdir(caminhoTemp, (err, files) => {
        if (err) {
            throw err;
        } else {
            if (files.lenght !== null) {
                for (const file of files) {
                    fs.unlink(path.join(caminhoTemp, file), (err) => {
                        //if (err) throw err;
                    });
                    console.log('[TEMP] Limpeza efetuada na pasta temp');
                }
            }
        }
    });
})
*/

const port = process.env.port || 5000;

app.listen(port, () => console.log(`Serve running at port ${port}`))