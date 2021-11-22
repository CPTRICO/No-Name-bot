const Discord = require('discord.js');
const config = require('../config.json')

module.exports.run = async (Client, message, args, prefix) => {
    if (message.member.permissions.has("KICK_MEMBERS")) {
            const embed = new Discord.MessageEmbed()
                .setColor('#0000d1')
                .setAuthor(config.DiscordServerNavn, config.Lillelogo)
                .setDescription(args.slice(0).join(' '))
                .setTimestamp()
                .setFooter(config.DiscordServerNavn, config.Lillelogo);
            //message.guild.channels.cache.get('Din Channel id til logs').send(`<@${message.author.id}> Har oprettet en embed`) // Fjern dem her // Hvis du gerne ville have logs på hvem der laver en emved
            message.channel.send({ embeds: [embed] });
            message.delete()

        } else {
            message.reply('Du har ikke adgang til denne kommando');
            message.delete({ timeout: 5000 })
                .then(msg => console.log(`Besked Blev slettet ${msg.author.username} Efter 5 sek`))
                .catch(console.error);
        }

    }
    module.exports.help = {
        name: "embed",
        aliases: ['e']
    }