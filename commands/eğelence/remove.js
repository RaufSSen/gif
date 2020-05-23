/**
 * @file remove command
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license GPL-3.0
 */

exports.exec = async (Bastion, message, args) => {
  await message.channel.send({
    embed: {
      color: Bastion.colors.BLUE,
      title: `${args.length ? `${args.join(' ')} ` : 'Sen'} siliniyor...`,
      image: {
        url: 'https://resources.bastionbot.org/images/remove_button.gif'
      }
    }
  });
};

exports.config = {
  aliases: [ 'sil' ],
  enabled: true
};

exports.help = {
  name: 'remove',
  description: 'Arkadaşlarınızı Kandırın Ama Sonra Şaka Olduğunu Söyleyin!',
  botPermission: '',
  userTextPermission: '',
  userVoicePermission: '',
  usage: 'sil <yazı>',
  example: [ 'sil İnsanlık' ]
};
