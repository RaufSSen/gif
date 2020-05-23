/**
 * @file relayDirectMessages command
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license GPL-3.0
 */

exports.exec = async (Bastion, message) => {
  let settingsModel = await Bastion.database.models.settings.findOne({
    attributes: [ 'relayDirectMessages' ],
    where: {
      botID: Bastion.user.id
    }
  });

  await Bastion.database.models.settings.update({
    relayDirectMessages: !settingsModel.dataValues.relayDirectMessages
  },
  {
    where: {
      botID: Bastion.user.id
    },
    fields: [ 'relayDirectMessages' ]
  });

  await message.channel.send({
    embed: {
      color: Bastion.colors[settingsModel.dataValues.relayDirectMessages ? 'RED' : 'GREEN'],
      description: Bastion.i18n.info(message.guild.language, settingsModel.dataValues.relayDirectMessages ? 'disableDirectMessageReyals' : 'enableDirectMessageReyals', message.author.tag)
    }
  }).catch(e => {
    Bastion.log.error(e);
  });
};

exports.config = {
  aliases: [ 'dmtowner' ],
  enabled: true,
  ownerOnly: true
};

exports.help = {
  name: 'relayDirectMessages',
  description: 'BOT\'a yazdığın TÜM mesajlar dosdoğru sahibe gider.',
  botPermission: '',
  userTextPermission: '',
  userVoicePermission: '',
  usage: 'dmtowner',
  example: []
};
