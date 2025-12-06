import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

import { createServer } from 'http';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Caminho correto das views e public
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// COLOCAR OS MODELS AQUI (colocar o caminho ../)
import Bijuu from '../models/Bijuu.js';
import Personagem from '../models/Personagem.js';
import Cla from '../models/Cla.js';
import Vila from '../models/Vila.js';


//FIM MODELS

// Servir arquivos estáticos
//app.use(express.static(join(__dirname, '../public')));
app.set('views', join(__dirname, '../views'));

// Rotas
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage });

// COLOCAR AS ROTAS AQUI
app.get('/', (req, res) => {
    res.render("index")
})

app.get('/personagem/lst', async (req, res) => {
    //busca as marcar no banco de dados
    const personagens = await Personagem.find()
    res.render("personagem/lst", {personagens:personagens})
})
app.post('/personagem/lst', async (req, res) => {
  const pesquisa = (req.body.pesquisa || '').toString().trim()

  const regex = { $regex: pesquisa, $options: 'i' }

  const personagens = await Personagem.find({
    $or: [
      { nome: regex },
      { tipo: regex }
    ]
  })

  res.render('personagem/lst', { personagens })
})
app.post('/personagem/add/ok', upload.single('foto'), async (req, res) => {
    //grava no banco
    const dados = {
        nome: req.body.nome,
        aldeia: req.body.aldeia,
        elementos: req.body.elementos,
        graduacao: req.body.graduacao
    }
        if(req.file) {
        dados.foto = req.file.buffer
        dados.fotoType = req.file.mimetype
    }
    await Personagem.create(dados)
    res.render("personagem/addok" )
})

app.get('/personagem/add', (req, res) => {
    res.render("personagem/add")
})

app.get('/personagem/del/:id', async (req, res) => {
  await Personagem.findByIdAndDelete(
    req.params.id
  );
  res.redirect('/personagem/lst');
});

//Edição
app.get('/personagem/edt/:id', async (req, res) => {

const personagem = await Personagem.findById(req.params.id)

res.render("personagem/edt", {personagem})

})

app.post('/personagem/edt/:id', async (req, res) => {

const personagens = await Personagem.findByIdAndUpdate(req.params.id, req.body)

res.render("personagem/edtok")

})
app.post('/personagem/add/ok',upload.single('foto'), async (req, res) => {
   
    //grava no banco
    //await Marca.create(req.body)
    /*como agora tem um campo "fora do padrão" tem q fazer o create campo a campo*/

    await Personagem.create({
        nome:req.body.nome,
        aldeia:req.body.aldeia,
        elementos:req.body.elementos,
        graduacao:req.body.graduacao,
        foto:req.file.buffer
    })
    res.render("personagem/add/ok" )
})

  //Bijuu


app.get('/bijuu/lst', async (req, res) => {
    //busca as marcar no banco de dados
    const bijuu = await Bijuu.find()
    res.render("bijuu/lst", {bijuu: bijuu})
})

app.post('/bijuu/lst', async (req, res) => {
    //pesquisar
    const pesquisa = req.body.pesquisa
    const bijuu = await Bijuu.find({ nome: { $regex: pesquisa, $options: 'i' } })
    res.render("bijuu/lst", { bijuu: bijuu })
})

app.post('/bijuu/add/ok', async (req, res) => {
    //grava no banco
    await Bijuu.create(req.body)
    res.render("bijuu/addok" )
})

app.get('/bijuu/add', (req, res) => {
    res.render("bijuu/add")
})
app.get('/bijuu/del/:id', async (req, res) => {
  await Bijuu.findByIdAndDelete(
    req.params.id
  );
  res.redirect('/bijuu/lst');
});

app.get('/bijuu/edt/:id', async (req, res) => {

const bijuu = await Bijuu.findById(req.params.id)

res.render("bijuu/edt", {bijuu})

})

app.post('/bijuu/edt/:id', async (req, res) => {

const bijuu = await Bijuu.findByIdAndUpdate(req.params.id, req.body)

res.render("bijuu/edtok")

})


 //cla


app.get('/cla/lst', async (req, res) => {
    //busca as marcar no banco de dados
    const cla = await Cla.find()
    res.render("cla/lst", {cla: cla})
})

app.post('/cla/lst', async (req, res) => {
    //pesquisar
    const pesquisa = req.body.pesquisa
    const cla = await Cla.find({ nome: { $regex: pesquisa, $options: 'i' } })
    res.render("cla/lst", { cla: cla })
})

app.post('/cla/add/ok', upload.single('foto'), async (req, res) => {
    //grava no banco
    const dados = {
        nome: req.body.nome,
        fundador: req.body.fundador,
        localidade: req.body.localidade,
        kekkeigenkai: req.body.kekkeigenkai
    }
    if(req.file) {
        dados.foto = req.file.buffer
    }
    await Cla.create(dados)
    res.render("cla/addok" )
})

app.get('/cla/add', (req, res) => {
    res.render("cla/add")
})
app.get('/cla/del/:id', async (req, res) => {
  await Cla.findByIdAndDelete(
    req.params.id
  );
  res.redirect('/cla/lst');
});


app.get('/cla/edt/:id', async (req, res) => {

const cla = await Cla.findById(req.params.id)

res.render("cla/edt", {cla})

})

app.post('/cla/edt/:id', async (req, res) => {

const cla = await Cla.findByIdAndUpdate(req.params.id, req.body)

res.render("cla/edtok")

})

app.post('/cla/add/ok',upload.single('foto'), async (req, res) => {
   
    //grava no banco
    //await Marca.create(req.body)
    /*como agora tem um campo "fora do padrão" tem q fazer o create campo a campo*/

    await Cla.create({
        nome: req.body.nome,
        fundador: req.body.fundador,
        localidade: req.body.localidade,
        kekkeigenkai: req.body.kekkeigenkai,
        foto:req.file.buffer
    })
    res.render("cla/add/ok" )
})


//Vila


app.get('/vila/lst', async (req, res) => {
    //busca as marcar no banco de dados
    const vila = await Vila.find()
    res.render("vila/lst", {vila: vila})
})

app.post('/vila/lst', async (req, res) => {
    //pesquisar
    const pesquisa = req.body.pesquisa
    const vila = await Vila.find({ nome: { $regex: pesquisa, $options: 'i' } })
    res.render("vila/lst", { vila: vila })
})
app.post('/vila/add/ok', upload.single('foto'), async (req, res) => {
    //grava no banco
    const dados = {
        nome: req.body.nome,
        pais: req.body.pais,
        kage: req.body.kage,
        fundador: req.body.fundador
    }
    if(req.file) {
        dados.foto = req.file.buffer
    }
    await Vila.create(dados)
    res.render("vila/addok" )
})



app.post('/vila/add/ok', async (req, res) => {
    //grava no banco
    await Vila.create(req.body)
    res.render("vila/addok" )
})

app.get('/vila/add', (req, res) => {
    res.render("vila/add")
})
app.get('/vila/del/:id', async (req, res) => {
  await Vila.findByIdAndDelete(
    req.params.id
  );
  res.redirect('/vila/lst');
});

app.get('/vila/edt/:id', async (req, res) => {

const vila = await Vila.findById(req.params.id)

res.render("vila/edt", {vila})

})

app.post('/vila/edt/:id', async (req, res) => {

const vila = await Vila.findByIdAndUpdate(req.params.id, req.body)

res.render("vila/edtok")

})

//++++++++++++ site ++++++++++

app.get('/site', async (req, res) => {
    const personagens= await Personagem.find()
    const cla = await Cla.find()
    const bijuu = await Bijuu.find()
    const vila  = await Vila.find()
    res.render("site/index", {personagens,cla,bijuu,vila})
})

//FIM ROTAS
app.listen(3001)
// Exporta o handler compatível com Vercel
export default app;