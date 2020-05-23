/**
 * @file reverse command
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license GPL-3.0
 */

exports.exec = async (Bastion, message, args) => {
  if (args.length < 1) {
    return Bastion.emit('commandUsage', message, this.help);
  }

  await message.channel.send({
    embed: {
      color: Bastion.colors.BLUE,
      title: 'Tersten:',
      description: args.join(' ').split('').reverse().join('')
    }
  });
};

exports.config = {
  aliases: [ 'tersten' ],
  enabled: true
};

exports.help = {
  name: 'reverse',
  description: 'Sends the same message that you had sent but reversed.',
  botPermission: '',
  userTextPermission: '',
  userVoicePermission: '',
  usage: 'tersten <yazı>',
  example: [ 'tersten !!ılavaH koÇ uB' ]
};
