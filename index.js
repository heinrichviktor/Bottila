const Discord = require('discord.js');
const bot = new Discord.Client();

var key = require("./secretkey.js");

//console.log(key);
bot.on('message', (message) => {

    if(message.content == 'b!szia'){
        //message.channel.sendMessage('SZIAAAAAA');
        message.reply('SZIAAAAA');
    }

});
bot.login(key.key);