/**
 * @file movie command
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license GPL-3.0
 */

exports.exec = async (Bastion, message, args) => {
  if (!args.movie) {
    return Bastion.emit('commandUsage', message, this.help);
  }

  let movie = await Bastion.methods.makeBWAPIRequest(`/movies/search/${args.movie}`);

  movie = movie.results[0];

  if (!movie) {
    return Bastion.emit('error', '', Bastion.i18n.error(message.guild.language, 'notFound', 'movie'), message.channel);
  }

  // Hard coded genre IDs because they are not likely to change for v3 and dynamically getting them would mean sending another request, since it's a seperate endpoint.
  let genre_list = { '28': 'Aksiyon', '12': 'Macera', '16': 'Animasyon', '35': 'Komedi', '80': 'Suç', '99': 'Belgesel', '18': 'Drama', '10751': 'Aile', '14': 'Fantastik', '36': 'Tarih', '27': 'Korku', '10402': 'Müzik', '9648': 'Gizem', '10749': 'Romans', '878': 'Bilim Kurgu', '10770': 'TV Filmi', '53': 'Gerilim', '10752': 'Savaş', '37': 'Batı' };
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
      title: movie.title,
      url: `https://themoviedb.org/movie/${movie.id}`,
      fields: [
        {
          name: 'Tür',
          value: movie.genre_ids.map(id => genre_list[id]).join('\n'),
          inline: true
        },
        {
          name: 'Dil',
          value: movie.original_language.toUpperCase(),
          inline: true
        },
        {
          name: 'Puan',
          value: `${movie.vote_average}`,
          inline: true
        },
        {
          name: 'Çıkış Tarihi',
          value: movie.release_date,
          inline: true
        }
      ],
      image: {
        url: movie.poster_path ? `https://image.tmdb.org/t/p/original${movie.poster_path}` : `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
      },
      footer: {
        text: 'The Movie Database tarafından güçlendirildi'
      }
    }
  });
};

exports.config = {
  aliases: [ 'film' ],
  enabled: true,
  argsDefinitions: [
    { name: 'movie', type: String, multiple: true, defaultOption: true }
  ]
};

exports.help = {
  name: 'movie',
  description: 'Searches for the details of a movie.',
  botPermission: '',
  userTextPermission: '',
  userVoicePermission: '',
  usage: 'film <Film Adı>',
  example: [ 'film Chappie' ]
};
