/**
 * @file hello command
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license GPL-3.0
 */

exports.exec = async (Bastion, message) => {
  await message.channel.send({
    embed: {
      color: Bastion.colors.BLUE,
      description: 'Ya bi dur, daha komudu yazmadım amqç',
      footer: {
        text: `Sakin ol kaptan.`
      }
    }
  });
};

exports.config = {
  aliases: [ 'teyit' ],
  enabled: true
};

exports.help = {
  name: 'teyit',
  description: 'Eat my taşşak.',
  botPermission: '',
  userTextPermission: '',
  userVoicePermission: '',
  usage: 'taşşak',
  example: []
};
