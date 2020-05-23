/**
 * @file roblox command
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license GPL-3.0
 */

const request = xrequire('request-promise-native');

exports.exec = async (Bastion, message, args) => {
  if (!args.player) {
    return Bastion.emit('commandUsage', message, this.help);
  }

  let options = {
    uri: 'https://api.roblox.com/users/get-by-username',
    headers: {
      'User-Agent': `Bastion/${Bastion.package.version} (${Bastion.user.tag}; ${Bastion.user.id}) https://bastionbot.org`
    },
    qs: {
      username: encodeURIComponent(args.player)
    },
    json: true
  };

  let response = await request(options);

  if (response.errorMessage) {
    return Bastion.emit('error', 'Roblox', response.errorMessage, message.channel);
  }

  await message.channel.send({
    embed: {
      color: Bastion.colors.BLUE,
      title: 'Roblox Kullanıcısı',
      description: response.IsOnline ? 'Online' : 'Offline',
      fields: [
        {
          name: 'Kullanıcı Adı',
          value: response.Username,
          inline: true
        },
        {
          name: 'Kullanıcı ID',
          value: response.Id,
          inline: true
        }
      ],
      footer: {
        text: 'Roblox tarafından Güçlendirildi'
      }
    }
  });
};

exports.config = {
  aliases: ['roblox'],
  enabled: true,
  argsDefinitions: [
    { name: 'player', type: String, multiple: true, defaultOption: true }
  ]
};

exports.help = {
  name: 'roblox',
  description: 'Roblox Kullanıcısı Hakkınd Bilgi Al.',
  botPermission: '',
  userTextPermission: '',
  userVoicePermission: '',
  usage: 'roblox <AD>',
  example: [ 'roblox test' ]
};
