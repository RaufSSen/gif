/**
 * @file generateInvite command
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license GPL-3.0
 */

exports.exec = async (Bastion, message, args) => {
  let invite = await message.channel.createInvite({
    maxAge: args.age * 60,
    maxUses: args.uses
  });

  await message.channel.send('Merhaba. Beep. Boop\n'
    + 'Arkadaşkarını bu sunucuya davet etmek istermisin, daveti kopyala'
    + ' vede arkadaşlarına at.\nBeep!\n' +
    `https://discord.gg/${invite.code}`);
};

exports.config = {
  aliases: ['davetlink'],
  enabled: true,
  argsDefinitions: [
    { name: 'uses', type: Number, alias: 'u', defaultValue: 3 },
    { name: 'age', type: Number, alias: 'a', defaultValue: 1440 }
  ]
};

exports.help = {
  name: 'generateInvite',
  description: 'Generates an invite link of the current text channel of your Discord server.',
  botPermission: 'CREATE_INSTANT_INVITE',
  userTextPermission: 'CREATE_INSTANT_INVITE',
  userVoicePermission: '',
  usage: 'davetlink [-u <KULLANIM>] [-a <SONA_ERME_DAKIKA>]',
  example: [ 'davetlink', 'davetlink -u 1 -a 10' ]
};
