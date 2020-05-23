/**
 * @file betFlip command
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license GPL-3.0
 */

let recentUsers = [];

exports.exec = async (Bastion, message, args) => {
  let cooldown = 60;

  if (recentUsers.includes(message.author.id)) {
    return Bastion.emit('error', '', Bastion.i18n.error(message.guild.language, 'gamblingCooldown', message.author, cooldown), message.channel);
  }

  if (!args.money || args.money < 1 || !/^(yazı|tura)$/i.test(args.outcome)) {
    return Bastion.emit('commandUsage', message, this.help);
  }

  args.money = parseInt(args.money);

  let minAmount = 5;
  if (args.money < minAmount) {
    return Bastion.emit('error', '', Bastion.i18n.error(message.guild.language, 'minBet', minAmount), message.channel);
  }

  let outcomes = [
    'Yazı',
    'Tura'
  ];
  let outcome = outcomes[Math.floor(Math.random() * outcomes.length)];

  let guildMemberModel = await message.client.database.models.guildMember.findOne({
    attributes: [ 'bastionCurrencies' ],
    where: {
      userID: message.author.id,
      guildID: message.guild.id
    }
  });

  guildMemberModel.dataValues.bastionCurrencies = parseInt(guildMemberModel.dataValues.bastionCurrencies);

  if (args.money > guildMemberModel.dataValues.bastionCurrencies) {
    return Bastion.emit('error', '', Bastion.i18n.error(message.guild.language, 'insufficientBalance', guildMemberModel.dataValues.bastionCurrencies), message.channel);
  }

  recentUsers.push(message.author.id);

  let result;
  if (outcome.toLowerCase() === args.outcome.toLowerCase()) {
    let prize = args.money < 50 ? args.money + outcomes.length : args.money < 100 ? args.money : args.money * 1.5;
    result = `Congratulations! You won the bet.\nYou won **${prize}** Bastion Currencies.`;

    Bastion.emit('userDebit', message.member, prize);
  }
  else {
    result = 'Sorry, you lost the bet. Better luck next time.';

    Bastion.emit('userCredit', message.member, args.money);
  }

  setTimeout(() => {
    recentUsers.splice(recentUsers.indexOf(message.author.id), 1);
  }, cooldown * 60 * 1000);

  await message.channel.send({
    embed: {
      color: Bastion.colors.BLUE,
      title: `Flipped ${outcome}`,
      description: result
    }
  }).catch(e => {
    Bastion.log.error(e);
  });
};

exports.config = {
  aliases: [ 'bf' ],
  enabled: true,
  argsDefinitions: [
    { name: 'outcome', type: String, alias: 'o', defaultOption: true },
    { name: 'money', type: Number, alias: 'p' }
  ]
};

exports.help = {
  name: 'betFlip',
  description: 'Yazı Tura üzerinden bahis oyna eğer kazanırsan 2 katını al kaybedersen oynadığın parayı kaybet.',
  botPermission: '',
  userTextPermission: '',
  userVoicePermission: '',
  usage: 'betflip < yazı/tura > <-p miktar>',
  example: [ 'betflip yazı -p 100' ]
};
