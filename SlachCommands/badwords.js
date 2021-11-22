const schema = require('../database/models/guild-schema')
const discord = require('discord.js')

module.exports.run = async (inter) => {
    if(!inter.member.permissions.has(discord.Permissions.FLAGS.MANAGE_MESSAGES)) return inter.reply('Du har ikke nok tilladelser til at udfør denne kommando!')
    const choice = inter.options.getString('muligheder')
    const word = inter.options.getString('ord')

    let data;
    try {
        data = await schema.findOne({ guildID: inter.guild.id })
        if(!data) {
            data = await schema.create({ guildID: inter.guild.id })
        }
        
    } catch (error) {
        console.log(error)
    }

    if(choice == 'add') {
        const wordToBeAdded = word.toLowerCase()

        if(data.BLW.includes(wordToBeAdded)) return inter.reply('Dette ord er allerede i databasen!')
        inter.reply(`Succesfuldt tilføjet \`${word}\` til databasen`)
        data.BLW.push(wordToBeAdded)
        await data.save()
    }

    if(choice == 'remove') {
        const wordToBeAdded = word.toLowerCase()
        if(!data.BLW.includes(wordToBeAdded)) return inter.reply('Dette ord er allerede ikke i databasen')
        let array = data.BLW

        array = array.filter(x => x !== wordToBeAdded)
        data.BLW = array
        inter.reply(`Succesfuldt fjernet \`${word}\` fra databasen`)
        await data.save()
    }

    console.log(data)
}

module.exports.help = {
    name: 'badwords'
}