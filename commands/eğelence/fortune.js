/**
 * @file fortune command
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license GPL-3.0
 */

const fortuneCookies = xrequire('./assets/fortuneCookies.json');

exports.exec = async (Bastion, message) => {
  await message.channel.send({
    embed: {
      color: Bastion.colors.BLUE,
      title: 'Şansın diyorki...',
      description: fortuneCookies.getRandom()
    }
  });
};

exports.config = {
  aliases: [ 'şans','şanslıkurabiye' ],
  enabled: true
};

exports.help = {
  name: 'fortune',
  description: 'Senin şansına kurabiye ne derse.',
  botPermission: '',
  userTextPermission: '',
  userVoicePermission: '',
  usage: 'şans',
  example: []
};
