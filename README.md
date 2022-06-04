# Agendamento Nodejs

[Agendamento](https://github.com/joselinosantosti/agendamento-nodejs/blob/main/public/agendamento.png)

# Getting start
1. Install NodeJS, MySQL and MongoDB in your Operational System
2. Copy the folder of the projetct for your computer
3. Access the folder in Windows prompt or Linux terminal
4. Install the packages with the manager npm<br>
npm install express nodemon handlebars mysql mongodb sequelize
5. Open each file in models and write `Post.sync({force: true})` in the penultimate line
6. Create a database with the same name contained in the db.js file
7. Run the command `nodemon Post.js` for create the table in database
8. Comment or delete the code `Post.sync({force: true})` for not create again
9. Run the app with `nodemon app.js`
