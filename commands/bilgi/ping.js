/**
 * @file ping command
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license GPL-3.0
 */

exports.exec = async (Bastion, message) => {
  let responseMessage = await message.channel.send({
    embed: {
      color: Bastion.colors.BLUE,
      description: 'Ölçülüyor...'
    }
  });
  await responseMessage.edit({
    embed: {
      color: Bastion.colors.BLUE,
      title: `${Bastion.user.username} PING Statistics`,
      image: ``,
      fields: [
        {
          name: 'Cevapverme zamanı',
          value: `${responseMessage.createdTimestamp - message.createdTimestamp}ms`,
          inline: true
        },
        {
          name: 'WebSocket PING',
          value: `${Bastion.ping}ms`,
          inline: true
        }
      ]
    }
  });
};

exports.config = {
  aliases: ['ping'],
  enabled: true
};

exports.help = {
  name: 'ping',
  description: 'Shows the response time and average WebSocket ping of %bastion%.',
  botPermission: '',
  userTextPermission: '',
  userVoicePermission: '',
  usage: 'ping',
  example: []
};
