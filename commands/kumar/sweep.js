/**
 * @file sweep command
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license GPL-3.0
 */

exports.exec = async (Bastion, message) => {
  let sweepedUser = message.channel.members.filter(m => !m.user.bot).random();

  await message.channel.send({
    embed: {
      color: Bastion.colors.BLUE,
      title: 'Swweplenmiş Kullanıcı',
      fields: [
        {
          name: 'Kullanıcı',
          value: sweepedUser.user.tag,
          inline: true
        },
        {
          name: 'ID',
          value: sweepedUser.id,
          inline: true
        }
      ]
    }
  });
};

exports.config = {
  aliases: ['sweep'],
  enabled: true
};

exports.help = {
  name: 'sweep',
  description: 'Yazı kanalından herhangi bir kullanıcıyı gösterir.',
  botPermission: '',
  userTextPermission: '',
  userVoicePermission: '',
  usage: 'sweep',
  example: []
};
