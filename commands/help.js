const Discord = require('discord.js'),
    config = require('../config.json')
 
module.exports = {
    run: (message, args, client) => {
        if (args[0]) {
            const command = client.commands.get(args[0].toLowerCase())
            if (!command || !command.help) return message.channel.send('Cette commande n\'existe pas.')
            message.channel.send(new Discord.MessageEmbed()
                .setDescription(`**Commande : ${command.name}**\n\n__Description :__${command.help.description}\n\n__Syntaxe :__ \`${config.prefix}${command.name}${command.help.syntax ? ` ${command.help.syntax}` : ''}\n\n__Aliases :__ \` ${config.prefix}${command.help.aliases ? ` ${command.help.aliases}` : ''}`))
        }
        else {
            message.channel.send(new Discord.MessageEmbed()
                .setTitle('Liste des commandes')
                .setDescription(`${client.commands.filter(command => command.help).map(command => `\`${config.prefix}${command.name}\``).join(' ')}\n\nPour plus d'informations sur une commande, tapez \`${config.prefix}help [nom de la commande]\``))
        }
    },
    name: 'help',
    help: {
        description: 'Cette commande permet d\'avoir de l\'aide.',
        syntax: '[nom de la commande]',
        aliases: 'h'
    }
}
