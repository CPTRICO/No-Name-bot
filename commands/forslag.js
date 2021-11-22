const Discord = require('discord.js');
const config = require('../config.json')
module.exports.run = async (Client, message, args, prefix) => {
    if (!args[0]) return message.channel.send('Du skal skrive et forslag!')
    const embed = new Discord.MessageEmbed()
        .setColor('#127dc8')
        .setTitle(`Server Forslag`)
        .setAuthor(config.DiscordServerNavn, config.Lillelogo)
        .addField('Forslag:', `${args.slice(0).join(' ')}`)
        .addField('Fra:', `<@${message.author.id}>`)
        .setThumbnail(config.Lillelogo)
        .setImage(config.Stortlogo)
        .setTimestamp()
        .setFooter('No Name Tak fordi du valgte os!', config.Lillelogo);
       

    const up = '👍';
    const down = '👎';

   
    let messageEmbed = await message.channel.send({ embeds: [embed] });
    messageEmbed.react(up);
    messageEmbed.react(down)
    message.delete(10)
    setInterval(() => {
   

    }, 2000);

  

}



module.exports.help = {
    name: "forslag",
    aliases: ['f']
}