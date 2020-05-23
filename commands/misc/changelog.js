/**
 * @file changelog command
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license GPL-3.0
 */

exports.exec = async (Bastion, message, args) => {
  const CHANGES = xrequire('./changes.json');

  let changes = [];
  for (let section in CHANGES) {
    if (CHANGES.hasOwnProperty(section)) {
      if (section === 'date' || section === 'image' || !CHANGES[section].length) continue;

      changes.push({
        name: section,
        value: `- ${CHANGES[section].join('\n✩ ')}`
      });
    }
  }

  changes.push(
    {
      name: '\u200B',
      value: '\u200B'
    },
    {
      name: 'Bir Güncellememi Kaçırdın?',
      value: 'Daha Eklenmedi'
    },
    {
      name: 'Sessiz Botu Seviyor Musun?',
      value: 'O zaman ne bekliyorsun? [Discord Sunucumuza](https://discord.gg/B7aqttp) katıl.'
    },
    {
      name: 'Destek Ol!',
      value: 'Bağış yeri daha gelmedi!'
    }
  );
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
      title: `Sessiz Bot vBETA Yenilikler`,
      url: `https://sessizbot.glitch.me`,
      fields: changes,
      image: {
        url: CHANGES.image
      },
      footer: {
        text: CHANGES.date
      }
    }
  });
};

exports.config = {
  aliases: [ 'yenilikler' ],
  enabled: true
};

exports.help = {
  name: 'changelog',
  description: 'Shows the changes made in the current version of Bastion Bot.',
  botPermission: '',
  userTextPermission: '',
  userVoicePermission: '',
  usage: 'changelog',
  example: []
};
