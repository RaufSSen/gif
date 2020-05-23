/**
 * @file leave command
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license GPL-3.0
 */

exports.exec = async (Bastion, message, args) => {
  if (!(parseInt(args[0]) < 9223372036854775807)) {
    return Bastion.emit('commandUsage', message, this.help);
  }

  let guild, found = true;
  if (Bastion.shard) {
    guild = await Bastion.shard.broadcastEval(`this.guilds.get('${args[0]}') && this.guilds.get('${args[0]}').leave().catch(e => this.log.error(e))`);
    guild = guild.filter(g => g);
    if (!guild.length) {
      found = false;
    }
  }
  else {
    guild = Bastion.guilds.get(args[0]);
    if (!guild) {
      found = false;
    }
    await guild.leave();
  }

  if (found) {
    await message.channel.send({
      embed: {
        color: Bastion.colors.RED,
        description: `I've left the${Bastion.shard ? ' ' : ` **${guild.name}** `}Discord server with the ID **${args[0]}**.`
      }
    }).catch(e => {
      Bastion.log.error(e);
    });
  }
  else {
    Bastion.emit('error', '', Bastion.i18n.error(message.guild.language, 'notFound', 'Discord sunucusu'), message.channel);
  }
};

exports.config = {
  aliases: ['çık'],
  enabled: true,
  ownerOnly: true
};

exports.help = {
  name: 'leave',
  description: 'Sessiz\'den bir sunucudan çıkmasını ister.',
  botPermission: '',
  userTextPermission: '',
  userVoicePermission: '',
  usage: 'çık <sunucu_id>',
  example: [ 'çık 1234123412341234' ]
};
