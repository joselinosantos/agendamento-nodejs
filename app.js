const express = require("express")
const app = express()
const handlebars = require('express-handlebars')
const Agendamento = require('./models/Agendamento')
const path = require('path')
const port = 8081

//Config
	//Template Engine
	app.engine('handlebars', handlebars({defaultLayout: 'main'}))
	app.set('view engine', 	'handlebars')

	//Para capturar dados do form
	app.use(express.urlencoded({extended:false}))
	app.use(express.json())

	//Staticos
	app.use(express.static(path.join(__dirname,"public")))

//Rotas
app.get('/', function(req, res) {
	res.render('index')
})

app.get('/agendamentos', function(req, res) {
	Agendamento.findAll({order: [['id', 'DESC']]}).then(function(agendamentos) {
		res.render('agendamentos', {agendamentos:agendamentos})
	})
})

//Abertos
app.get('/abertos', function(req, res) {
	Agendamento.findAll({order: [['id', 'DESC']], where: {'status': 1}}).then(function(agendamentos) {
		res.render('agendamentos', {agendamentos:agendamentos})
	})
})

//Atendidos
app.get('/atendidos', function(req, res) {
	Agendamento.findAll({order: [['id', 'DESC']], where: {'status': 2}}).then(function(agendamentos) {
		res.render('agendamentos', {agendamentos:agendamentos})
	})
})

//Abrir formulario
app.get('/add', function(req, res) {
	res.render('form')
})

//Cadastrar agendamento
app.post('/cadastrar', function(req, res) {
	Agendamento.create( {
		nome: req.body.nome,
		telefone: req.body.telefone,
		horario: Number(req.body.horario),
		servico: Number(req.body.servico),
		descricao: req.body.descricao, 
	}).then(function() {
		//res.send('Agendamento criado com sucesso!')
		res.redirect('/')
	}).catch(function(erro){
		res.send('Erro ao cadastrar Agendamento. Erro: '+erro)
	})
})

app.get('/deletar/:id', function(req, res) {
	Agendamento.destroy({where: {'id': req.params.id}}).then(function() {
		//res.send('Agendamento deletado com sucesso')
		res.redirect('/agendamentos')
	}).catch(function() {
		res.send('Erro ao deletar Agendamento. Erro: '+erro)
	})
})

app.get('/marcar_atendido/:id', (req, res) => {
	Agendamento.findOne({_id: req.params.id}).then((agendamento) => {

		//Atualizar status
		agendamento.status = 1
		agendamento.save().then(() => {
			console.log('Agendamento foi marcado como atendido')
			res.redirect('/agendamentos')
		}).catch((erro) => {
			console.log('Erro ao marcar')
			res.redirect('/agendamentos')
		})
	}).catch((erro) => {
		console.log('Agendamento não existe')
		res.redirect('/agendamentos')
	})
})

//-------------------------------------------------------------------------------
//Abrir formulario e inserir dados para edição
app.get('/edit/:id', (req, res) => {
	Agendamento.findOne({id: req.params.id}).then((agendamento) => {
		if(agendamento) {
			res.render('edit', {agendamento:agendamento})
		}		
	}).catch((erro) => {
		console.log('Agendamento não existe')
		res.redirect('/agendamentos')
	})
})

app.listen(port, function() {
	console.log('Running on http://localhost:'+port)
})
