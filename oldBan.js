 // ban command -- v.1
  if(command === "ban") {

    if(!message.member.roles.some(r=>["Admin","Moderator","Havenfield Organizers","Developer"].includes(r.name)) )
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
