/**
 * @file unBan command
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license GPL-3.0
 */

exports.exec = async (Bastion, message, args) => {
  try {
    if (!args.id) {
      return Bastion.emit('commandUsage', message, this.help);
    }

    args.reason = args.reason.join(' ');

    let user = await message.guild.unban(args.id, args.reason);

    await message.channel.send({
      embed: {
        color: Bastion.colors.GREEN,
        description: Bastion.i18n.info(message.guild.language, 'unban', message.author.tag, user.tag, args.reason)
      }
    }).catch(e => {
      Bastion.log.error(e);
    });

    Bastion.emit('moderationLog', message, this.help.name, user, args.reason);
  }
  catch (e) {
    if (e.code === 10013) {
      Bastion.emit('error', '', Bastion.i18n.error(message.guild.language, 'notFound', 'user'), message.channel);
    }
    else {
      throw e;
    }
  }
};

exports.config = {
  aliases: [ 'unBan' ],
  enabled: true,
  argsDefinitions: [
    { name: 'id', type: String, defaultOption: true },
    { name: 'reason', type: String, alias: 'r', multiple: true, defaultValue: [ 'Neden verilmemiş.' ] }
  ]
};

exports.help = {
  name: 'unBan',
  description: 'Unbans a specified user for your Discord server.',
  botPermission: 'BAN_MEMBERS',
  userTextPermission: 'BAN_MEMBERS',
  userVoicePermission: '',
  usage: 'unBan <KULLANICI_ID> -r [Neden].',
  example: [ 'unBan 186640658873224631 -r Yanlışlarını anladı.' ]
};
