/**
 * @file shardStats command
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license GPL-3.0
 */

exports.exec = async (Bastion, message) => {
  if (!Bastion.shard) {
    return Bastion.emit('error', '', 'Bastion is not sharded. Run Bastion using the sharding manager.', message.channel);
  }

  let uptime = Bastion.uptime;
  let seconds = uptime / 1000;
  let days = parseInt(seconds / 86400);
  seconds = seconds % 86400;
  let hours = parseInt(seconds / 3600);
  seconds = seconds % 3600;
  let minutes = parseInt(seconds / 60);
  seconds = parseInt(seconds % 60);

  uptime = `${seconds}s`;
  if (days) {
    uptime = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }
  else if (hours) {
    uptime = `${hours}h ${minutes}m ${seconds}s`;
  }
  else if (minutes) {
    uptime = `${minutes}m ${seconds}s`;
  }

  await message.channel.send({
    embed: {
      color: Bastion.colors.BLUE,
      title: 'Shard İstatikleri',
      url: Bastion.package.url,
      fields: [
        {
          name: 'Shard ID',
          value: Bastion.shard.id,
          inline: true
        },
        {
          name: 'Uptime',
          value: uptime,
          inline: true
        },
        {
          name: 'WebSocket PING',
          value: `${Bastion.ping.toFixed(2)}ms`,
          inline: true
        },
        {
          name: 'Hazır',
          value: `${Bastion.guilds.size.toHumanString()} Sunucu\n`
          + `${Bastion.channels.filter(channel => channel.type === 'text').size.toHumanString()} Yazı Kanalı\n`
          + `${Bastion.channels.filter(channel => channel.type === 'voice').size.toHumanString()} Ses Kanalı`,
          inline: true
        },
        {
          name: 'Hafıza',
          value: `${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB RSS\n`
                 + `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB Heap`,
          inline: true
        }
      ],
      footer: {
        text: `Total Shards: ${Bastion.shard.count}`
      },
      timestamp: new Date()
    }
  });
};

exports.config = {
  aliases: [ 'shards' ],
  enabled: true
};

exports.help = {
  name: 'shardStats',
  description: 'Shows detailed stats and info of the shard the command was used in.',
  botPermission: '',
  userTextPermission: '',
  userVoicePermission: '',
  usage: 'shardStats',
  example: []
};
