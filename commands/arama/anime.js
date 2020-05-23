/**
 * @file anime command
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license GPL-3.0
 */

exports.exec = async (Bastion, message, args) => {
  if (!args.name) {
    return Bastion.emit('commandUsage', message, this.help);
  }

  let anime = await Bastion.methods.makeBWAPIRequest('/kitsu/anime', {
    qs: {
      name: args.name
    }
  });
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

  anime = anime[0];

  if (anime) {
    await message.channel.send({
      embed: {
        color: userModel.dataValues.color ? userModel.dataValues.color : Bastion.colors.BLUE,
        title: Object.values(anime.titles)[0],
        url: `https://kitsu.io/anime/${anime.slug}`,
        fields: [
          {
            name: 'Durum',
            value: anime.endDate ? 'Finished' : 'Airing',
            inline: true
          },
          {
            name: 'Yayınlama Tarihi',
            value: anime.endDate ? `${anime.startDate} - ${anime.endDate}` : `${anime.startDate} - Present`,
            inline: true
          },
          {
            name: 'Oy',
            value: `${anime.ageRating} - ${anime.ageRatingGuide} ${anime.nsfw ? '[NSFW]' : ''}`,
            inline: true
          }
        ],
        image: {
          url: anime.posterImage.original
        },
        footer: {
          text: 'Kitsu  tarafından güçlendirildi.'
        }
      }
    });
  }
  else {
    return Bastion.emit('error', '', Bastion.i18n.error(message.guild.language, 'notFound', 'anime'), message.channel);
  }
};

exports.config = {
  aliases: ['anime'],
  enabled: true,
  argsDefinitions: [
    { name: 'name', type: String, multiple: true, defaultOption: true }
  ]
};

exports.help = {
  name: 'anime',
  description: 'Searches for the details of an Anime.',
  botPermission: '',
  userTextPermission: '',
  userVoicePermission: '',
  usage: 'anime <Anime Adı>',
  example: [ 'anime One Piece' ]
};
