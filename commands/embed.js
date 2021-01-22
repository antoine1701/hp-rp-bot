const Discord = require('discord.js')

module.exports = {
    run: message => {
        message.channel.send(new Discord.MessageEmbed()  
        .setTitle('Titre'))
    },
    name: 'embed'
}