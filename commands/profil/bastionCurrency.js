/**
 * @file bastionCurrency command
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license GPL-3.0
 */

exports.exec = async (Bastion, message, args) => {
  args = message.mentions.users.first() || message.author;

  let guildMemberModel = await Bastion.database.models.guildMember.findOne({
    attributes: [ 'bastionCurrencies' ],
    where: {
      userID: args.id,
      guildID: message.guild.id
    }
  });

  let bastionCurrencies = 0;

  if (guildMemberModel) {
    bastionCurrencies = guildMemberModel.dataValues.bastionCurrencies;
  }

  let description = message.author.id === args.id ? `**${args.tag}** şu an hesabınızda **${bastionCurrencies}** Para bulunmaktadır.` : `**${args.tag}** currently has **${bastionCurrencies}** Bastion Currencies in their account.`;

  await message.channel.send({
    embed: {
      color: Bastion.colors.BLUE,
      description: description
    }
  });
};

exports.config = {
  aliases: [],
  enabled: true
};

exports.help = {
  name: 'para',
  description: 'Shows the amount of %currency.name_plural% in the specified user\'s account.',
  botPermission: '',
  userTextPermission: '',
  userVoicePermission: '',
  usage: 'para [@user-kullanıcı]',
  example: [ 'para', 'para @user#0001' ]
};
