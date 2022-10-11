const fs = require('fs')
const chalk = require('chalk')
const cfonts = require('cfonts')


const color = (text, color) => {
return !color ? chalk.green(text) : chalk.keyword(color)(text)
}

const banner = cfonts.render(('LIGHT|BASE'), {
font : "block",
align: "center",
colors: ["blue","green"]
})

const getGroupAdmins = (participants) => {
admins = []
for (let i of participants) {
if(i.admin == 'admin') admins.push(i.id)
if(i.admin == 'superadmin') admins.push(i.id)
}
return admins
}

module.exports = { color, banner, getGroupAdmins }