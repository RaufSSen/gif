/**
 * @file softBan command
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
  if (!user) {
    return Bastion.emit('commandUsage', message, this.help);
  }

  let member = await Bastion.utils.fetchMember(message.guild, user.id);
  if (message.author.id !== message.guild.ownerID && message.member.highestRole.comparePositionTo(member.highestRole) <= 0) return Bastion.log.info(Bastion.i18n.error(message.guild.language, 'lowerRole'));

  if (!member.bannable) {
    return Bastion.emit('error', '', Bastion.i18n.error(message.guild.language, 'noPermission', 'soft-ban', user), message.channel);
  }

  args.reason = args.reason.join(' ');

  await member.ban({
    days: 7,
    reason: args.reason
  });

  await message.guild.unban(user.id).catch(e => {
    Bastion.log.error(e);
    message.channel.send({
      embed: {
        color: Bastion.colors.RED,
        title: 'Soft-Ban Error',
        description: 'Banned but unable to unban. Please unban the following user.',
        fields: [
          {
            name: 'User',
            value: user.tag,
            inline: true
          },
          {
            name: 'ID',
            value: user.id,
            inline: true
          }
        ]
      }
    }).catch(e => {
      Bastion.log.error(e);
    });
  });

  await message.channel.send({
    embed: {
      color: Bastion.colors.RED,
      description: Bastion.i18n.info(message.guild.language, 'softBan', message.author.tag, user.tag, args.reason),
      footer: {
        text: `ID ${user.id}`
      }
    }
  }).catch(e => {
    Bastion.log.error(e);
  });

  Bastion.emit('moderationLog', message, this.help.name, user, args.reason);

  let DMChannel = await user.createDM();
  await DMChannel.send({
    embed: {
      color: Bastion.colors.RED,
      description: Bastion.i18n.info(message.guild.language, 'softBanDM', message.author.tag, message.guild.name, args.reason)
    }
  }).catch(e => {
    Bastion.log.error(e);
  });
};

exports.config = {
  aliases: [ 'yumuşakBan' ],
  enabled: true,
  argsDefinitions: [
    { name: 'id', type: String, defaultOption: true },
    { name: 'reason', alias: 'r', type: String, multiple: true, defaultValue: [ 'Neden verilmemiş.' ] }
  ]
};

exports.help = {
  name: 'softBan',
  description: 'Belirtilen kullanıcıyı hemen Discord sunucunuzdan yasaklar ve yasağını kaldırır ve mesaj geçmişinin 7 gününü kaldırır..',
  botPermission: 'BAN_MEMBERS',
  userTextPermission: 'BAN_MEMBERS',
  userVoicePermission: '',
  usage: 'yumuşakBan <@KULLANICI | KULLANICI_ID> -r [Neden]',
  example: [ 'yumuşakBan @user#001 -r SPAM.', 'softBan 167147569575323761 -r REKLAM.' ]
};
