/**
 * @file animoji command
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license GPL-3.0
 */

exports.exec = async (Bastion, message, args) => {
  await message.channel.send({
  });
};

exports.config = {
  aliases: [ 'asdasdasd' ],
  enabled: true,
  argsDefinitions: [
    { name: 'name', type: String, defaultOption: true }
  ]
};

exports.help = {
  name: 'asdasdasd',
  description: 'KULLANMIYOR!.',
  botPermission: '',
  userTextPermission: 'ADD_REACTIONS',
  userVoicePermission: '',
  usage: '',
  example: [ '' ]
};
