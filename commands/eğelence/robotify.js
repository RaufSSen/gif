/**
 * @file robotify command
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license GPL-3.0
 */

const request = xrequire('request-promise-native');

exports.exec = async (Bastion, message, args) => {
  let string = args.length ? args.join(' ') : message.author.tag;

  let options = {
    url: `https://robohash.org/${encodeURIComponent(string)}?set=set0`,
    encoding: null
  };
  let response = await request(options);

  message.channel.send({
    files: [ { attachment: response } ]
  });
};

exports.config = {
  aliases: [ 'robotify' ],
  enabled: true
};

exports.help = {
  name: 'robotify',
  description: 'Yazdığın yazıdan rasgele robot resimi gösterir.',
  botPermission: '',
  userTextPermission: '',
  userVoicePermission: '',
  usage: 'robotify [Yazı]',
  example: [ 'robotify', 'robotify insan' ]
};
