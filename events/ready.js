const Client = require('../main').Client
const config = require('../config.json')
const activityUp = require('../events/actUpdater')
const fivereborn = require('fivereborn-query');
const axios = require('axios');
const { createCmd } = require('../dataHandler')
Client.on('ready', async () => {
    console.log(`${Client.user.tag} Er online!`)
    createCmd(Client, '912394561177915492')
})