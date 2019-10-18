//
// havenOS bot V1
// By: Jessey 
// github: https://github.com/jesseyg/havenOS
//

const Discord = require("discord.js");


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
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
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
  // say 
  if(command === "say") {

     if(!message.member.roles.some(r=>["Havenfield Organizers","Developer"].includes(r.name)) )
      return message.reply("Sorry, :frowning2: you can't make me say things, silly! Only Developer can.");
    const sayMessage = args.join(" ");
  
    message.delete().catch(O_o=>{}); 

    message.channel.send(sayMessage);
  }
  // kick 
  if(command === "kick") {

    if(!message.member.roles.some(r=>["Moderator", "Game Moderator","Havenfield Organizers","Developer"].includes(r.name)) )
      return message.reply("Sorry, :frowning2: you can't kick people, silly! Only Moderator+ can.");
    

    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!member)
      return message.reply("Uh-oh! Looks like you forgot to mention someone to kick.. Try again? :thinking:");
    if(!member.kickable) 
      return message.reply("I cannot kick this user! Do they have a higher role? Do I have kick permissions?");
    

    let reason = args.slice(1).join(' ');
    if(!reason) reason = "No reason provided";
    
 
    await member.kick(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
    message.reply(`${member.user.tag} has been kicked by ${message.author.tag} because: ${reason}`);

  }
  // ban command
  if(command === "ban") {
   
    if(!message.member.roles.some(r=>["Moderator", "Game Moderator","Havenfield Organizers","Developer"].includes(r.name)) )
      return message.reply("Sorry, :frowning2: you can't ban people, silly! Only Moderator+ can.");
    
    let member = message.mentions.members.first();
    if(!member)
      return message.reply("Uh-oh! Looks like you forgot to mention someone to ban.. Try again? :thinking:");
    if(!member.bannable) 
      return message.reply("I cannot ban this user! Do they have a higher role? Do I have ban permissions?");

    let reason = args.slice(1).join(' ');
    if(!reason) reason = "No reason provided";
    
    await member.send(`Uh-oh, you were banned for ${reason} by ${message.author.tag}`)
    await member.ban(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));
      message.reply(`${member.user.tag} has been banned by ${message.author.tag} because: ${reason}`);


  }
  
  if(command === "purge") {

    if(!message.member.roles.some(r=>["Havenfield Organizers","Developer"].includes(r.name)) )
    	return message.reply("Sorry, :frowning2: you can't mass delete evidence or silly messages! Only Developer+ can.")

    
    const deleteCount = parseInt(args[0], 10);
    
    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");
    

    const fetched = await message.channel.fetchMessages({limit: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
  }
// mute
if(command === "mute") {
	if(!message.member.roles.some(r=>["Moderator,Game Moderator","Havenfield Organizers","Developer"].includes(r.name)) )
		return message.reply("Sorry, :frowning2: you can't mute people, silly! Only Moderator+ can.")

	let member = message.mentions.members.first();
    if(!member)
      return message.reply("Uh-oh! Looks like you forgot to mention someone to mute.. Try again? :thinking:");
    if(!member.mutable) 
      return message.reply("I cannot mute this user! Do they have a higher role? Do I have ban permissions?");
}
// global discord ban
if(command === "gban") {
	if(!message.member.roles.some(r=>["Moderator,Game Moderator","Havenfield Organizers","Developer"].includes(r.name)) )
		return message.reply("Sorry, :frowning2: you can't global server ban people, silly! Only Moderator+ can.")

    let member = message.mentions.members.first();
    if(!member)
      return message.reply("Uh-oh! Looks like you forgot to mention someone to global Discord server ban.. Try again? :thinking:");
    if(!member.bannable) 
      return message.reply("I cannot ban this user! Do they have a higher role? Do I have ban permissions?");

    let reason = args.slice(1).join(' ');
    if(!reason) reason = "No reason provided";
    
    member.send(`Uh-oh, you were global banned for ${reason} by ${message.author.tag}`)
    for (let g of message.client.guilds.values()) g.ban(member.user).catch(e => message.reply(`I couldn't ban in ${g.name} because of ${e}`));
      message.reply(`${member.user.tag} has been global banned by ${message.author.tag} because: ${reason}`);
}
  
  //--> unban 
 // if(!command === "unban") {
	//if(!message.member.roles.some(r=>["Moderator,Game Moderator","Havenfield Organizers","Developer"].includes(r.name)) )
	//	return message.reply("Sorry, :frowning2: you can't unban people, silly! Only Moderator+ can.")

  //  let member = message.mentions.members.first();
  //  if(!member)
  //    return message.reply("Uh-oh! Looks like you forgot to mention someone to server unban.. Try again? :thinking:");
  //  if(!member.unbannable) 
   //   return message.reply("I cannot ban this user! Do they have a higher role? Do I have ban permissions?");
 // }

 



});

client.login(config.token);
