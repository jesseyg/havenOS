//
// havenOS bot V2
// By: Jessey
// github: https://github.com/jesseyg/havenOS
//
// discord require
const Discord = require("discord.js");
// roblox require for future use
//var roblox = require('roblox-js');

const client = new Discord.Client();


const config = require("./config.json");


client.on("ready", () => {

  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);

  client.user.setActivity(`with the election results`);
});

client.on("guildCreate", guild => {

  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  client.user.setActivity(`with the election results`);
});

client.on("guildDelete", guild => {
  // this event triggers when the bot is removed from a guild.
  console.log(`I left: ${guild.name} (id: ${guild.id})`);
  client.user.setActivity(``);
});


client.on("message", async message => {

  if(message.author.bot) return;


  if(message.content.indexOf(config.prefix) !== 0) return;


  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();


  // ping -- default
  if(command === "ping") {

    const m = await message.channel.send("Ping?");
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
  }
  // say -- v.1
  if(command === "say") {

     if(!message.member.roles.some(r=>["Admin","Havenfield Organizers","Developer"].includes(r.name)) )
      return message.reply("Sorry, :frowning2: you can't make me say things, silly! Only Developer can.");
    const sayMessage = args.join(" ");

    message.delete().catch(O_o=>{});

    message.channel.send(sayMessage);
  }

// purge -- v.1
  if(command === "purge") {

    if(!message.member.roles.some(r=>["Moderator","Admin","Havenfield Organizers","Developer"].includes(r.name)) )
    	return message.reply("Sorry, :frowning2: you can't mass delete evidence or silly messages! Only Developer+ can.")


    const deleteCount = parseInt(args[0], 10);

    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");


    const fetched = await message.channel.fetchMessages({limit: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
  }

// global discord ban -- v.1
if(command === "gban") {
	if(!message.member.roles.some(r=>["Havenfield Organizers","Developer"].includes(r.name)) )
		return message.reply("Sorry, :frowning2: you can't global server ban people, silly! Only Developer+ can.")

    let member = message.mentions.members.first();
    if(!member)
      return message.reply("Uh-oh! Looks like you forgot to mention someone to global Discord server ban.. Try again? :thinking:");
    if(!member.bannable)
      return message.reply("I cannot ban this user! Do they have a higher role? Do I have ban permissions?");

    let reason = args.slice(1).join(' ');
    if(!reason) reason = "No reason provided";

    await member.send(`Uh-oh, you were global banned from all State of Havenfield related servers for ${reason} by ${message.author.tag}`)
    for (let g of message.client.guilds.values()) g.ban(member.user).catch(e => message.reply(`I couldn't ban in ${g.name} because of ${e}`));
      message.reply(`${member.user.tag} has been global banned by ${message.author.tag} because: ${reason}`);
}
// ingame ban -- ??
  if (command === "gameban") {
    if (!message.member.roles.some(r => ["Admin","Moderator","Havenfield Organizers", "Developer"].includes(r.name)))
      return message.reply("Sorry, :frowning2: you can't game ban people, silly! Only Moderator+ can.")

  }


});

client.login(config.token);
