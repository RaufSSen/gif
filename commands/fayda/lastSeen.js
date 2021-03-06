/**
 * @file lastSeen command
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license GPL-3.0
 */

exports.exec = async (Bastion, message, args) => {
  let user;
  if (message.mentions.users.size) {
    user = message.mentions.users.first();
  }
  else if (args.id) {
    user = await Bastion.utils.fetchMember(message.guild, args.id);
    if (user) {
      user = user.user;
    }
  }
  if (!user) {
    return Bastion.emit('commandUsage', message, this.help);
  }

  let color, description;
  if (user.lastMessageID) {
    let lastSeen = Date.now() - user.lastMessage.createdTimestamp;
    let seconds = lastSeen / 1000;
    let days = parseInt(seconds / 86400);
    seconds = seconds % 86400;
    let hours = parseInt(seconds / 3600);
    seconds = seconds % 3600;
    let minutes = parseInt(seconds / 60);
    seconds = parseInt(seconds % 60);

    lastSeen = `${seconds}s`;
    if (days) {
      lastSeen = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }
    else if (hours) {
      lastSeen = `${hours}h ${minutes}m ${seconds}s`;
    }
    else if (minutes) {
      lastSeen = `${minutes}m ${seconds}s`;
    }

    color = Bastion.colors.BLUE;
    description = Bastion.i18n.info(message.guild.language, 'lastSeen', user.tag, lastSeen);
  }
  else {
    color = Bastion.colors.RED;
    description = Bastion.i18n.info(message.guild.language, 'notSeen', user.tag);
  }

  await message.channel.send({
    embed: {
      color: color,
      title: 'Son Görülme',
      description: description
    }
  });
};

exports.config = {
  aliases: [ 'songörülme' ],
  enabled: true,
  argsDefinitions: [
    { name: 'id', type: String, defaultOption: true }
  ]
};

exports.help = {
  name: 'lastSeen',
  description: 'Shows the time since the specified user was last seen socializing in Discord.',
  botPermission: '',
  userTextPermission: '',
  userVoicePermission: '',
  usage: 'songörülme <@KULLLANICI| KULLANICI_ID>',
  example: [ 'songörülme @test#0001', 'songörülme 167144269485733961' ]
};
