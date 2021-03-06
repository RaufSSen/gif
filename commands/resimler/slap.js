/**
 * @file slap command
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license GPL-3.0
 */

exports.exec = async (Bastion, message) => {
  let user = message.mentions.users.first();
  if (!user) {
    return Bastion.emit('commandUsage', message, this.help);
  }

  let slaps = [
    'https://i.giphy.com/media/3XlEk2RxPS1m8/giphy.gif',
    'https://i.giphy.com/media/mEtSQlxqBtWWA/giphy.gif',
    'https://i.giphy.com/media/j3iGKfXRKlLqw/giphy.gif',
    'https://i.giphy.com/media/2M2RtPm8T2kOQ/giphy.gif',
    'https://i.giphy.com/media/l3YSimA8CV1k41b1u/giphy.gif',
    'https://i.giphy.com/media/WLXO8OZmq0JK8/giphy.gif'
  ];

  await message.channel.send({
    embed: {
      color: Bastion.colors.BLUE,
      description: `${message.author.username} slapped ${user.username}!`,
      image: {
        url: slaps[Math.floor(Math.random() * slaps.length)]
      }
    }
  });
};

exports.config = {
  aliases: ['şaplak'],
  enabled: true
};

exports.help = {
  name: 'şaplak',
  description: 'Give a slap to another user.',
  botPermission: '',
  userTextPermission: '',
  userVoicePermission: '',
  usage: 'şaplak <@kullanıcı>',
  example: [ 'şaplak @user#0001' ]
};
