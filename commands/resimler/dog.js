/**
 * @file dog command
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license GPL-3.0
 */

const request = xrequire('request-promise-native');

exports.exec = async (Bastion, message) => {
  let baseURL = 'http://random.dog';

  let options = {
    url: `${baseURL}/woof`,
    json: true
  };
  let response = await request(options);

  await message.channel.send({
    files: [ `${baseURL}/${response}` ]
  });
};

exports.config = {
  aliases: ['köpek'],
  enabled: true
};

exports.help = {
  name: 'dog',
  description: 'Tatlış Köpekleri Gösterir.',
  botPermission: '',
  userTextPermission: '',
  userVoicePermission: '',
  usage: 'köpek',
  example: []
};
