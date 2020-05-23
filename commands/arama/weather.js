/**
 * @file weather command
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license GPL-3.0
 */

const weather = xrequire('weather-js');

exports.exec = async (Bastion, message, args) => {
  if (!args.length) {
    return Bastion.emit('commandUsage', message, this.help);
  }

  await weather.find({ search: args.join(' '), degreeType: 'C' }, async (err, result) => {
    if (err) {
      return Bastion.emit('error', '', Bastion.i18n.error(message.guild.language, 'weatherNotFound'), message.channel);
    }

    if (!result || !result.length) {
      return Bastion.emit('error', '', Bastion.i18n.error(message.guild.language, 'connection'), message.channel);
    }

    result = result[0];

    await message.channel.send({
      embed: {
        color: Bastion.colors.BLUE,
        title: 'Şu anki hava',
        fields: [
          {
            name: 'Yer',
            value: result.location.name,
            inline: true
          },
          {
            name: 'Kordinat',
            value: `${result.location.lat}, ${result.location.long}`,
            inline: true
          },
          {
            name: 'Zaman Aralığı',
            value: `UTC${result.location.timezone >= 0 ? `+${result.location.timezone}` : result.location.timezone}`,
            inline: true
          },
          {
            name: 'Koşul',
            value: result.current.skytext,
            inline: true
          },
          {
            name: 'Sıcaklık',
            value: `${result.current.temperature} \u00B0${result.location.degreetype}`,
            inline: true
          },
          {
            name: 'Hissedilen',
            value: `${result.current.feelslike} \u00B0${result.location.degreetype}`,
            inline: true
          },
          {
            name: 'Düşük',
            value: `${result.forecast[1].low} \u00B0${result.location.degreetype}`,
            inline: true
          },
          {
            name: 'Yüksek',
            value: `${result.forecast[1].high} \u00B0${result.location.degreetype}`,
            inline: true
          },
          {
            name: 'Rüzgar hızı',
            value: result.current.winddisplay,
            inline: true
          },
          {
            name: 'Nem',
            value: `${result.current.humidity}%`,
            inline: true
          },
          {
            name: 'Yağış',
            value: `${result.forecast[1].precip} cm`,
            inline: true
          },
          {
            name: 'Gözlem zamanı',
            value: result.current.observationtime,
            inline: true
          }
        ],
        thumbnail: {
          url: `https://resources.bastionbot.org/images/weather/${result.current.skycode}.png`
        },
        footer: {
          text: 'MSN Weather tarafından güçlendirildi.'
        }
      }
    });
  });
};

exports.config = {
  aliases: [ 'hava' ],
  enabled: true
};

exports.help = {
  name: 'weather',
  description: 'Shows weather information of the specified location.',
  botPermission: '',
  userTextPermission: '',
  userVoicePermission: '',
  usage: 'weather <city [, country_code]|zipcode>',
  example: [ 'weather London, UK', 'weather 94109' ]
};
