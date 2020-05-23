/**
 * @file battlefield4 command
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license GPL-3.0
 */

const request = xrequire('request-promise-native');

exports.exec = async (Bastion, message, args) => {
  if (!args.name) {
    return Bastion.emit('commandUsage', message, this.help);
  }

  let options = {
    url: `https://api.bf4stats.com/api/playerInfo?plat=${args.platform}&name=${args.name}&output=json`,
    json: true
  };
  let response = await request(options);

  await message.channel.send({
    embed: {
      color: Bastion.colors.BLUE,
      author: {
        name: `[${response.player.tag}] ${response.player.name}`,
        url: response.player.blPlayer
      },
      title: 'Battlefield 4 - İstatik',
      description: `Played ${(response.player.timePlayed / 60 / 60).toFixed(2)} hours`,
      fields: [
        {
          name: 'Ülke',
          value: `:flag_${response.player.country.toLowerCase()}: ${response.player.countryName}`,
          inline: true
        },
        {
          name: 'Rank',
          value: `${response.player.rank.nr} - ${response.player.rank.name}`,
          inline: true
        },
        {
          name: 'Skor',
          value: `${response.player.score}`,
          inline: true
        },
        {
          name: 'Yetenek',
          value: `${response.stats.skill}`,
          inline: true
        },
        {
          name: 'SPM',
          value: `${(response.stats.extra.spm).toFixed(2)}`,
          inline: true
        },
        {
          name: 'KPM',
          value: `${(response.stats.extra.kpm).toFixed(2)}`,
          inline: true
        },
        {
          name: 'Kazanma',
          value: `${response.stats.numWins}`,
          inline: true
        },
        {
          name: 'Kaybetme',
          value: `${response.stats.numLosses}`,
          inline: true
        },
        {
          name: 'W/L',
          value: `${(response.stats.extra.wlr).toFixed(2)}`,
          inline: true
        },
        {
          name: 'Öldürme',
          value: `${response.stats.kills}`,
          inline: true
        },
        {
          name: 'Ölme',
          value: `${response.stats.deaths}`,
          inline: true
        },
        {
          name: 'K/D',
          value: `${(response.stats.extra.kdr).toFixed(2)}`,
          inline: true
        }
      ],
      thumbnail: {
        url: 'https://i.imgur.com/ox55mLK.jpg'
      },
      footer: {
        text: 'Battlefield tarafından güçlendirildi.'
      }
    }
  });
};

exports.config = {
  aliases: [ 'bf4' ],
  enabled: true,
  argsDefinitions: [
    { name: 'name', type: String, alias: 'n', defaultOption: true },
    { name: 'platform', type: String, alias: 'p', defaultValue: 'pc' }
  ]
};

exports.help = {
  name: 'battlefield4',
  description: 'Get stats of any Battlefield 4 player.',
  botPermission: '',
  userTextPermission: '',
  userVoicePermission: '',
  usage: 'battlefield4 <kullanıcı>',
  example: [ 'battlefield4 VVipe' ]
};
