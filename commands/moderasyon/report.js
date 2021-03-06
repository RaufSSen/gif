/**
 * @file report command
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license GPL-3.0
 */

exports.exec = async (Bastion, message, args) => {
  if (!args.user || !args.reason) {
    return Bastion.emit('commandUsage', message, this.help);
  }


  let guildModel = await Bastion.database.models.guild.findOne({
    attributes: [ 'reportChannel' ],
    where: {
      guildID: message.guild.id
    }
  });

  if (guildModel && guildModel.dataValues.reportChannel && message.guild.channels.has(guildModel.dataValues.reportChannel)) {
    let user;
    if (args.user.startsWith('<@') && message.mentions.users.size) {
      user = message.mentions.users.first();
    }
    else {
      let member = message.guild.members.get(args.user);
      if (member) {
        user = member.user;
      }
    }

    if (!user) {
      return Bastion.emit('error', '', Bastion.i18n.error(message.guild.language, 'notFound', 'user'), message.channel);
    }

    if (message.author.id === user.id) return;

    args.reason = args.reason.join(' ');


    let reportChannel = message.guild.channels.get(guildModel.dataValues.reportChannel);
    await reportChannel.send({
      embed: {
        color: Bastion.colors.ORANGE,
        title: 'Kullanıcı Raporla',
        fields: [
          {
            name: 'Kullanıcı',
            value: user.tag,
            inline: true
          },
          {
            name: 'Kullanıcı ID',
            value: user.id,
            inline: true
          },
          {
            name: 'Rapor',
            value: args.reason
          }
        ],
        footer: {
          text: `Reported by ${message.author.tag} / ${message.author.id}`
        },
        timestamp: new Date()
      }
    });


    await message.channel.send({
      embed: {
        color: Bastion.colors.GREEN,
        title: 'Kullanıcı Raporlandı',
        description: Bastion.i18n.info(message.guild.language, 'report', message.author.tag, user.tag, args.reason)
      }
    }).then(successMessage => {
      if (message.deletable) message.delete().catch(() => {});
      successMessage.delete(10000).catch(() => {});
    }).catch(e => {
      Bastion.log.error(e);
    });
  }
  else {
    await message.channel.send({
      embed: {
        color: Bastion.colors.RED,
        description: Bastion.i18n.error(message.guild.language, 'noReportChannel', message.author.tag)
      }
    });
    if (message.deletable) message.delete().catch(() => {});
  }
};

exports.config = {
  aliases: ['rapor'],
  enabled: true,
  argsDefinitions: [
    { name: 'user', type: String, defaultOption: true },
    { name: 'reason', alias: 'r', type: String, multiple: true }
  ]
};

exports.help = {
  name: 'report',
  description: 'Kullanıcıyı Raporlar.*',
  botPermission: '',
  userTextPermission: '',
  userVoicePermission: '',
  usage: 'report < @KULLANICI | KJULLANICI_ID > < -r REASON >',
  example: [ 'report 215052539542571701 -r DM reklam', 'report @user#0001 -r TROLLL' ]
};
