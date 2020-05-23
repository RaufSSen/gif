/**
 * @file flip command
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license GPL-3.0
 */

exports.exec = async (Bastion, message, args) => {
  let outcomes = [
    'Tura',
    'Yazı'
  ];
  let outcome = outcomes.getRandom();

  if (args.coins) {
    if (args.coins > 50) args.coins = 50;

    for (let i = 1; i < args.coins; i++) {
      outcome += `, ${outcomes.getRandom()}`;
    }
  }

  await message.channel.send({
    embed: {
      color: Bastion.colors.BLUE,
      title: 'Dödürüldü',
      description: outcome
    }
  });
};

exports.config = {
  aliases: ['döndür'],
  enabled: true,
  argsDefinitions: [
    { name: 'coins', type: Number, alias: 'c', defaultOption: true }
  ]
};

exports.help = {
  name: 'döndür',
  description: 'Flips the specified amount of coins and shows you the outcomes.',
  modules: 'Oyun' ,
  botPermission: '',
  userTextPermission: '',
  userVoicePermission: '',
  usage: 'döndür',
  example: [ 'döndür', 'döndür 5' ]
};
