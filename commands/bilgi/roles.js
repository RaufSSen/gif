/**
 * @file roles command
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license GPL-3.0
 */

exports.exec = async (Bastion, message, args) => {
  let roles = message.guild.roles.filter(r => r.position !== 0).map(r => `${r.name} - ${r.id}`).map((r, i) => `${i + 1}. ${r}`);

  let noOfPages = roles.length / 10;
  let i = (args.page > 0 && args.page < noOfPages + 1) ? args.page : 1;
  i = i - 1;

  await message.channel.send({
    embed: {
      color: Bastion.colors.BLUE,
      title: 'Roller',
      description: roles.slice(i * 10, (i * 10) + 10).join('\n'),
      footer: {
        text: `Sayfa: ${i + 1} of ${noOfPages > parseInt(noOfPages) ? parseInt(noOfPages) + 1 : parseInt(noOfPages)}`
      }
    }
  });
};

exports.config = {
  aliases: ['roller'],
  enabled: true,
  argsDefinitions: [
    { name: 'page', type: Number, alias: 'p', defaultOption: true, defaultValue: 1 }
  ]
};

exports.help = {
  name: 'roles',
  description: 'Lists all the roles (with their IDs) of your Discord server.',
  botPermission: '',
  userTextPermission: '',
  userVoicePermission: '',
  usage: 'roller',
  example: []
};
