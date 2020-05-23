/**
 * @file fakeBan command
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license GPL-3.0
 */

exports.exec = async (Bastion, message, args) => {
  let user;
  if (message.mentions.users.size) {
    user = message.mentions.users.first();
  }
  else if (args.id) {
    user = await Bastion.fetchUser(args.id);
  }
  if (!user) {
    return Bastion.emit('commandUsage', message, this.help);
  }

  await message.channel.send({
    embed: {
      color: Bastion.colors.RED,
      description: `**${message.author.tag}** sunucudan**${user.tag}** banladı.*`,
      footer: {
        text: '* Heh, Sadece Şaka Yapıyorum XD'
      }
    }
  });
};

exports.config = {
  aliases: [ 'fakeBan' ],
  enabled: true,
  argsDefinitions: [
    { name: 'id', type: String, defaultOption: true }
  ]
};

exports.help = {
  name: 'fakeBan',
  description: 'Kullanıcıyı Sunucudan Banlar*. Oh, ama gerçek değil sadece onlarla eğlenin.',
  botPermission: '',
  userTextPermission: '',
  userVoicePermission: '',
  usage: 'fakeBan [ @Kullanıcı_Adı | Kullanıcı_ID ]',
  example: ['fakeban @test#1234']
};
