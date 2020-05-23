/**
 * @file google command
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license GPL-3.0
 */

const request = xrequire('request-promise-native');
const cheerio = xrequire('cheerio');

exports.exec = async (Bastion, message, args) => {
  if (!args.query) {
    return Bastion.emit('commandUsage', message, this.help);
  }

  let options = {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:68.0) Gecko/20100101 Firefox/68.0'
    },
    url: 'http://google.com/search',
    qs: {
      q: args.query.join(' '),
      safe: 'active'
    }
  };
  let response = await request(options);

  let $ = cheerio.load(response);
  let results = [];

  $('.g').each((i) => {
    results[i] = {};
  });
  $('.g .r a h3').each((i, e) => {
    let link = e.parent.attribs['href'];
    results[i]['name'] = `${getText(e)} - ${link}`;
  });
  $('.g .s .st').each((i, e) => {
    results[i]['value'] = getText(e);
  });

  results = results.filter(r => r.name && r.value).slice(0, 3);

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
      title: ` ${args.query.join(' ')} araması sonuçları:`,
      url: `https://www.google.com.tr/search?q=${encodeURIComponent(args.query.join(' '))}`,
      fields: results,
      footer: {
        text: 'Google tarafından güçlendirildi.'
      }
    }
  });
};

exports.config = {
  aliases: ['google'],
  enabled: true,
  argsDefinitions: [
    { name: 'query', type: String, alias: 'q', multiple: true, defaultOption: true }
  ]
};

exports.help = {
  name: 'google',
  description: 'Searches Google, for the specified query, and shows the top results.',
  botPermission: '',
  userTextPermission: '',
  userVoicePermission: '',
  usage: 'google <kelime>',
  example: [ 'google Deneme' ]
};

/**
 * Get the main text/data of a HTML element returned by cheerio
 * @function getText
 * @param {object} children object containing properties of the HTML element, returned by cheerio
 * @returns {string} The main text/data of the HTML element
 */
function getText(children) {
  if (children.children) return getText(children.children);
  return children.map(c => {
    return c.children ? getText(c.children) : c.data;
  }).join('');
}
