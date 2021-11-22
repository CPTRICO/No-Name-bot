const dig = require('gamedig');
const config = require('../config.json')

async function updateStatus(client) {
    return dig.query({
        type: 'fivem',
        host: config.ipadress,
        port: config.port,
        socketTimeout: 5000,
        udpTimeout: 10000
    }).then((info) => {
        client.user.setActivity(`${info.raw.clients}/${info.raw.sv_maxclients} i Byen`, {
            type: "WATCHING"
        })
    }).catch((error) => {
    })
}

exports.updateStatus = updateStatus