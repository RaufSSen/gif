/**
 * @file rank command
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license GPL-3.0
 */
const Canvas = require('canvas');
const Discord = require('discord.js');

exports.exec = async (Bastion, message, args) => {
  args = message.mentions.users.first() || message.author;
  let guildMemberModel = await Bastion.database.models.guildMember.findOne({
    attributes: [
      [ Bastion.database.literal(`(SELECT COUNT(*) FROM guildMembers AS member WHERE member.guildID = ${message.guild.id})`), 'total' ],
      [ Bastion.database.literal(`(SELECT COUNT(*) FROM guildMembers AS member WHERE member.guildID = ${message.guild.id} AND member.experiencePoints * 1 > guildMember.experiencePoints * 1)`), 'rank' ]
    ],
    where: {
      userID: args.id,
      guildID: message.guild.id
    }
  });
  let rank = 0;

  if (guildMemberModel) {
    rank = parseInt(guildMemberModel.dataValues.rank) + 1;
  }

  let description = message.author.id === args.id ? `**${args.tag}** bu sunucudaki sıralaman **${rank}** . Bu sunucuda profili olan ${guildMemberModel.dataValues.total} kişi var.` : `**${args.tag}** bu sunucudaki sıralaman **${rank}** . Bu sunucuda profili olan ${guildMemberModel.dataValues.total} kişi var.`;
  
    
  let user;
  if (message.mentions.users.size) {
    user = message.mentions.users.first();
  }
  else if (args.id) {
    user = await Bastion.utils.fetchMember(message.guild, args.id);
    if (user) {
      user = user.user;
    }
  }
  if (!user) {
    user = message.author;
  }

  let userModel = await Bastion.database.models.user.findOne({
    attributes: [ 'avatar', 'info', 'birthDate', 'color', 'location' ],
    where: {
      userID: user.id
    }
  });

    var color = Math.floor(Math.random() * 16777216).toString(16);
    function rainbow() {
      // 30 random hues with step of 12 degrees
      var hue = Math.floor(Math.random() * 30) * 12;

      return $.Color({
        hue: hue,
        saturation: 0.9,
        lightness: 0.6,
        alpha: 1
      }).toHexString();
    };
  
  await message.channel.send({
    embed: {
      color: userModel.dataValues.color ? userModel.dataValues.color : Bastion.colors.BLUE,
      "image": {
      "url": `https://dummyimage.com/800x400/000/${color}&text=${guildMemberModel.dataValues.total}+Kişiden+${rank}.`
      },
      description:description,
    }
  });
};

exports.config = {
  aliases: [],
  enabled: true
};

exports.help = {
  name: 'rank',
  description: 'Shows the rank of the specified user\'s account.',
  botPermission: '',
  userTextPermission: '',
  userVoicePermission: '',
  usage: 'rank [@user-mention]',
  example: [ 'rank', 'rank @user#0001' ]
};