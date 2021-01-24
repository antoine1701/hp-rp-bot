const Discord = require('discord.js'),
    client = new Discord.Client({
        fetchAllMembers: true
    }),
    config = require('./config.json'),
    fs = require('fs');

client.login(process.env.TOKEN);
client.commands = new Discord.Collection
client.on("ready", () => {
    console.log("Ready");
    client.user.setStatus("online");
    client.user.setActivity("by antoine#6573", {type: 'PLAYING'});
})

fs.readdir('./commands', (err, files) => {
    if (err) throw err
    files.forEach(file => {
        if (!file.endsWith('.js')) return
        const command = require(`./commands/${file}`);
        client.commands.set(command.name, command);
    })
})

client.on('message', message => {
    if (message.type !== 'DEFAULT' || message.author.bot) return
 
    const args = message.content.trim().split(/ +/g);
    const commandName = args.shift().toLowerCase();
    if (!commandName.startsWith(config.prefix)) return
    const command = client.commands.get(commandName.slice(config.prefix.length));
    if (!command) return
    command.run(message, args, client);
})

client.on('guildMemberAdd', member => {
    member.guild.channels.cache.get(config.greeting.channel).send(`Hey ${member} ! Bienvenue dans le serveur ${member.guild.name} ! Nous t’invitons à aller voir les salons <#732293626071220244> et <#736343000933990531> afin d’y accepter les règles et d’y prendre tes rôles ! Plein d’autres salons dans les catégories Informations et Autres sont à aller voir ! Allez checker tous les salons des deux premières catégories 😉 !`)
    member.roles.add(config.greeting.role)
})
 
client.on('guildMemberRemove', member => {
    member.guild.channels.cache.get(config.greeting.channel2).send(`${member.user.tag} a quitté le serveur... 😢`)
})
