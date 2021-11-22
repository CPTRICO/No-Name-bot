const discord = require('discord.js');
const config = require('./config.json');
const fs = require('fs');
const Client = new discord.Client({
    intents: [discord.Intents.FLAGS.GUILDS, discord.Intents.FLAGS.GUILD_MESSAGES, discord.Intents.FLAGS.DIRECT_MESSAGES, discord.Intents.FLAGS.GUILD_INTEGRATIONS, discord.Intents.FLAGS.GUILD_MEMBERS],
    allowedMentions: { parse: ['users', 'roles'], repliedUser: true }
});

Client.commands = new discord.Collection();
Client.aliases = new discord.Collection();
Client.events = new discord.Collection();
module.exports.Client = Client


 // command Handler
fs.readdirSync('./commands/').forEach(dir => {
    
    fs.readdir(`./commands/${dir}`, (err, files) => {
        
       

        var jsFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
        if (jsFiles.length <= 0) return console.log('Kan ikke finde nogen kommandoer!');
        
        jsFiles.forEach(file => {
             var fileget = require(`./commands/${file}`);
            console.log(`File ${file} blev loaded`)
            try{
                Client.commands.set(fileget.help.name, fileget);

                fileget.help.aliases.forEach(alias => {
                    Client.aliases.set(alias, fileget.help.name);
                })
            }catch (err) {
                return console.log(err)
            }
        })
    })
})
// event handler
fs.readdirSync('./events/').forEach(dir => {
    
    fs.readdir(`./events/${dir}`, (err, files) => {
        
        var jsFiles = fs.readdirSync('./events/').filter(file => file.endsWith('.js'));
        if (jsFiles.length <= 0) return console.log('Kan ikke finde nogen Events!');
        
        jsFiles.forEach(file => {
             const eventget = require(`./events/${file}`);
            try{
                Client.events.set(eventget.name, eventget);

            }catch (err) {
                return console.log(err)
            }
        })
    })
})

Client.on('guildMemberAdd', async guildMember => {

    const velkommen = new discord.MessageEmbed()
    .setColor('#0099ff')
    .setTitle(`Velkommen til ${guildMember.guild.name}`)
    .setAuthor(`${guildMember.guild.name}`, config.Lillelogo)
    .setDescription(`Hej, <@${guildMember.id}> Velkommen til No Return for at du kan komme ind på serveren skal du være indforstået med at vi altid har retten til at smide folk ud af serveren og at vi forventer at du har læst vores reglsæt før du begynder at gå ind på serveren og efter alle disse ting er ordnet vil jeg tilbyde dig velkommen til! NoReturn [UWL]!*`)
    .setThumbnail(config.Lillelogo)
    .setTimestamp()
    .setFooter(`Ankom `, config.Lillelogo);
    guildMember.guild.channels.cache.get('907985133758464050').send({ embeds: [velkommen] });


})

Client.login(config.Token)