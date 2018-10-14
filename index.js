const key = require("./secretkey.js");
const Discord = require("discord.js");
const snoowrap = require("snoowrap");
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const bot = new Discord.Client();

const r = new snoowrap({
  userAgent: "Discord bot",
  clientId: key.redditKey,
  clientSecret: key.redditClientSecret,
  refreshToken: key.redditRefreshToken
});

bot.login(key.discordKey);

bot.on("message", message => {
  //console.log(message.content);
  //if(message.content == 'b!img'){
  //if(message.content.includes("b!img")){
  msg = message.content.split(" ");
  if( msg[0] == "b!img" ){
    /*
    url = "https://i.imgur.com/CQdnUuj.jpg"
    sendImg(url, message);
    */
    sub = msg[1];
    getImages(sub);
  }

  function getImages(sub){
    r.getHot(sub, {limit: 100}).map(post => post.url)
      .filter(url => url.match(/(https:|http:)[a-z0-9/\.]+(png|jpg)/gi))
      //.then(urls => console.log(urls[getRandomInt(urls.length)]))
      .then(urls => sendImg(urls[getRandomInt(urls.length)]));
  
      let getRandomInt = function(max) {
        return Math.floor(Math.random() * Math.floor(max));
      }
  }

  function sendImg(url){
    let picture = new Discord.RichEmbed().setImage(url);
    message.channel.send(picture);
  }
  //TODO: nincs url
});



