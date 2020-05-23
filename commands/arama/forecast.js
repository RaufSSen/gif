/**
 * @file forecast command
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

    let fields = [];
    for (let i = 0; i < result[0].forecast.length; i++) {
      fields.push({
        name: new Date(result[0].forecast[i].date).toDateString(),
        value: `**Hava:** ${result[0].forecast[i].skytextday}\n**En Düşük:** ${result[0].forecast[i].low} \u00B0${result[0].location.degreetype}\n**En Yüksek:** ${result[0].forecast[i].high} \u00B0${result[0].location.degreetype}\n**Yağış:** ${result[0].forecast[i].precip} cm`
      });
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
        title: 'Hava Durumu',
        description: result[0].location.name,
        fields: fields,
        footer: {
          text: 'Powered by MSN Weather'
        }
      }
    });
  });
};

exports.config = {
  aliases: [ 'havadurumu' ],
  enabled: true
};

exports.help = {
  name: 'forecast',
  description: 'Shows the weather forecast for 5 days of the specified city.',
  botPermission: '',
  userTextPermission: '',
  userVoicePermission: '',
  usage: 'havadurumu < şehir, şehir_kodu | zipcode >',
  example: [ 'havadurumu Ankara, Türkiye', 'havadurumu 12341234' ]
};
