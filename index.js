const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const { port } = require('./config.js');
const Caver = require("caver-js");
const Users = require("./models/users");
require("dotenv").config();
const {add_verified_role} = require("./bot");


const rpcURL = "https://public-node-api.klaytnapi.com/v1/cypress";
const networkID = "8217";
const caver = new Caver(rpcURL);

//rediect url
//http://localhost:53134
//https://discord.com/api/oauth2/authorize?client_id=1014421225361133609&redirect_uri=http%3A%2F%2Flocalhost%3A53134&response_type=code&scope=identify

mongoose.connect("mongodb+srv://wea9677:tmxkdlfl@cluster0.xmzro.mongodb.net/test1", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


const CONTRACT_ADDR = "0x9e481eb17d3c3c07d7a6ab571b4ba8ef432b5cf2"
let contract = null;
async function initContract(){
    contract = await caver.kct.kip17.create(CONTRACT_ADDR);
    console.log("initContract ok");
}

initContract();

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
	return res.sendFile('index.html', { root: '.' });
});

app.post("/api_discord_connect", async (req, res) =>{
    console.log("api_wallet", req.body);

    //디스코드 봇이 유저에게 권한을 준다.
    const { wallet_addr, discord_user_id } = req.body;

    const users = new Users({discord_user_id, wallet_addr, Nft_Bonus:0});
    console.log(discord_user_id, wallet_addr,  "유저")
    await users.save();

    ret = await contract.balanceOf(wallet_addr);
    const count = Number(ret);
    if (count < 0) {
      return res.json({
        code: -1,
        message: `count fail, ${count}`,
      });
    }
  
    console.log("count", count);
    add_verified_role(discord_user_id);
    
    return res.json({
      code: 200,
      message: "ok",
    });
  });

app.post("/api_wallet", async (req, res) =>{
    console.log("api_wallet", req.body);
    const addr = req.body.addr;
    let ret;
    ret = await contract.balanceOf(addr);
    const count = Number(ret);
    console.log("count", count);


    return res.json({
      code: 200,
      message: "ok",
      count,
    });
});

app.listen(process.env.PORT,() => 
  console.log(`App listening at http://localhost:${process.env.PORT}`)
);