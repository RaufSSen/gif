/**
 * @file quotes command
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license GPL-3.0
 */

const quotes = xrequire('./assets/quotes.json');

exports.exec = async (Bastion, message, args) => {
  // Get a random quote
  let index = Number.random(1, Object.keys(quotes).length);

  // If a quote number is provided, use that number.
  if (!isNaN(args.number)) {
    // If the quote number exists
    if (!args.number.inRange(1, Object.keys(quotes).length)) {
      index = args.number;
    }
  }
  // If a author is provided, use that author.
  else if (args.author) {
    let authorQuoteIDs = [];
    // If the quotes list has a quote from the specified author, store it.
    for (let i = 1; i <= Object.keys(quotes).length; i++) {
      if (quotes[i].author.search(new RegExp(args.author.join(' '), 'i')) !== -1) {
        authorQuoteIDs.push(i);
      }
    }
    // If the author has at least 1 quote, get a random quote number from it.
    if (authorQuoteIDs.length > 0) {
      index = authorQuoteIDs.getRandom();
    }
  }

  await message.channel.send({
    embed: {
      color: Bastion.colors.BLUE,
      description: `*"${quotes[index].quote}"*\n\n**${quotes[index].author}**`,
      footer: {
        text: `Alıntı Numarası: ${index}`
      }
    }
  });
};

exports.config = {
  aliases: [ 'alıntı' ],
  enabled: true,
  argsDefinitions: [
    { name: 'number', type: Number, alias: 'n' },
    { name: 'author', type: String, alias: 'y', multiple: true }
  ]
};

exports.help = {
  name: 'quotes',
  description: 'Büyüklerden Alıntılar Gösterir.',
  botPermission: '',
  userTextPermission: '',
  userVoicePermission: '',
  usage: 'alıntı [ -n Alıntı Numarası | -y Yazar Adı]',
  example: [ 'alıntı', 'alıntı -n 189', 'alıntı -y Albert Einstein' ]
};
