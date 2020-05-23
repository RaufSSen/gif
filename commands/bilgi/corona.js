/**
 * @file hello command
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license GPL-3.0
 */
const jw = require('jw-corona-api')

exports.exec = async (Bastion, message, args) => {
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
    const corona = await jw("CX,5y0HnxWPSvJY");
    

  /**
  https://media.giphy.com/media/UVe0v8NASB158uI6hp/giphy.gif
    console.log(corona.Turkey);
    console.log(corona.Turkey.vaka);
    console.log(corona.Turkey.bugunVaka);
    console.log(corona.Turkey.mevcutVaka);
    console.log(corona.Turkey.olum);
    console.log(corona.Turkey.bugunOlum);
    console.log(corona.Turkey.kurtarilan);
    console.log(corona.Turkey.kritik);
    */
  await message.channel.send({
    embed: {
      color: userModel.dataValues.color ? userModel.dataValues.color : Bastion.colors.BLUE,
      fields: [
        {
          name: '🤧 Toplam Vaka:',
          value: corona.Turkey.vaka
        },
        {
          name: '🤧 Bugünkü Vaka:',
          value: corona.Turkey.bugunVaka
        },
        {
          name: '🤧 Mevcut Vaka:',
          value: corona.Turkey.mevcutVaka
        },
        {
          name: '💀 Toplam Ölüm:',
          value: corona.Turkey.olum
        },
        {
          name: '💀 Bugünkü Ölüm:',
          value: corona.Turkey.bugunOlum
        },
        {
          name: '✅ Kurtarılan:',
          value: corona.Turkey.kurtarilan
        },
        {
          name: '😷 Kritik:',
          value: corona.Turkey.kritik
        },
        
      ],     
      image: {
        url: 'https://media.giphy.com/media/Rethqf3EyBVPxAxM90/giphy.gif'  ,
      },
      footer: {
        text: `Lütfen evden ayrılma ve #evdekal! Not: Gün sonu bilgiler güncellenir!`
      }
    }
  });
};

exports.config = {
  aliases: [ 'vaka','corona' ],
  enabled: true
};

exports.help = {
  name: 'korona',
  description: 'Korona için komut.',
  botPermission: '',
  userTextPermission: '',
  userVoicePermission: '',
  usage: 'korona',
  example: []
};
