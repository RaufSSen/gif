/**
 * @file setNick command
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license GPL-3.0
 */

exports.exec = async (Bastion, message, args) => {
  if (!message.member.hasPermission('CHANGE_NICKNAME')) return;

  let description;

  if (args.length) {
    await message.guild.me.setNickname(args.join(' '));
    description = `${Bastion.user.username}' nin adı şimdi **${args.join(' ')}**`;
  }
  else {
    await message.guild.me.setNickname('');
    description = `${Bastion.user.username}' adını sıfırladı.`;
  }

  await message.channel.send({
    embed: {
      color: Bastion.colors.GREEN,
      description: description
    }
  }).catch(e => {
    Bastion.log.error(e);
  });
};

exports.config = {
  aliases: [ 'setNick' ],
  enabled: true,
  ownerOnly: true
};

exports.help = {
  name: 'setNick',
  description: 'Sets the nickname of Bastion in the current Discord server.',
  botPermission: 'CHANGE_NICKNAME',
  userTextPermission: 'CHANGE_NICKNAME',
  userVoicePermission: '',
  usage: 'setNick [yazı]',
  example: [ 'setNick Yeni Ad', 'setNick' ]
};
