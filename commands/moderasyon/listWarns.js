/**
 * @file listWarns command
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license GPL-3.0
 */

exports.exec = async (Bastion, message, args) => {
  let user;
  if (message.mentions.users.size) {
    user = message.mentions.users.first();
  }
  else if (args.id) {
    user = await Bastion.fetchUser(args.id);
  }

  if (user) {
    let guildMemberModel = await message.client.database.models.guildMember.findOne({
      attributes: [ 'warnings' ],
      where: {
        userID: user.id,
        guildID: message.guild.id
      }
    });

    if (!guildMemberModel.dataValues.warnings) {
      return await message.channel.send({
        embed: {
          color: Bastion.colors.GREEN,
          description: `<@${user.id}> hasn't been warned yet.`
        }
      });
    }

    let warnings = guildMemberModel.dataValues.warnings;

    let noOfPages = warnings.length / 10;
    let i = (args.page > 0 && args.page < noOfPages + 1) ? args.page : 1;
    i = i - 1;

    warnings = warnings.slice(i * 10, (i * 10) + 10);
    warnings = warnings.map(warning => {
      return {
        name: warning.reason,
        value: `Warned by <@${warning.executor}> on ${new Date(warning.time)}`
      };
    });

    await message.channel.send({
      embed: {
        color: Bastion.colors.ORANGE,
        title: `Warnings for ${message.author.tag}`,
        fields: warnings,
        footer: {
          text: `Page: ${i + 1} of ${noOfPages > parseInt(noOfPages) ? parseInt(noOfPages) + 1 : parseInt(noOfPages)}`
        }
      }
    });
  }
  else {
    let guildMemberModel = await message.client.database.models.guildMember.findAll({
      attributes: [ 'userID', 'warnings' ],
      where: {
        guildID: message.guild.id,
        warnings: {
          [Bastion.database.Op.not]: null
        }
      }
    });

    let warnedMembers = guildMemberModel.map(model => model.dataValues);


    if (!warnedMembers.length) {
      return await message.channel.send({
        embed: {
          color: Bastion.colors.GREEN,
          description: 'Kimse uyarılmamış.'
        }
      });
    }

    let noOfPages = warnedMembers.length / 10;
    let i = (args.page > 0 && args.page < noOfPages + 1) ? args.page : 1;
    i = i - 1;

    let membersList = [];
    for (let member of warnedMembers) {
      if (message.guild.members.has(member.userID)) {
        membersList.push(`${message.guild.members.get(member.userID).user.tag} - ${member.warnings.length} Warnings`);
      }
      else {
        membersList.push(`${member.userID} - ${member.warnings.length} Warnings`);
      }
    }


    await message.channel.send({
      embed: {
        color: Bastion.colors.ORANGE,
        title: 'Uyarı Listesi',
        description: membersList.slice(i * 10, (i * 10) + 10).join('\n'),
        footer: {
          text: `Sayfa: ${i + 1} of ${noOfPages > parseInt(noOfPages) ? parseInt(noOfPages) + 1 : parseInt(noOfPages)}`
        }
      }
    });
  }
};

exports.config = {
  aliases: [ 'uyarılistesi' ],
  enabled: true,
  argsDefinitions: [
    { name: 'id', type: String, defaultOption: true },
    { name: 'page', type: Number, alias: 'p', defaultValue: 1 }
  ]
};

exports.help = {
  name: 'listWarns',
  description: 'Tüm uyarılı kullanıcıları gösterir.',
  botPermission: '',
  userTextPermission: 'KICK_MEMBERS',
  userVoicePermission: '',
  usage: 'uyarılistesi [ @KULLANICI | KULLANICI_ID ] [-p SAYFA_NO]',
  example: [ 'uyarılistesi', 'uyarılistesi 167142675585745821', 'uyarılistesi -p 3', 'uyarılistesi 167142675585745821 -p 3' ]
};
