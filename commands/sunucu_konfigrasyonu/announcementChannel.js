/**
 * @file announcementChannel command
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license GPL-3.0
 */

exports.exec = async (Bastion, message, args) => {
  let description, color;

  if (args.remove) {
    await Bastion.database.models.guild.update({
      announcementChannel: null
    },
    {
      where: {
        guildID: message.guild.id
      },
      fields: [ 'announcementChannel' ]
    });
    description = Bastion.i18n.info(message.guild.language, 'disableAnnouncementChannel', message.author.tag);
    color = Bastion.colors.RED;
  }
  else {
    await Bastion.database.models.guild.update({
      announcementChannel: message.channel.id
    },
    {
      where: {
        guildID: message.guild.id
      },
      fields: [ 'announcementChannel' ]
    });
    description = Bastion.i18n.info(message.guild.language, 'enableAnnouncementChannel', message.author.tag);
    color = Bastion.colors.GREEN;
  }

  await message.channel.send({
    embed: {
      color: color,
      description: description
    }
  }).catch(e => {
    Bastion.log.error(e);
  });
};

exports.config = {
  aliases: ['duyurukanalı'],
  enabled: true,
  argsDefinitions: [
    { name: 'sil', type: Boolean, alias: 'r' }
  ]
};

exports.help = {
  name: 'duyurukanalı',
  description: 'Adds/removes an announcement channel. You will receive announcements made by the bot owner in this channel.',
  botPermission: '',
  userTextPermission: 'MANAGE_GUILD',
  userVoicePermission: '',
  usage: 'duyurukanalı [--sil]',
  example: [ 'duyurukanalı', 'duyurukanalı --sil' ]
};
