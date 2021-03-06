/**
 * @file unMute command
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

  args.reason = args.reason.join(' ');

  await member.setMute(false);

  await message.channel.send({
    embed: {
      color: Bastion.colors.GREEN,
      description: Bastion.i18n.info(message.guild.language, 'voiceUnmute', message.author.tag, user.tag, args.reason)
    }
  }).catch(e => {
    Bastion.log.error(e);
  });

  Bastion.emit('moderationLog', message, this.help.name, user, args.reason);
};

exports.config = {
  aliases: ['susturma'],
  enabled: true,
  argsDefinitions: [
    { name: 'id', type: String, defaultOption: true },
    { name: 'reason', alias: 'r', type: String, multiple: true, defaultValue: [ 'Neden verilmemiş.' ] }
  ]
};

exports.help = {
  name: 'unMute',
  description: 'Unmutes a specified user server-wide in your Discord server.',
  botPermission: 'MUTE_MEMBERS',
  userTextPermission: 'MUTE_MEMBERS',
  userVoicePermission: '',
  usage: 'unMute <@KULLANICI | KULLANICI?ID> -r [Neden]',
  example: [ 'unMute @user#001 -r Özür Diledi', 'unMute 167147569575323761 -r Affettim' ]
};
