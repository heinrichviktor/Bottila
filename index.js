const key = require("./secretkey");
const Discord = require("discord.js");
const snoowrap = require("snoowrap");

const bot = new Discord.Client();
var subR;
const r = new snoowrap({
  userAgent: "Discord bot",
  clientId: key.redditKey,
  clientSecret: key.redditClientSecret,
  refreshToken: key.redditRefreshToken
});

bot.login(key.discordKey);

bot.on("message", message => {
  //TODO: http errorok
  
  msg = [];
  isSub = false;
  if (message.member.user.username != "Bottila") {
    msg = message.content.split(" ");
  }
  if (msg[1] && msg[1].match(/^[a-zA-Z0-9_+]+$/)) {
    isSub = true;
  }
  if (msg[0] == "b!img" && isSub && msg.length >= 2) {
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
  } else if (msg[0] == "b!img") {
    message.channel.send("Vmi kene még");
  }/*else if (msg[0] == "b!gif" & isSub && msg.length >= 2) {
    switch (msg[2]) {
      case "-hot":
        //getHotGifs(msg[1]);
        break;
      case "-top":
        //getTopGifs(msg[1]);
        break;
      default:
        //getHotGifs(msg[1]);
        break;
    }
  }else if (msg[0] == "b!vid" & isSub && msg.length >= 2) {
    switch (msg[2]) {
      case "-hot":
        getHotVids(msg[1]);
        break;
      case "-top":
        getTopVids(msg[1]);
        break;
      default:
        getHotVids(msg[1]);
        break;
    }
  }*/

  function getHotImages(sub) {
    r.getHot(sub, { limit: 25 })
      .filter(post => post.url.match(/(https:|http:)[a-z0-9/\.]+(png|jpg)/gi))
      .then(post => sendImg(post[getRandomInt(post.length)]));

    let getRandomInt = function(max) {
      return Math.floor(Math.random() * Math.floor(max));
    };
  }
  function getTopImages(sub) {
    r.getTop(sub, { limit: 25, t: "all" })
      .filter(post => post.url.match(/(https:|http:)[a-z0-9/\.]+(png|jpg)/gi))
      .then(post => sendImg(post[getRandomInt(post.length)]));

    let getRandomInt = function(max) {
      return Math.floor(Math.random() * Math.floor(max));
    };
  }
  /*
  function getHotGifs(sub) {
    r.getHot(sub, { limit: 25 })
      .filter(post => post.url.match(/(https:|http:)[a-z0-9/\.]+(mp4)/gi))
      .then(post => sendImg(post[getRandomInt(post.length)]));

    let getRandomInt = function(max) {
      return Math.floor(Math.random() * Math.floor(max));
    };
  }

  function getTopGifs(sub) {
    r.getTop(sub, { limit: 25, t: "all" })
      .filter(post => post.url.match(/(https:|http:)[a-z0-9/\.]+(gif|mp4)/gi))
      .then(post => sendImg(post[getRandomInt(post.length)]));

    let getRandomInt = function(max) {
      return Math.floor(Math.random() * Math.floor(max));
    };
  }
  */
  function sendImg(post) {
    if (post == undefined) {
      message.channel.send("Nincs img");
    } else {
      let picture = new Discord.RichEmbed().setImage(post.url);
      message.channel.send(post.title);
      message.channel.send("https://reddit.com" + post.permalink);
      message.channel.send(picture);
    }
  }
});
