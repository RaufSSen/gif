/**
 * @file hello command
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license GPL-3.0
 */

exports.exec = async (Bastion, message) => {
  await message.channel.send({
    embed: {
      color: Bastion.colors.BLUE,
      description: 'Merhaba 👋! Ben **Sessiz**. \u{1F609}\n' +
                   'Ben sunucunu `harika ötesi 🌈` yapıcağım!',
      footer: {
        text: `${message.guild.prefix[0]}yardım ile ne işe yaradığımı öğren.`
      }
    }
  });
};

exports.config = {
  aliases: [ 'merhaba' ],
  enabled: true
};

exports.help = {
  name: 'hello',
  description: 'Get greetings from %bastion%.',
  botPermission: '',
  userTextPermission: '',
  userVoicePermission: '',
  usage: 'hello',
  example: []
};
