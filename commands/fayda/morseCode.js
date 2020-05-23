/**
 * @file morseCode command
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license GPL-3.0
 */

exports.exec = async (Bastion, message, args) => {
  if (!args.length) {
    return Bastion.emit('commandUsage', message, this.help);
  }

  args = args.join(' ').toLowerCase();
  const kısa = '•';
  const uzun = '–';
  const morseCode = {
    'a': kısa + uzun,
    'b': uzun + kısa + kısa + kısa,
    'c': uzun + kısa + uzun + kısa,
    'd': uzun + kısa + kısa,
    'e': kısa,
    'f': kısa + kısa + uzun + kısa,
    'g': uzun + uzun + kısa,
    'h': kısa + kısa + kısa + kısa,
    'i': kısa + kısa,
    'j': kısa + uzun + uzun + uzun,
    'k': uzun + kısa + uzun,
    'l': kısa + uzun + kısa + kısa,
    'm': uzun + uzun,
    'n': uzun + kısa,
    'o': uzun + uzun + uzun,
    'p': kısa + uzun + uzun + kısa,
    'q': uzun + uzun + kısa + uzun,
    'r': kısa + uzun + kısa,
    's': kısa + kısa + kısa,
    't': uzun,
    'u': kısa + kısa + uzun,
    'v': kısa + kısa + kısa + uzun,
    'w': kısa + uzun + uzun,
    'x': uzun + kısa + kısa + uzun,
    'y': uzun + kısa + uzun + uzun,
    'z': uzun + uzun + kısa + kısa,
    '0': uzun + uzun + uzun + uzun + uzun,
    '1': kısa + uzun + uzun + uzun + uzun,
    '2': kısa + kısa + uzun + uzun + uzun,
    '3': kısa + kısa + kısa + uzun + uzun,
    '4': kısa + kısa + kısa + kısa + uzun,
    '5': kısa + kısa + kısa + kısa + kısa,
    '6': uzun + kısa + kısa + kısa + kısa,
    '7': uzun + uzun + kısa + kısa + kısa,
    '8': uzun + uzun + uzun + kısa + kısa,
    '9': uzun + uzun + uzun + uzun + kısa,
    '.': kısa + uzun + kısa + uzun + kısa + uzun,
    ',': uzun + uzun + kısa + kısa + uzun + uzun,
    '?': kısa + kısa + uzun + uzun + kısa + kısa,
    '\'': kısa + uzun + uzun + uzun + uzun + kısa,
    '!': uzun + kısa + uzun + kısa + uzun + uzun,
    '/': uzun + kısa + kısa + uzun + kısa,
    '(': uzun + kısa + uzun + uzun + kısa,
    ')': uzun + kısa + uzun + uzun + kısa + uzun,
    '&': kısa + uzun + kısa + kısa + kısa,
    ':': uzun + uzun + uzun + kısa + kısa + kısa,
    ';': uzun + kısa + uzun + kısa + uzun + kısa,
    '=': uzun + kısa + kısa + kısa + uzun,
    '+': kısa + uzun + kısa + uzun + kısa,
    '-': uzun + kısa + kısa + kısa + kısa + uzun,
    '"': kısa + uzun + kısa + kısa + uzun + kısa,
    '$': kısa + kısa + kısa + uzun + kısa + kısa + uzun,
    '@': kısa + uzun + uzun + kısa + uzun + kısa,
    'à': kısa + uzun + uzun + kısa + uzun,
    'ä': kısa + uzun + kısa + uzun,
    'å': kısa + uzun + uzun + kısa + uzun,
    'ą': kısa + uzun + kısa + uzun,
    'æ': kısa + uzun + kısa + uzun,
    'ć': uzun + kısa + uzun + kısa + kısa,
    'ĉ': uzun + kısa + uzun + kısa + kısa,
    'ç': uzun + kısa + uzun + kısa + kısa,
    'ch': uzun + uzun + uzun + uzun,
    'đ': kısa + kısa + uzun + kısa + kısa,
    'ð': kısa + kısa + uzun + uzun + kısa,
    'é': kısa + kısa + uzun + kısa + kısa,
    'è': kısa + uzun + kısa + kısa + uzun,
    'ę': kısa + kısa + uzun + kısa + kısa,
    'ĝ': uzun + uzun + kısa + uzun + kısa,
    'ĥ': uzun + uzun + uzun + uzun,
    'ĵ': kısa + uzun + uzun + uzun + kısa,
    'ł': kısa + uzun + kısa + kısa + uzun,
    'ń': uzun + uzun + kısa + uzun + uzun,
    'ñ': uzun + uzun + kısa + uzun + uzun,
    'ó': uzun + uzun + uzun + kısa,
    'ö': uzun + uzun + uzun + kısa,
    'ø': uzun + uzun + uzun + kısa,
    'ś': kısa + kısa + kısa + uzun + kısa + kısa + kısa,
    'ŝ': kısa + kısa + kısa + uzun + kısa,
    'š': uzun + uzun + uzun + uzun,
    'þ': kısa + uzun + uzun + kısa + kısa,
    'ü': kısa + kısa + uzun + uzun,
    'ŭ': kısa + kısa + uzun + uzun,
    'ź': uzun + uzun + kısa + kısa + uzun + kısa,
    'ż': uzun + uzun + kısa + kısa + uzun,
    ' ': '\u2007'
  };
  args = args.replace(/./g, x => `${morseCode[x]}\u2001`).trim();

  await message.channel.send({
    embed: {
      color: Bastion.colors.BLUE,
      title: 'Morse Kodu',
      description: `**${args}**`
    }
  });
};

exports.config = {
  aliases: [ 'morse' ],
  enabled: true
};

exports.help = {
  name: 'morseCode',
  description: 'Encodes a given text in Morse Code.',
  botPermission: '',
  userTextPermission: '',
  userVoicePermission: '',
  usage: 'morse <yazı>',
  example: [ 'morse Akşam burada buşucaz...' ]
};
