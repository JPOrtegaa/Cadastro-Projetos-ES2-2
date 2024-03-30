const express = require('express');
const path = require('path');
const axios = require('axios')
var cors = require('cors')
const app = express();
const bodyParser = require('body-parser');
app.use(express.static(path.join(__dirname, 'public')));
const port = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(cors())

// Rotas para servir paginas HTML
app.get('/', async(req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Paginas de tabelas
app.get('/profissional/listar', async(req, res) => {
    res.sendFile(path.join(__dirname, 'public', '/profissional/listar/listaProfissionais.html'));
});

app.get('/projeto/listar', async(req, res) => {
    res.sendFile(path.join(__dirname, 'public', '/projeto/listar/listaProjetos.html'));
});

app.get('/time/listar', async(req, res) => {
    res.sendFile(path.join(__dirname, 'public', '/time/listar/listaTimes.html'));
});


// Paginas de visualizacao
app.get('/profissional/visualizar/:id', async(req, res) => {
    res.sendFile(path.join(__dirname, 'public', '/profissional/visualizar/visualizarProfissional.html'));
});

app.get('/projeto/visualizar/:id', async(req, res) => {
    res.sendFile(path.join(__dirname, 'public', '/projeto/visualizar/visualizarProjeto.html'));
});

app.get('/time/visualizar/:id', async(req, res) => {
    res.sendFile(path.join(__dirname, 'public', '/time/visualizar/visualizarTime.html'));
});



// Paginas de edicao
app.get('/profissional/editar/:id', async(req, res) => {
    res.sendFile(path.join(__dirname, 'public', '/profissional/editar/editarProfissional.html'));
});

app.get('/projeto/editar/:id', async(req, res) => {
    res.sendFile(path.join(__dirname, 'public', '/projeto/editar/editarProjeto.html'));
});

app.get('/time/editar/:id', async(req, res) => {
    res.sendFile(path.join(__dirname, 'public', '/time/editar/editarTime.html'));
});



// Paginas de cadastro
app.get('/profissional/cadastrar', async(req, res) => {
    res.sendFile(path.join(__dirname, 'public', '/profissional/cadastrar/cadastrarProfissional.html'));
});

app.get('/projeto/cadastrar', async(req, res) => {
    res.sendFile(path.join(__dirname, 'public', '/projeto/cadastrar/cadastrarProjeto.html'));
});

app.get('/time/cadastrar', async(req, res) => {
    res.sendFile(path.join(__dirname, 'public', '/time/cadastrar/cadastrarTime.html'));
});



// Paginas de exclusao
app.get('/profissional/excluir/:id', async(req, res) => {
    res.sendFile(path.join(__dirname, 'public', '/profissional/excluir/excluirProfissional.html'));
});

app.get('/projeto/excluir/:id', async(req, res) => {
    res.sendFile(path.join(__dirname, 'public', '/projeto/excluir/excluirProjeto.html'));
});

app.get('/time/excluir/:id', async(req, res) => {
    res.sendFile(path.join(__dirname, 'public', '/time/excluir/excluirTime.html'));
});




// Gambiarra para evitar CORS
app.get('/getReq', async(req, res) => {
    let url = req.query.urlReq;
    let response = await axios.get(url);
    res.send(response.data);
});

app.put('/putReq', async(req, res) => {
    let url = req.body.urlBackend;
    let corpoDaRequisicao = req.body.corpoDaRequisicao;
    let response = await axios.put(url, corpoDaRequisicao);
    res.send(response.data);
});

app.delete('/deleteReq', async(req, res) => {
    let url = req.body.url;
    let corpoDaRequisicao = req.body.source;
    let response = await axios.delete(url, { data: corpoDaRequisicao});
    res.send(response.data);
});

app.post('/postReq', async(req, res) => {
    let url = req.body.urlBackend;
    let corpoDaRequisicao = req.body.corpoDaRequisicao;
    let response = await axios.post(url, corpoDaRequisicao);
    res.send(response.data);
});




app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

