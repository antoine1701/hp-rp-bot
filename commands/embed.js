const Discord = require('discord.js')

module.exports = {
    run: message => {
        message.channel.send(new Discord.MessageEmbed()  
        .setTitle('Titre')
        .setColor('#ff4100'))
    },
    name: 'embed'
}
