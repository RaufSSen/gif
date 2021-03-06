/**
 * @file echo command
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license GPL-3.0
 */

exports.exec = async (Bastion, message, args) => {
  if (args.length < 1) {
    return Bastion.emit('commandUsage', message, this.help);
  }

  await message.channel.send({
    embed: {
      color: Bastion.colors.BLUE,
      description: args.join(' '),
      footer: {
        text: `${Bastion.credentials.ownerId.includes(message.author.id) ? '' : Bastion.i18n.info(message.guild.language, 'endorsementMessage')}`
      }
    }
  });
};

exports.config = {
  aliases: [ 'spoiler2' ],
  enabled: true
};

exports.help = {
  name: 'spoiler2',
  description: 'Sends the same message that you had sent. Just like an echo!',
  botPermission: '',
  userTextPermission: 'MANAGE_GUILD',
  userVoicePermission: '',
  usage: 'söyle <yazı>',
  example: [ 'söyle Merhaba, dünya!' ]
};
