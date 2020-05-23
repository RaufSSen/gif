/**
 * @file commandAnalytics command
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license GPL-3.0
 */

exports.exec = async (Bastion, message) => {
  let mostUsedCommands = Object.keys(message.guild.commandAnalytics);
  mostUsedCommands = mostUsedCommands.slice(0, 10);
  mostUsedCommands = mostUsedCommands.map(command => `\`${command}\` - ${message.guild.commandAnalytics[command]} times`);

  await message.channel.send({
    embed: {
      color: Bastion.colors.BLUE,
      title: 'Sunucuda en fazla kullanılmış komut:',
      description: mostUsedCommands.join('\n'),
      footer: {
        text: 'Tekrar başlattıktan sonra silinir..'
      }
    }
  });
};

exports.config = {
  aliases: [ 'komutistatik' ],
  enabled: true
};

exports.help = {
  name: 'commandAnalytics',
  description: 'Shows the most used commands in the server.',
  botPermission: '',
  userTextPermission: '',
  userVoicePermission: '',
  usage: 'kamutistatik',
  example: []
};
