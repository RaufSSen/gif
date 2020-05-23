/**
 * @file ship command
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license GPL-3.0
 */

exports.exec = async (Bastion, message) => {
  let users = message.mentions.users.map(u => u.username);
  if (users.length < 2) {
    return Bastion.emit('commandUsage', message, this.help);
  }

  let shippedName = '';
  for (let i = 0; i < users.length; i++) {
    shippedName += `${users[i].substring(0, users[i].length / 2)}`;
  }

  await message.channel.send({
    embed: {
      color: Bastion.colors.BLUE,
      title: 'Shipped Users',
      description: `${users.join(' + ')} = **${shippedName}**`
    }
  });
};

exports.config = {
  aliases: ['birleştir'],
  enabled: true
};

exports.help = {
  name: 'ship',
  description: 'İnsanların isimlerini birleştirir.',
  botPermission: '',
  userTextPermission: '',
  userVoicePermission: '',
  usage: 'birleştir <KULLANICI> <KULLANICI> [...KULLANICI]',
  example: [ 'birleştir test#0001 test#0002 test#0003' ]
};
