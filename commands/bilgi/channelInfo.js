/**
 * @file channelInfo command
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license GPL-3.0
 */

exports.exec = async (Bastion, message, args) => {
  let channel = message.mentions.channels.first();
  if (!channel) {
    if (parseInt(args[0]) < 9223372036854775807) {
      channel = message.guild.channels.get(args[0]);
    }
    else channel = message.channel;
  }

  if (channel) {
    let title;
    if (channel.type === 'text') {
      title = 'Yazı Kanalı Bilgisi';
    }
    else {
      title = 'SesnKaalı Bilgisi';
    }
    await message.channel.send({
      embed: {
        color: Bastion.colors.BLUE,
        title: title,
        fields: [
          {
            name: 'Ad',
            value: channel.name,
            inline: true
          },
          {
            name: 'ID',
            value: channel.id,
            inline: true
          },
          {
            name: 'Konu',
            value: (channel.topic === null || channel.topic.length < 2) ? '-' : channel.topic,
            inline: false
          },
          {
            name: 'Oluşturuldu',
            value: channel.createdAt.toUTCString(),
            inline: true
          },
          {
            name: 'Kullanıcılar',
            value: channel.members.size,
            inline: true
          }
        ]
      }
    });
  }
  else {
    return Bastion.emit('error', '', Bastion.i18n.error(message.guild.language, 'channelNotFound'), message.channel);
  }
};

exports.config = {

  aliases: [ 'kanalBilgi' ],  enabled: true
};

exports.help = {
  name: 'kchannelInfo',
  description: 'Shows information of a specified text or voice channel of your Discord server.',
  botPermission: '',
  userTextPermission: '',
  userVoicePermission: '',
  usage: 'kanalbilgi [#kanal | KANAL_ID]',
  example: [ 'kanalbilgi #test', 'kanalbilgi 221133445599667788', 'kanalbilgi' ]
};
 