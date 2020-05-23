/**
 * @file textUnMute command
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

  if (args.server) {
    let mutedRole = message.guild.roles.find(role => role.name === 'Bastion:mute');
    await member.removeRole(mutedRole, args.reason);
  }
  else {
    let permissionOverwrites = message.channel.permissionOverwrites.get(user.id);
    if (permissionOverwrites) {
      await permissionOverwrites.delete();
    }
  }

  args.reason = args.reason.join(' ');

  await message.channel.send({
    embed: {
      color: Bastion.colors.GREEN,
      description: Bastion.i18n.info(message.guild.language, 'textUnmute', message.author.tag, user.tag, args.reason)
    }
  }).catch(e => {
    Bastion.log.error(e);
  });

  Bastion.emit('moderationLog', message, this.help.name, user, args.reason, {
    channel: message.channel
  });
};

exports.config = {
  aliases: [ 'tum' ],
  enabled: true,
  argsDefinitions: [
    { name: 'id', type: String, defaultOption: true },
    { name: 'reason', alias: 'r', type: String, multiple: true, defaultValue: [ 'Neden verilmemiş.' ] },
    { name: 'server', type: Boolean, alias: 's' }
  ]
};

exports.help = {
  name: 'textUnmute',
  description: 'Text mutes a specified user from the specified text channel (for specified minutes) or globally on your Discord server.',
  botPermission: 'MANAGE_ROLES',
  userTextPermission: 'MUTE_MEMBERS',
  userVoicePermission: '',
  usage: 'yazısusturmama < @KULLANICI | KULLANICI_ID > [-r Neden] [--server]',
  example: [ 'yazısusturmama @user#0001 -r Yanlış Anlama']
};

