/**
 * @file addFilteredWords command
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license GPL-3.0
 */

exports.exec = async (Bastion, message, args) => {
  if (!args.length) {
    return Bastion.emit('commandUsage', message, this.help);
  }

  let guildModel = await Bastion.database.models.guild.findOne({
    attributes: [ 'filteredWords' ],
    where: {
      guildID: message.guild.id
    }
  });

  let filteredWords = [];
  if (guildModel.dataValues.filteredWords) {
    filteredWords = guildModel.dataValues.filteredWords;
  }
  filteredWords = filteredWords.concat(args);
  filteredWords = [ ...new Set(filteredWords) ];

  await Bastion.database.models.guild.update({
    filteredWords: filteredWords
  },
  {
    where: {
      guildID: message.guild.id
    },
    fields: [ 'filteredWords' ]
  });

  await message.channel.send({
    embed: {
      color: Bastion.colors.GREEN,
      title: 'YasaklıKelime Listesine Eklendi',
      description: args.join(', ')
    }
  }).catch(e => {
    Bastion.log.error(e);
  });
};

exports.config = {
  aliases: [ 'YasaklıKelime' ],
  enabled: true
};

exports.help = {
  name: 'addFilteredWords',
  description: 'Sunucunun Kelime Sözlüğüne Kelime Ekler.',
  botPermission: 'MANAGE_MESSAGES',
  userTextPermission: 'MANAGE_GUILD',
  userVoicePermission: '',
  usage: 'YasaklıKelime kelime [başkaKelime] [dahabaşkaKelime]',
  example: [ 'YasaklıKelime insan elma at' ]
};
