const Sequelize = require('sequelize')

//Conexao Banco
const sequelize = new Sequelize('agendamento', 'root', 'admin', {
	host: 'localhost',
	dialect: 'mysql'
})

module.exports = {
	Sequelize: Sequelize,
	sequelize: sequelize
}