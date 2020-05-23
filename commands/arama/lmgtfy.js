/**
 * @file lmgtfy command
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license GPL-3.0
 */

exports.exec = async (Bastion, message, args) => {
  if (!args.length) {
    return Bastion.emit('commandUsage', message, this.help);
  }
  let user;
  if (message.mentions.users.size) {
    user = message.mentions.users.first();
  }
  else if (args.id) {
    user = await Bastion.utils.fetchMember(message.guild, args.id);
    if (user) {
      user = user.user;
    }
  }
  if (!user) {
    user = message.author;
  }

  let guildMemberModel = await Bastion.database.models.guildMember.findOne({
    attributes: [ 'userID', 'guildID', 'bastionCurrencies', 'experiencePoints', 'level', 'karma' ].concat([
      [ Bastion.database.literal(`(SELECT COUNT(*) FROM guildMembers AS member WHERE member.guildID = ${message.guild.id} AND member.experiencePoints * 1 > guildMember.experiencePoints * 1)`), 'rank' ]
    ]),
    where: {
      userID: user.id,
      guildID: message.guild.id
    }
  });

  let userModel = await Bastion.database.models.user.findOne({
    attributes: [ 'avatar', 'info', 'birthDate', 'color', 'location' ],
    where: {
      userID: user.id
    }
  });

  await message.channel.send({
    embed: {
        color: userModel.dataValues.color ? userModel.dataValues.color : Bastion.colors.BLUE,
      title: 'Senin için aramama izin ver:',
      description: `https://lmgtfy.com/?s=d&q=${encodeURIComponent(args.join(' '))}`,
      footer: {
        text: 'lmgtfy tarafından güçlendirildi'
      }
    }
  });
};

exports.config = {
  aliases: [ 'siaiv'],
  enabled: true
};

exports.help = {
  name: 'lmgtfy',
  description: 'Teach users how to do an internet search and get answers to their questions.',
  botPermission: '',
  userTextPermission: '',
  userVoicePermission: '',
  usage: 'siaiv <yazı>',
  example: [ 'siaiv Bilgisayar nasıl kapatılır?' ]
};
