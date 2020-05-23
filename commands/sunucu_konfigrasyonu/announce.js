/**
 * @file announce command
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license GPL-3.0
 */

exports.exec = async (Bastion, message, args) => {
  if (!args.length) {
    return Bastion.emit('commandUsage', message, this.help);
  }

  let guildModels = await Bastion.database.models.guild.findAll({
    attributes: [ 'announcementChannel' ]
  });

  let announcementChannels = guildModels.filter(guildModel => guildModel.dataValues.announcementChannel).map(guildModel => guildModel.dataValues.announcementChannel);
  let announcementMessage = args.join(' ');

  for (let channel of announcementChannels) {
    if (Bastion.shard) {
      await Bastion.shard.broadcastEval(`
        let channel = this.channels.get('${channel}');
        if (channel) {
          channel.send({
            embed: {
              color: this.colors.GOLD,
              title: '📢 Duyuru 📢!',
              description: \`${announcementMessage}\`
            }
          }).catch(this.log.error);
          channel.send('@everyone , @here')
        }
      `);
    }
    else {
      await Bastion.channels.get(channel).send({
        embed: {
          color: Bastion.colors.BLUE,
          description: announcementMessage
        }
      }).catch(() => {});
    }
  }

  await message.channel.send({
    embed: {
      color: Bastion.colors.GREEN,
      title: 'Duyuru Gönderildi!',
      description: announcementMessage
    }
  }).catch(e => {
    Bastion.log.error(e);
  });
  await message.channel.send('@everyone , @here')
};

exports.config = {
  aliases: [ 'duyuru' ],
  enabled: true,
};

exports.help = {
  name: 'announce',
  description: 'Bu Komut ile Duyuru Yapabilirsin!!!.',
  botPermission: '',
  userTextPermission: 'MANAGE_GUILD',
  userVoicePermission: '',
  usage: 'duyuru <mesaj>',
  example: [ 'duyuru Sadece Bir Duyuru.' ]
};
