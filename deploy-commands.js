const { SlashCommandBuilder, Routes } = require('discord.js');
const { REST } = require('@discordjs/rest');
// const { clientId, guildId, token } = require('./config');
require("dotenv").config();

const commands = [
	new SlashCommandBuilder().setName('give').setDescription('유저에게 리워드를 보냅니다.'),
    // new SlashCommandBuilder().setName('야').setDescription('호라고 대답합니다.'),
	// new SlashCommandBuilder().setName('server').setDescription('Replies with server info!'),
	// new SlashCommandBuilder().setName('user').setDescription('Replies with user info!'),
]
	.map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

rest.put(Routes.applicationGuildCommands(process.env.CLIENTID,  process.env.GUILD_ID), { body: commands })
	.then((data) => console.log("성공했습니다."))
	.catch(console.error);