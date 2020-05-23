/**
 * @file xp command
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license GPL-3.0
 */

exports.exec = async (Bastion, message, args) => {
  args = message.mentions.users.first() || message.author;

  let guildMemberModel = await Bastion.database.models.guildMember.findOne({
    attributes: [ 'experiencePoints', 'level' ],
    where: {
      userID: args.id,
      guildID: message.guild.id
    }
  });
  let level = 0, xp = 0;

  if (guildMemberModel) {
    level = guildMemberModel.dataValues.level;
    xp = guildMemberModel.dataValues.experiencePoints;
  }

  let description = message.author.id === args.id ? `**${args.tag}**  **${xp}** Deneyim Puanına Sahipsin, ${Bastion.methods.getRequiredExpForLevel(parseInt(level, 10) + 1)} Deneyim sonra seviye atlayacaksın.` : `**${args.tag}**  **${xp}** Deneyim Puanına Sahip.`;

  message.channel.send({
    embed: {
      color: Bastion.colors.BLUE,
      description: description
    }
  });
};

exports.config = {
  aliases: ['xp'],
  enabled: true
};

exports.help = {
  name: 'xp',
  description: 'Shows the experience points of the specified user\'s account.',
  botPermission: '',
  userTextPermission: '',
  userVoicePermission: '',
  usage: 'xp [@user-mention]',
  example: [ 'xp', 'xp @kullanıcı#0001' ]
};
