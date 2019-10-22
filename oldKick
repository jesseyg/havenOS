  // kick -- v.1
  if(command === "kick") {

    if(!message.member.roles.some(r=>["Admin","Moderator","Havenfield Organizers","Developer"].includes(r.name)) )
      return message.reply("Sorry, :frowning2: you can't kick people, silly! Only Moderator+ can.");


    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!member)
      return message.reply("Uh-oh! Looks like you forgot to mention someone to kick.. Try again? :thinking:");
    if(!member.kickable)
      return message.reply("I cannot kick this user! Do they have a higher role? Do I have kick permissions?");


    let reason = args.slice(1).join(' ');
    if(!reason) reason = "No reason provided";

    await member.send(`Uh-oh! You were kicked from ${guild.name} for ${reason}, by ${message.author.tag}`)
    await member.kick(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
    message.reply(`${member.user.tag} has been kicked by ${message.author.tag} because: ${reason}`);

  }
