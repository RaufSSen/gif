/**
 * @file rip command
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license GPL-3.0
 */

exports.exec = async (Bastion, message, args) => {
  await message.channel.send({
    embed: {
      color: Bastion.colors.BLUE,
      title: `R.I.P ${args.length ? args.join(' ') : 'Everything'}`,
      image: {
        url: 'https://resources.bastionbot.org/images/tombstone_rip.png'
      },
      footer: {
        text: 'Rahat bir şekilde uyusun.'
      }
    }
  });
};

exports.config = {
  aliases: [],
  enabled: true
};

exports.help = {
  name: 'rip',
  description: 'Show your condolences for something (or everything).',
  botPermission: '',
  userTextPermission: '',
  userVoicePermission: '',
  usage: 'rip <yazı>',
  example: [ 'rip Grammar' ]
};
