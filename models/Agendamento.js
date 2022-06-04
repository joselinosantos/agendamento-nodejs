const db = require('./db')

const Agendamento = db.sequelize.define('agendamentos', {
	nome: {
		type: db.Sequelize.STRING
	},
	telefone: {
		type: db.Sequelize.STRING
	},
	horario: {
		type: db.Sequelize.STRING
	},
	servico: {
		type: db.Sequelize.INTEGER
	},
	descricao: {
		type: db.Sequelize.STRING
	},
	status: {
		type: db.Sequelize.INTEGER
	},
})

//Agendamento.sync({force: true})
module.exports = Agendamento