/**
 * @file game command
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license GPL-3.0
 */

exports.exec = async (Bastion, message, args) => {
  if (!args.name || !args.name.length) {
    return Bastion.emit('commandUsage', message, this.help);
  }

  args.name = args.name.join(' ');

  let games = await Bastion.methods.makeBWAPIRequest(`/games/search/${args.name}`);
  let game = games[0];

  if (!game) {
    return Bastion.emit('error', '', Bastion.i18n.error(message.guild.language, 'notFound', 'oyun'), message.channel);
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
      title: game.name,
      url: game.url,
      fields: [
        {
          name: 'Puanlama',
          value: game.total_rating ? game.total_rating.toFixed(2) : '-',
          inline: true
        },
        {
          name: 'Çıkış Tarihi',
          value: new Date(game.first_release_date).toDateString(),
          inline: true
        },
        {
          name: 'Linkler',
          value: game.websites ? game.websites.map(website => website.url).join('\n') : '-'
        }
      ],
      image: {
        url: `https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.cloudinary_id}.jpg`
      },
      footer: {
        text: 'IGDB Tarafından Güçlendirildi'
      }
    }
  });
};

exports.config = {
  aliases: ['oyun'],
  enabled: true,
  argsDefinitions: [
    { name: 'name', type: String, multiple: true, defaultOption: true }
  ]
};

exports.help = {
  name: 'game',
  description: 'Oyun Detaylara.',
  botPermission: '',
  userTextPermission: '',
  userVoicePermission: '',
  usage: 'game <AD>',
  example: [ 'oyun Call of Duty Infinite Warfare', 'oyun Overwatch' ]
};
