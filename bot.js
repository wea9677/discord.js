const { Client, GatewayIntentBits } = require("discord.js");
const Verify = require('./bot-verify');
const { channel_id } = require("./bot-verify");
require("dotenv").config();
const client = new Client({ intents: 
    [GatewayIntentBits.Guilds,
     GatewayIntentBits.GuildMembers,
     GatewayIntentBits.GuildMessages,
     GatewayIntentBits.GuildMessageReactions
    ] 
});
const prefix = '/';


const GUILD_ID = process.env.GUILD_ID;
// const ROLE_TEST_ID =process.env.ROLE_TEST_ID;
// const MEMBER_ID = process.env.MEMBER_ID;
const CHANNEL_ID = process.env.CHANNEL_ID;
client.once("ready", async () => {
    console.log(`Ready!`);
  
    const guild = client.guilds.cache.get(GUILD_ID);
    const channel = guild.channels.cache.get(CHANNEL_ID);
    //   console.log("channel", channel);
    // const role = guild.roles.cache.get(ROLE_TEST_ID);
    // const member = await guild.members.fetch(MEMBER_ID);
    //   console.log("member", member);
    // member.roles.add(role);
    //   member.roles.remove(role);
    channel.send("bot start");
    const ch_verify = guild.channels.cache.get(Verify.channel_id);
    const old_msg = await ch_verify.messages.fetch();
    ch_verify.bulkDelete(old_msg);

    Verify.ready(client);
  });


client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;
    
	const { commandName } = interaction;

	if (commandName === 'give') {
        await interaction.reply(`${interaction.user.tag} 에게 초기정착금 100 AWD를 보냈습니다.\n${interaction.user.tag} 유저가 보유한 금액은 100 AWD 입니다.`);
	}
});

client.login(process.env.TOKEN);


client.on("messageReactionAdd", async (reaction, user) =>{
    if (user.bot) return;
    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();
    if (!reaction.message.guild) return;

    if (reaction.message.channelId == Verify.channel_id) {
        Verify.reaction(reaction, user);
    } else {
        console.error('messageReactionAdd ono ch');
    }
});

client.on("messageCreate", async (msg) => {
 if(msg.author.bot) return;
 if(!msg.guild) return; // guild 이외의 곳에선 작동하지 않도록 설정
 if(msg.author.bot) return; // 메시지 사용자가 봇일 경우 작동하지 않도록 설정



 if(msg.content == "a") {
    msg.reply("bbb");
} else {
   console.log(msg.content, "msg.content");
}
});





client.login(process.env.TOKEN);
console.log("login");

// const ROLE_Verified_ID = "1014798401486987274"
// async function add_verified_role(user_id) {
//     console.log("add_verified_role", user_id);

//     const guild = client.guilds.cache.get(GUILD_ID);
//     const role = guild.roles.cache.get(ROLE_Verified_ID);
//     const member = guild.members.cache.get(user_id);
//     member.roles.addRole(role);
// }
const ROLE_Verified_ID = process.env.ROLE_Verified_ID;
async function add_verified_role(user_id) {
  console.log("add_verified_role", user_id);

  const guild = client.guilds.cache.get(GUILD_ID);
  const role = guild.roles.cache.get(ROLE_Verified_ID);
  const member = await guild.members.fetch(user_id);
  member.roles.add(role);
}
module.exports = {
    add_verified_role,
}