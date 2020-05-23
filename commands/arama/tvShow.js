/**
 * @file tvShow command
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license GPL-3.0
 */

exports.exec = async (Bastion, message, args) => {
  if (!args.tvshow) {
    return Bastion.emit('commandUsage', message, this.help);
  }

  let tvShow = await Bastion.methods.makeBWAPIRequest(`/tvshows/search/${args.tvshow}`);

  tvShow = tvShow.results[0];

  if (!tvShow) {
    return Bastion.emit('error', '', Bastion.i18n.error(message.guild.language, 'notFound', 'TV Şovu'), message.channel);
  }

  // Hard coded genre IDs because they are not likely to change for v3 and dynamically getting them would mean sending another request, since it's a seperate endpoint.
  let genre_list = { '10759': 'Aksiyon & Macera', '16': 'Animasyon', '35': 'Komedi', '80': 'Suç', '99': 'Belgesel', '18': 'Drama', '10751': 'Aile', '10762': 'Çocuk', '9648': 'Gizem', '10763': 'Haberler', '10764': 'Gerçeklik', '10765': 'Bilim-kurgu & Fantastik', '10766': 'Sabun', '10767': 'Konuşma', '10768': 'Savaş & Palitik', '37': 'Batı' };

  await message.channel.send({
    embed: {
      color: Bastion.colors.BLUE,
      title: tvShow.name,
      url: `https://themoviedb.org/tv/${tvShow.id}`,
      fields: [
        {
          name: 'Tür',
          value: tvShow.genre_ids.map(id => genre_list[id]).join('\n'),
          inline: true
        },
        {
          name: 'Dil',
          value: tvShow.original_language.toUpperCase(),
          inline: true
        },
        {
          name: 'Puanlama',
          value: `${tvShow.vote_average}`,
          inline: true
        },
        {
          name: 'İlk Çıkış Tarihi',
          value: tvShow.first_air_date,
          inline: true
        }
      ],
      image: {
        url: tvShow.poster_path ? `https://image.tmdb.org/t/p/original${tvShow.poster_path}` : `https://image.tmdb.org/t/p/original${tvShow.backdrop_path}`
      },
      footer: {
        text: 'Movie Database tarafından güçlendirildi.'
      }
    }
  });
};

exports.config = {
  aliases: [ 'tvShow' ],
  enabled: true,
  argsDefinitions: [
    { name: 'tvshow', type: String, multiple: true, defaultOption: true }
  ]
};

exports.help = {
  name: 'tvShow',
  description: 'Searches for the details of a TV show.',
  botPermission: '',
  userTextPermission: '',
  userVoicePermission: '',
  usage: 'tvShow <TV Show Name>',
  example: [ 'tvShow The Flash' ]
};
