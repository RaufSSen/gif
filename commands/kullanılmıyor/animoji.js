/**
 * @file animoji command
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license GPL-3.0
 */

exports.exec = async (Bastion, message, args) => {
  if (!args.name) {
    return Bastion.emit('commandUsage', message, this.help);
  }

  let emoji = message.guild.emojis.find(emoji => emoji.name === args.name);

  if (!emoji || !emoji.animated) return;

  await message.channel.send({
    files: [ emoji.url ]
  });
};

exports.config = {
  aliases: [ 'animoji' ],
  enabled: true,
  argsDefinitions: [
    { name: 'name', type: String, defaultOption: true }
  ]
};

exports.help = {
  name: 'animoji',
  description: 'KULLANMIYOR!.',
  botPermission: '',
  userTextPermission: 'ADD_REACTIONS',
  userVoicePermission: '',
  usage: '',
  example: [ '' ]
};
