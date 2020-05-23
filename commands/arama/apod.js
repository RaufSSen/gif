/**
 * @file apod command
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license GPL-3.0
 */

exports.exec = async (Bastion, message, args) => {
  let response = await Bastion.methods.makeBWAPIRequest('/nasa/apod');

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
      author: {
        name: 'Günün Astonomi Resmi',
        url: 'http://apod.nasa.gov/'
      },
      title: response.title,
      description: response.explanation,
      image: {
        url: response.hdurl || response.url
      },
      footer: {
        text: `Powered by NASA • Image Credit & Copyright - ${response.copyright}`
      }
    }
  });
};

exports.config = {
  aliases: ['nasaresim'],
  enabled: true
};

exports.help = {
  name: 'apod',
  description: 'Discover the cosmos! Each day a different image or photograph of our fascinating universe is featured, along with a brief explanation written by a professional astronomer.',
  botPermission: '',
  userTextPermission: '',
  userVoicePermission: '',
  usage: 'nasaresim',
  example: []
};
