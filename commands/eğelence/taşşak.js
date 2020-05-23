/**
 * @file hello command
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license GPL-3.0
 */

exports.exec = async (Bastion, message) => {
  await message.channel.send({
    embed: {
      color: Bastion.colors.BLUE,
      description: '🍆💦',
      footer: {
        text: `Sadece eğelence için yalnış anlama.`
      }
    }
  });
};

exports.config = {
  aliases: [ 'taşşak' ],
  enabled: true
};

exports.help = {
  name: 'taşşak',
  description: 'Eat my taşşak.',
  botPermission: '',
  userTextPermission: '',
  userVoicePermission: '',
  usage: 'taşşak',
  example: []
};
