/**
 * @file giphy command
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license GPL-3.0
 */

const request = xrequire('request-promise-native');

exports.exec = async (Bastion, message, args) => {
  if (!args.length) {
    return Bastion.emit('commandUsage', message, this.help);
  }

  let options = {
    url: 'http://api.giphy.com/v1/gifs/search',
    qs: {
      q: encodeURI(args.join('+')),
      api_key: 'ypjlqheGeUVUt0nuF31px3FDg9XMi7ij',
      limit: 10,
      offset: 0
    },
    json: true
  };

  let response = await request(options);
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
  if (response.data.length) {
    await message.channel.send({
      embed: {
        color: userModel.dataValues.color ? userModel.dataValues.color : Bastion.colors.BLUE,
        title: `${args.join(' ')} ile ilgili GIFler`.slice(0, 256),
        image: {
          url: response.data.getRandom().images.original.url
        },
        footer: {
          text: 'GIPHY tarafından güçlendirildi.'
        }
      }
    });
  }
  else {
    return Bastion.emit('error', '', Bastion.i18n.error(message.guild.language, 'notFound', 'resim'), message.channel);
  }
};

exports.config = {
  aliases: [ 'gif' ],
  enabled: true
};

exports.help = {
  name: 'giphy',
  description: 'İnternette GIF arar.',
  botPermission: '',
  userTextPermission: '',
  userVoicePermission: '',
  usage: 'gif <kelime>',
  example: [ 'gif iron man' ]
};
