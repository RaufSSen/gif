/**
 * @file manga command
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license GPL-3.0
 */

exports.exec = async (Bastion, message, args) => {
  if (!args.name) {
    return Bastion.emit('commandUsage', message, this.help);
  }

  let manga = await Bastion.methods.makeBWAPIRequest('/kitsu/manga', {
    qs: {
      name: args.name
    }
  });

  manga = manga[0];
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
      title: Object.values(manga.titles)[0],
      url: `https://kitsu.io/manga/${manga.slug}`,
      fields: [
        {
          name: 'Durum',
          value: manga.endDate ? 'Bitmiş' : 'Yayınlanıyor',
          inline: true
        },
        {
          name: 'Yayınlanma',
          value: manga.endDate ? `${manga.startDate} - ${manga.endDate}` : `${manga.startDate} - Present`,
          inline: true
        }
      ],
      image: {
        url: manga.posterImage.original
      },
      footer: {
        text: 'Kitsu tarafından güçlendirildi'
      }
    }
  });
};

exports.config = {
  aliases: ['manga'],
  enabled: true,
  argsDefinitions: [
    { name: 'name', type: String, multiple: true, defaultOption: true }
  ]
};

exports.help = {
  name: 'manga',
  description: 'Searches for the details of a Manga.',
  botPermission: '',
  userTextPermission: '',
  userVoicePermission: '',
  usage: 'manga <Manga Adı>',
  example: [ 'manga Death Note' ]
};
