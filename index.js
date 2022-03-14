const DiscordJS = require('discord.js')
const WOKCommands = require('wokcommands')
const path = require('path')
require('dotenv').config()

const { Intents } = DiscordJS

const client = new DiscordJS.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
    ]
})

client.on('ready', () => {
    new WOKCommands(client, {
        commandsDir: path.join(__dirname, 'commands'),
        showWarns: false,
        mongoUri: (process.env.MONGODB_URI)
    })
})

client.login(process.env.TOKEN)
