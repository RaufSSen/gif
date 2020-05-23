/**
 * @file catFact command
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license GPL-3.0
 */

const catFacts = xrequire('./assets/catFacts.json');

exports.exec = async (Bastion, message) => {
  await message.channel.send({
    embed: {
      color: Bastion.colors.BLUE,
      title: 'Kedice Bilgi',
      description: catFacts.getRandom()
    }
  });
};

exports.config = {
  aliases: ['kedicebilgi'],
  enabled: true
};

exports.help = {
  name: 'catFact',
  description: 'Kediler hakkında kısa bilgiler.',
  botPermission: '',
  userTextPermission: '',
  userVoicePermission: '',
  usage: 'kedicebilgi',
  example: []
};
