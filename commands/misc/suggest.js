/**
 * @file suggest command
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license GPL-3.0
 */

exports.exec = async (Bastion, message, args) => {
  if (!args.description) {
    return Bastion.emit('commandUsage', message, this.help);
  }

  let guildModel = await Bastion.database.models.guild.findOne({
    attributes: [ 'suggestionChannel' ],
    where: {
      guildID: message.guild.id
    }
  });

  let suggestionChannel;
  if (guildModel && guildModel.dataValues.suggestionChannel) {
    suggestionChannel = message.guild.channels.filter(channel => channel.type === 'text').get(guildModel.dataValues.suggestionChannel);
  }

  if (!suggestionChannel) {
    suggestionChannel = message.channel;
  }

  let suggestion = await suggestionChannel.send({
    embed: {
      title: 'Öneri',
      description: args.description.join(' '),
      image: {
        url: (message.attachments.size && message.attachments.first().height && message.attachments.first().url) || null
      },
      footer: {
        text: `${message.author.tag} tarafınadn önerildi.`
      }
    }
  });

  // Delete user's message
  if (message.deletable) {
    message.delete().catch(() => {});
  }

  // Add reactions for voting
  await suggestion.react('👍');
  await suggestion.react('👎');
};

exports.config = {
  aliases: ['öner'],
  enabled: true,
  argsDefinitions: [
    { name: 'description', type: String, multiple: true, defaultOption: true }
  ]
};

exports.help = {
  name: 'suggest',
  description: 'Posts a suggestion to the suggestion channel, if a suggestion channel has been set. Otherwise posts the suggestion in the current channel.',
  botPermission: '',
  userTextPermission: '',
  userVoicePermission: '',
  usage: 'öner <ÖNERİ>',
  example: [ 'öner Yeni roller eklensin.' ]
};
