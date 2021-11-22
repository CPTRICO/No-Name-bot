const { Options } = require("discord.js");

async function createCmd(Client, guildId) {
    const data  = [
        {
            name: 'badwords',
            description: 'blacklist all the bad words',
            options: [{
                name: 'muligheder',
                description: 'Vælg: Tilføj eller fjern',
                type: 'STRING',
                choices: [
                    {
                        name: 'tilføj',
                        value: 'add'
                    },
                    {
                        name: 'fjern',
                        value: 'remove'
                    },
                ],
                require: true
            },
            {
                name: 'ord',
                description: 'Det ord, du vil udføre handlingen på!',
                type: 'STRING',
                require: true
            }
        ],
    },
    {
        name: 'links',
        description: 'blacklist all the bad links',
        options: [{
            name: 'vælg',
            description: 'Vælg: Tilføj eller fjern',
            type: 'STRING',
            choices: [
                {
                    name: 'add',
                    value: 'add'
                },
                {
                    name: 'remove',
                    value: 'remove'
                },
            ],
            require: true
        },
        {
            name: 'links',
            description: 'Det link, du vil udføre handlingen på!',
            type: 'STRING',
            require: true
        }
    ],
}
    ]
    




    await Client.guilds.cache.get(guildId)?.commands.set(data);
}

module.exports = { createCmd }