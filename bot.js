const Discord = require("discord.js");

const fs = require("fs");

const config = require("./botconfig.json");

const bot = new Discord.Client({

    disableEveryone: true,

    });

const moment = require("moment");

bot.commands = new Discord.Collection();



fs.readdir("./commands/", (err, files) =>{

    if(err) console.log(err);



    let jsfile = files.filter(f => f.split(".").pop() === "js")

    if(jsfile <= 0){

        console.log("Commands Not Found");

        return;

    }



    jsfile.forEach((f, i) =>{

        let props = require(`./commands/${f}`);

        console.log(`${i + 1}: ${f} loaded!`);

        bot.commands.set(props.help.name, props);

    });

});



bot.on("ready", async () => {

    let beotch = "(sethb#9447)";

    console.log(`${bot.user.username}'s is online | ${config.prefix}help for commands`);

    console.log(`Bitch${beotch} better have my money`);

    bot.user.setActivity(`on ${bot.guilds.size} servers | ${config.prefix}help for commands`);

    const hook = new Discord.WebhookClient('560665796901208065', 'OS7uqEwY0btNBrn70KoCckjFo-8VWaudwwmXKIy4roxcqiXq8f7QNPquwj97xyA9HuqQ');

    hook.send(`\`\`\`fix\n${bot.user.username}'s is online | ${config.prefix}help for commands\nPlaying on ${bot.guilds.size} servers | ${config.prefix}help for commands\`\`\``)

    console.error;

    

});

bot.on("guildCreate", guild =>{

    console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members! I am now in ${bot.guilds.size} servers`);

    bot.setActivity("dnd");

    bot.user.setPresence({

        game: {

            name : `on ${bot.guilds.size} servers | ${config.prefix}help for commands`,

            type : 'PLAYING',

        }

    })

});

bot.on("guildDelete", guild => {

  console.log(`I have been removed from: ${guild.name} (id: ${guild.id}) I'm now in ${bot.guilds.size} server/s`);

  bot.setActivity("dnd");

  bot.user.setPresence({

        game: {

            name : `on ${bot.guilds.size} servers | ${config.prefix}help for commands`,

            type : 'Playing',

        }

    })

});

bot.on('guildMemberAdd', message => {

message.guild.channels.get('482878394258685952').send({embed: {

color: "RANDOM",

author: {

  name: bot.user.username,

  icon_url: bot.user.avatarURL

},

title: "Welcome To Fire And Ice's discord Server!",

url: "https://hunterswebdesigns.ml",

description: "please use `-agree` to join the server fully",

fields: [{

    name: "Bot Help",

    value: "If you joined for bot help after typing `-agree` type `+new <reason for help>`"

  },

  {

    name: "Explore Our Website",

    value: "[Click Here](https://fireandicehosting.com) to explore the website"

  }

],

timestamp: new Date(),

footer: {

  icon_url: bot.user.avatarURL,

  text: "© Fire And Ice Hosting"

}

}}); 

});

bot.on("message", async message => {

    if(message.author.bot) return;

    if(message.channel.type === "dm") return;



    let prefix = config.prefix

    if(!message.content.startsWith(prefix)) return;



    let messageArray = message.content.split(" ");

    let cmd = messageArray[0];

    let args = messageArray.slice(1);



    let commandfile = bot.commands.get(cmd.slice(prefix.length));

    if(commandfile) commandfile.run(bot,message,args);

    if(message.content.indexOf(prefix) !== 0) return;

});



bot.login(config.token)


