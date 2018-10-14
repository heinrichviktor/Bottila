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
  //TODO: ha nincs url
  //TODO: nincs sub
  msg = [];
  isSub = false;
  if(message.member.user.username != "Bottila"){
    msg = message.content.split(" ");
  }
  if(msg[1] && msg[1].match(/^[a-zA-Z0-9]+$/)){
    isSub = true;
  }
  if( msg[0] == "b!img" && isSub && msg.length >= 2){
    switch (msg[2]) {
      case "-hot":
        getHotImages(msg[1]);
        break;
      case "-top":
        getTopImages(msg[1]);
      break;
      default:
        getHotImages(msg[1]);
        break;
    } 
  } else if(msg[0] == "b!img") {
    message.channel.send("Vmi kene még");
  }

  function getHotImages(sub){
    r.getHot(sub, {limit: 100})
      //.map(post => post.url)
      .filter(post => post.url.match(/(https:|http:)[a-z0-9/\.]+(png|jpg)/gi))
      //.then(urls => console.log(urls[getRandomInt(urls.length)]))
      .then(post => sendImg(post[getRandomInt(post.length)]));
  
      let getRandomInt = function(max) {
        return Math.floor(Math.random() * Math.floor(max));
      }
  }
  function getTopImages(sub){
    r.getTop(sub, {limit: 25, t: "all"})
      //.map(post => {post.url, post.title})
      .filter(post => post.url.match(/(https:|http:)[a-z0-9/\.]+(png|jpg)/gi))
      //.then(urls => console.log(urls[getRandomInt(urls.length)]))
      .then(post => sendImg(post[getRandomInt(post.length)]));
  
      let getRandomInt = function(max) {
        return Math.floor(Math.random() * Math.floor(max));
      }
  }

  function sendImg(post){
    if(post == undefined){
      message.channel.send("Nincs img");
    
    } else {
      let picture = new Discord.RichEmbed().setImage(post.url);
      message.channel.send(post.title);
      message.channel.send("https://reddit.com" + post.permalink)
      message.channel.send(picture);
    }
    
  }
});



