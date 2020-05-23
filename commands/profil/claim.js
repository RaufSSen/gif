/**
 * @file claim command
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license GPL-3.0
 */

const moment = xrequire('moment');
const specialIDs = xrequire('./assets/specialIDs.json');

exports.exec = async (Bastion, message) => {
  let guildMemberModel = await Bastion.database.models.guildMember.findOne({
    attributes: [ 'lastClaimed', 'claimStreak' ],
    where: {
      userID: message.author.id,
      guildID: message.guild.id
    }
  });

  if (guildMemberModel && guildMemberModel.dataValues.lastClaimed) {
    // If current date is same as the last claimed date, you can't use this!
    if (guildMemberModel.dataValues.lastClaimed.toDateString() === new Date().toDateString()) {
      return Bastion.emit('error', '', Bastion.i18n.error(message.guild.language, 'claimCooldown', message.author), message.channel);
    }


    // If it's a consecutive day, increase the claim streak of user.
    // Otherwise set the streak to 0.
    let nextDay = moment(guildMemberModel.dataValues.lastClaimed).add(1, 'd');
    if (guildMemberModel.dataValues.claimStreak < 7 && moment().isSame(nextDay, 'day')) {
      guildMemberModel.dataValues.claimStreak++;
    }
    else {
      guildMemberModel.dataValues.claimStreak = 0;
    }
  }

  let rewardAmount = Bastion.methods.getRandomInt(50, 100);
  let description = `${message.author} Günlük ödülünü aldın.`;

  if (guildMemberModel.dataValues.claimStreak === 1) {
    description = `${description}\n\nBu komudu hergün kullan ve 7 gün bonusu kazan!`;
  }
  else if (guildMemberModel.dataValues.claimStreak > 1 && guildMemberModel.dataValues.claimStreak < 6) {
    description = `${description}\n\n$ bonus almana {7 - guildMemberModel.dataValues.claimStreak} gün!`;
  }
  else if (guildMemberModel.dataValues.claimStreak === 6) {
    description = `${description}\n\nSon 1 gün kaldı!`;
  }
  else if (guildMemberModel.dataValues.claimStreak === 7) {
    guildMemberModel.dataValues.claimStreak = 0;
    rewardAmount += Bastion.methods.getRandomInt(350, 700);
    description = `${description}\n\Tebrikler! 7 günlük bonusu kazandın!`;
  }

  if (Bastion.user.id === '267035345537728512') {
    if (message.guild.id === specialIDs.bastionGuild) {
      if (message.member && message.member.roles.has(specialIDs.patronsRole)) {
        rewardAmount += 500;
      }
      else if (message.member && message.member.roles.has(specialIDs.donorsRole)) {
        rewardAmount += 100;
      }
    }
  }

  Bastion.emit('userDebit', message.member, rewardAmount);

  await Bastion.database.models.guildMember.update({
    lastClaimed: Date.now(),
    claimStreak: guildMemberModel.dataValues.claimStreak
  },
  {
    where: {
      userID: message.author.id,
      guildID: message.guild.id
    },
    fields: [ 'lastClaimed', 'claimStreak' ]
  });

  // Send a message in the channel to let the user know that the operation was successful.
  await message.channel.send({
    embed: {
      "image": {
      "url": `https://i.pinimg.com/originals/79/f2/d1/79f2d13ec3e1cb50d342b4951a3a49e9.gif`
      },
      color: Bastion.colors.GREEN,
      description: description
    }
  }).catch(e => {
    Bastion.log.error(e);
  });

  // Let the user know by DM that their account has been debited.
  await message.author.send({
    embed: {
      color: Bastion.colors.GREEN,
      description: `**${message.guild.name}** sunucusundaki hesabına  **${rewardAmount}** Para Yüklendi.`
    }
    
  }).catch(e => {
    if (e.code !== 50007) {
      Bastion.log.error(e);
    }
  });
};

exports.config = {
  aliases: [ 'günlük' ],
  enabled: true
};

exports.help = {
    name: 'günlük',
  description: 'Claim your daily rewards.',
  botPermission: '',
  userTextPermission: '',
  userVoicePermission: '',
  usage: 'günlük',
  example: []
};
