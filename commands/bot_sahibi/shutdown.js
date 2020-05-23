/**
 * @file shutdown command
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license GPL-3.0
 */

exports.exec = async (Bastion, message) => {
  let confirmation = await message.channel.send({
    embed: {
      color: Bastion.colors.ORANGE,
      description: 'Cidden Beni Kapatmak İstiyor musun?'
    }
  });

  const collector = confirmation.channel.createMessageCollector(m => Bastion.credentials.ownerId.includes(m.author.id) && (m.content.toLowerCase().startsWith('evet') || m.content.toLowerCase().startsWith('hayır')),
    {
      time: 30 * 1000,
      maxMatches: 1
    }
  );

  collector.on('collect', async answer => {
    if (answer.content.toLowerCase().startsWith('evet')) {
      await message.channel.send({
        embed: {
          description: 'O zaman Yakında Görüşürüz.'
        }
      });

      if (Bastion.shard) {
        await Bastion.shard.broadcastEval('this.destroy().then(() => process.exitCode = 0)');
      }
      else {
        await Bastion.destroy();
        process.exitCode = 0;
        setTimeout(() => {
          process.exit(0);
        }, 5000);
      }

      Bastion.log.console('\n');
      Bastion.log.info('O zaman Yakında Görüşürüz.');
    }
    else {
      await message.channel.send({
        embed: {
          description: 'Havalı! Yine Buradayım :D.'
        }
      });
    }
  });
};

exports.config = {
  aliases: [ 'kapat' ],
  enabled: true,
  ownerOnly: true
};

exports.help = {
  name: 'shutdown',
  description: 'Botu Kapatır Ve Yeniden Başlatana Kadar Açılmaz...',
  botPermission: '',
  userTextPermission: '',
  userVoicePermission: '',
  usage: 'kapat',
  example: []
};
