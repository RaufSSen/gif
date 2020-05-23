/**
 * @file deleteAllTriggers command
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license GPL-3.0
 */

exports.exec = async (Bastion, message) => {
  await Bastion.database.models.trigger.destroy({
    where: {
      guildID: message.guild.id
    }
  });

  await message.channel.send({
    embed: {
      color: Bastion.colors.RED,
      description: 'Deleted all the triggers and responses.'
    }
  }).catch(e => {
    Bastion.log.error(e);
  });
};

exports.config = {
  aliases: [ ],
  enabled: true
};

exports.help = {
  name: 'tümdialoglarısil',
  description: 'Deletes all the triggers and responses you have set.',
  botPermission: '',
  userTextPermission: 'MANAGE_GUILD',
  userVoicePermission: '',
  usage: 'tümdialoglarısil',
  example: []
};
