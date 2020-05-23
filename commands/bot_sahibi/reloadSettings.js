/**
 * @file reloadSettings command
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license GPL-3.0
 */

exports.exec = async (Bastion, message) => {
  if (Bastion.shard) {
    await Bastion.shard.broadcastEval('this.reloadSettings()');
  }
  else {
    Bastion.reloadSettings();
  }

  await message.channel.send({
    embed: {
      color: Bastion.colors.GREEN,
      description: 'Tüm ayarlar geri yüklendi.'
    }
  }).catch(e => {
    Bastion.log.error(e);
  });
};

exports.config = {
  aliases: ['ayarları_tekraryükle'],
  enabled: true,
  ownerOnly: true
};

exports.help = {
  name: 'reloadSettings',
  description: 'Ayarları Tekrardan Başlatma Olmadan Geri Yükler.',
  botPermission: '',
  userTextPermission: '',
  userVoicePermission: '',
  usage: 'ayarları_tekraryükle',
  example: []
};
