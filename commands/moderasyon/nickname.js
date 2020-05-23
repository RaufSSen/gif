/**
 * @file nickname command
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license GPL-3.0
 */

exports.exec = async (Bastion, message, args) => {
  let user;
  if (message.mentions.users.size) {
    user = message.mentions.users.first();
  }
  else if (args.id) {
    user = await Bastion.fetchUser(args.id);
  }
  if (!user) {
    return Bastion.emit('commandUsage', message, this.help);
  }

  let member = await Bastion.utils.fetchMember(message.guild, user.id);
  if (message.author.id !== message.guild.ownerID && message.member.highestRole.comparePositionTo(member.highestRole) <= 0) return Bastion.log.info(Bastion.i18n.error(message.guild.language, 'lowerRole'));

  let color;
  let nickStat = '';
  if (message.guild.ownerID === member.id) {
    color = Bastion.colors.RED;
    nickStat = 'Sunucu sahibinin ismi değiştirilemez.';
  }
  else {
    args.nick = args.nick.join(' ');

    if (args.nick > 31) {
      color = Bastion.colors.RED;
      nickStat = 'İsim 31 harften uzun olamaz.';
    }
    else {
      if (args.nick < 1) {
        color = Bastion.colors.RED;
        nickStat = Bastion.i18n.info(message.guild.language, 'removeNickname', message.author.tag, user.tag);
      }
      else {
        color = Bastion.colors.GREEN;
        nickStat = Bastion.i18n.info(message.guild.language, 'setNickname', message.author.tag, user.tag, args.nick);
      }
    }
    await member.setNickname(args.nick);
  }

  await message.channel.send({
    embed: {
      color: color,
      description: nickStat
    }
  }).catch(e => {
    Bastion.log.error(e);
  });
};

exports.config = {
  aliases: [ 'nick' ],
  enabled: true,
  argsDefinitions: [
    { name: 'id', type: String, defaultOption: true },
    { name: 'nick', alias: 'n', type: String, multiple: true, defaultValue: [] }
  ]
};

exports.help = {
  name: 'nickname',
  description: 'Sunucudaki ismini değiştirir.',
  botPermission: 'MANAGE_NICKNAMES',
  userTextPermission: 'MANAGE_NICKNAMES',
  userVoicePermission: '',
  usage: 'nickname < @KULLANICI | KULLANICI_ID > [-n isim]',
  example: [ 'nickname @user#0001 -n Efsane', 'nickname 167147569575323761' ]
};
