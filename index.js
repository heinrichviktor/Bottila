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

var xmlhttp = new XMLHttpRequest();
var subreddit = "dankmemes";
//.slice(6);
//r.getRandomSubmission('dankmemes').then(console.log);
bot.on("message", message => {
  //console.log(message.content);
  //if(message.content == 'b!img'){
  //if(message.content.includes("b!img")){
  if (message.content == "b!img") {
    subreddit = "dankmemes";
    sendImage();
  } else if (message.content.startsWith("b!img")) {
    subreddit = message.content.slice(6);
    sendImage();
  } else {
  }

  function sendImage() {
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var myObj = JSON.parse(this.responseText);
        var img = myObj.data.children[0].data.url;
        var authorText = myObj.data.children[0].data.title;
        message.channel.send(authorText);

        if (myObj.data.children[0].data.content_categories == "writing") {
          console.log("szöveg");
          message.channel.send("Olvasd el tesa: " + myObj.data.children[0].data.url);
        } else {
          let picture = new Discord.RichEmbed().setImage(img);
          message.channel.send(picture);
          console.log("kép");
        }
        //console.log(myObj.data.children[0].data.selftext)
        //
      }
    };
    //console.log(subreddit);
    xmlhttp.open(
      "GET",
      "https://www.reddit.com/r/" + subreddit + "/new.json?sort=new",
      true
    );
    xmlhttp.send();
  }
});
