/**
 * @file afk command
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license GPL-3.0
 */

exports.exec = async (Bastion, message) => {
  if (!message.guild.usersAFK) message.guild.usersAFK = [];
  if (message.guild.usersAFK.includes(message.author.id)) return;

  message.guild.usersAFK.push(message.author.id);

  await message.channel.send({
    embed: {
      color: Bastion.colors.GREEN,
      description: `${message.author} Şu an seni afk olarak ayarladım eğer birisi seni eiketlerse ona mesaj göndereceğim herhangi bir yere yazı yazdığında afk modundan çıkarsın.`
    }
  }).catch(e => {
    Bastion.log.error(e);
  });
};

exports.config = {
  aliases: [],
  enabled: true,
  argsDefinitions: [
    { name: 'message', type: String, alias: 'm', defaultOption: true }
  ]
};

exports.help = {
  name: 'afk',
  description: 'Sets you as Away From Keyboard (AFK). So when someone mentions you, Bastion will let them know that you\'re AFK. It\'ll be automatically disabled once you are back.',
  botPermission: '',
  userTextPermission: '',
  userVoicePermission: '',
  usage: 'afk',
  example: []
};
