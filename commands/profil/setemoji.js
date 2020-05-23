/**
 * @file setInfo command
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license GPL-3.0
 */

exports.exec = async (Bastion, message, args) => {
  if (!args.length) {
    return Bastion.emit('commandUsage', message, this.help);
  }
  args = args.join(' ');

  let charLimit = 160;
  let emoji = await Bastion.utils.compressString(args);

  if (emoji.length > charLimit) {
    return Bastion.emit('error', '', Bastion.i18n.error(message.guild.language, 'emojiRange', charLimit), message.channel);
  }

  let userModel = await Bastion.database.models.user.findOne({
    attributes: [ 'emoji' ],
    where: {
      userID: message.author.id
    }
  });

  if (!userModel) {
    return message.channel.send({
      embed: {
        description: `<@${args.id}> you didn't had a profile yet. I've now created your profile. Now you can use the command again to set your emoji.`
      }
    }).catch(e => {
      Bastion.log.error(e);
    });
  }

  await Bastion.database.models.user.update({
    emoji: emoji
  },
  {
    where: {
      userID: message.author.id
    },
    fields: [ 'emoji' ]
  });

  await message.channel.send({
    embed: {
      color: Bastion.colors.GREEN,
      title: 'Ayarlandı',
      description: args,
      footer: {
        text: args.tag
      }
    }
  }).catch(e => {
    Bastion.log.error(e);
  });
};

exports.config = {
  aliases: ['setEmoji'],
  enabled: true
};

exports.help = {
  name: 'setEmoji',
  description: 'Sets your emoji that shows up in the Bastion user profile.',
  botPermission: '',
  userTextPermission: '',
  userVoicePermission: '',
  usage: 'bilgiAyarla <yazı>',
  example: [ 'bilgiAyarla Sadece yakışıklıyım. :sunglasses:' ]
};
