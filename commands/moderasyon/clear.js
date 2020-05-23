/**
 * @file clear command
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license GPL-3.0
 */

exports.exec = async (Bastion, message, args) => {
  await message.delete().catch(() => {});


  args.amount = Math.abs(args.amount);
  let messages = await message.channel.fetchMessages({
    limit: args.amount && args.amount < 1000 ? args.amount : 1000
  });

  let user;
  if (message.mentions.users.size) {
    user = message.mentions.users.first();
  }


  if (user) {
    messages = messages.filter(message => message.author.id === user.id);
  }
  else if (args.user) {
    messages = messages.filter(message => message.author.id === args.user);
  }
  else if (args.bots) {
    messages = messages.filter(message => message.author.bot);
  }
  if (args.nonpinned) {
    messages = messages.filter(message => !message.pinned);
  }
  if (args.time) {
    let requiredTimestamp = message.createdTimestamp - (args.time * 60 * 1000);
    messages = messages.filter(message => message.createdTimestamp >= requiredTimestamp);
  }


  let clearedMessages = await message.channel.bulkDelete(messages, true);
  if (!clearedMessages.size) {
    return Bastion.emit('error', '', Bastion.i18n.error(message.guild.language, 'noDeletableMessage'), message.channel);
  }


  await message.channel.send({
    embed: {
      color: Bastion.colors.GREEN,
      description: `Herkesden ${clearedMessages.size}${args.nonpinned ? ' non pinned' : ''} mesaj ${user ? user : args.bots ? 'BOTs' : ''}${args.time ? ` sent in the past ${args.time} ` : ''} sildim.`
    }
  }).then(msg => {
    msg.delete(10000).catch(() => {});
  }).catch(e => {
    Bastion.log.error(e);
  });


  let reason = 'Neden verilmemiş';
  Bastion.emit('moderationLog', message, this.help.name, message.channel, reason, {
    cleared: `${clearedMessages.size}${args.nonpinned ? ' non pinned' : ''} messages from ${user ? user : args.bots ? 'BOTs' : 'everyone'}${args.time ? ` sent in the past ${args.time} minutes.` : ''}`
  });
};

exports.config = {
  aliases: [ 'temizle', 'tmz' ],
  enabled: true,
  argsDefinitions: [
    { name: 'amount', type: Number, alias: 'n', defaultValue: 100, defaultOption: true },
    { name: 'user', type: String, alias: 'u' },
    { name: 'bots', type: Boolean },
    { name: 'nonpinned', type: Boolean },
    { name: 'time', type: Number, alias: 't' }
  ]
};

exports.help = {
  name: 'clear',
  description: 'Sunucuda seçtiğin yazı kanalındaki mesajları siler.',
  botPermission: 'MANAGE_MESSAGES',
  userTextPermission: 'MANAGE_MESSAGES',
  userVoicePermission: '',
  usage: 'temizle [MESAJ_SAYISI] [--nonpinned] [--bots] [@KULLANICI | --user KULLANICI_ID] [--time DAKIKA]',
  example: [ 'temizle', 'temizle 43', 'temizle --time 3', 'temizle 42 --user 188017158542327869', 'temizle 13 @Barry#0001', 'temizle 37 --bots', 'temizle --nonpinned' ]
};
