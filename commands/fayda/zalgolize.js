/**
 * @file zalgolize command
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license GPL-3.0
 */

exports.exec = async (Bastion, message, args) => {
  if (!args.length) {
    return Bastion.emit('commandUsage', message, this.help);
  }

  await message.channel.send({
    embed: {
      color: Bastion.colors.BLUE,
      title: 'Bozuk Yazı',
      description: Bastion.methods.zalgolize(args.join(' '))
    }
  });
};

exports.config = {
  aliases: [ 'bozukyazı' ],
  enabled: true
};

exports.help = {
  name: 'zalgolize',
  description: 'Sends the same message that you had sent, but zalgolized.',
  botPermission: '',
  userTextPermission: '',
  userVoicePermission: '',
  usage: 'bozukyazı <yazı>',
  example: [ 'bozukyazı Bu bot bir harika!' ]
};
