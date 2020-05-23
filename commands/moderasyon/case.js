/**
 * @file case command
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license GPL-3.0
 */

exports.exec = async (Bastion, message, args) => {
  if (!args.number) {
    return Bastion.emit('commandUsage', message, this.help);
  }

  let guildModel = await message.client.database.models.guild.findOne({
    attributes: [ 'moderationLog' ],
    where: {
      guildID: message.guild.id
    },
    include: [
      {
        model: message.client.database.models.moderationCase,
        attributes: [ 'guildID', 'number', 'messageID' ],
        where: {
          number: args.number
        }
      }
    ]
  });

  if (!guildModel || !guildModel.dataValues.moderationLog || !guildModel.moderationCases.length) return;

  let modLogChannel = message.guild.channels.get(guildModel.dataValues.moderationLog);
  if (!modLogChannel) return;

  let modMessage = await modLogChannel.fetchMessage(guildModel.moderationCases[0].dataValues.messageID);

  if (modMessage && modMessage.embeds.length) {
    let embed = {
      color: Bastion.colors.BLUE,
      title: modMessage.embeds[0].title,
      description: modMessage.embeds[0].description,
      fields: modMessage.embeds[0].fields.map(field => {
        return {
          name: field.name,
          value: field.value,
          inline: field.inline
        };
      }),
      footer: {
        text: `Requested ${modMessage.embeds[0].footer.text}`
      },
      timestamp: modMessage.embeds[0].createdTimestamp
    };

    await message.channel.send({
      embed: embed
    });
  }
};

exports.config = {
  aliases: [],
  enabled: true,
  argsDefinitions: [
    { name: 'number', type: String, defaultOption: true }
  ]
};

exports.help = {
  name: 'case',
  description: 'Denetleme günlüğü vaka numarasını kullanarak denetleme günlüğü kanalına kaydedilen denetleme eylemini alır..',
  botPermission: '',
  userTextPermission: '',
  userVoicePermission: '',
  usage: 'case <NUMARA>',
  example: [ 'case 1337' ]
};