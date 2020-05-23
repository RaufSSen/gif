/**
 * @file userID command
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license GPL-3.0
 */

exports.exec = async (Bastion, message) => {
  let user = message.mentions.users.first();
  if (!user) {
    user = message.author;
  }

  await message.channel.send({
    embed: {
      color: Bastion.colors.BLUE,
      fields: [
        {
          name: `${user.bot ? 'Bot' : 'Kullanıcı'}`,
          value: user.tag,
          inline: true
        },
        {
          name: 'ID',
          value: user.id,
          inline: true
        }
      ]
    }
  });
};

exports.config = {
  aliases: [ 'kullanıcıID' ],
  enabled: true
};

exports.help = {
  name: 'userID',
  description: 'Shows ID of a specified user of your Discord server.',
  botPermission: '',
  userTextPermission: '',
  userVoicePermission: '',
  usage: 'kullanıcıID [@kullanıcı]',
  example: [ 'kullanıcıID @kullanıcı#0001', 'kullanıcıID' ]
};
