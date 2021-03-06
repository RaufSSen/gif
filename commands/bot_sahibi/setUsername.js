/**
 * @file setUsername command
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license GPL-3.0
 */

exports.exec = async (Bastion, message, args) => {
  if (args.join(' ').length >= 1) {
    await Bastion.user.setUsername(args.join(' '));

    await message.channel.send({
      embed: {
        color: Bastion.colors.GREEN,
        description: `${Bastion.user.username}'s username is now set to **${args.join(' ')}**`
      }
    }).catch(e => {
      Bastion.log.error(e);
    });
  }
};

exports.config = {
  aliases: [ 'isimAyarla' ],
  enabled: true,
  ownerOnly: true
};

exports.help = {
  name: 'setUsername',
  description: 'Changes the username of %bastion%.',
  botPermission: '',
  userTextPermission: '',
  userVoicePermission: '',
  usage: 'isimAyarla <ad>',
  example: [ 'isimAyarla AD' ]
};
