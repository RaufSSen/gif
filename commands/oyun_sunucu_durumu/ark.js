/**
 * @file ark command
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license GPL-3.0
 */

const source = xrequire('gamedig');

exports.exec = async (Bastion, message, args) => {
  try {
    if (!/^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(:0*(?:6553[0-5]|655[0-2][0-9]|65[0-4][0-9]{2}|6[0-4][0-9]{3}|[1-5][0-9]{4}|[1-9][0-9]{1,3}|[0-9]))?$/.test(args.address)) {
      return Bastion.emit('commandUsage', message, this.help);
    }

    args.address = args.address.split(':');
    let host = args.address[0];

    if (host === '127.0.0.1') {
      return message.channel.send({
        embed: {
          description: 'Böyle biryer olamaz `127.0.0.1`'
        }
      });
    }

    let port = args.address[1] ? parseInt(args.address[1]) : 27015;

    let data = await source.query({
      type: 'arkse',
      host: host,
      port: port
    });

    let stats = [
      {
        name: 'Sunucu IP',
        value: `\`${host}:${port}\``,
        inline: true
      },
      {
        name: 'Oyuncu',
        value: `${data.players.length}/${data.maxplayers}`,
        inline: true
      },
      {
        name: 'Harita',
        value: data.map
      }
    ];

    if (data.players.length > 0) {
      let players = [];
      let scores = [];
      let playtimes = [];
      for (let i = 0; i < data.players.length; i++) {
        players.push(data.players[i].name);
      }
      for (let i = 0; i < data.players.length; i++) {
        scores.push(data.players[i].score);
      }
      for (let i = 0; i < data.players.length; i++) {
        playtimes.push(`${parseInt(data.players[i].time)}s`);
      }
      stats.push(
        {
          name: 'Kullanıcı',
          value: `\`\`\`http\n${players.join('\n')}\`\`\``,
          inline: true
        },
        {
          name: 'Skor',
          value: `\`\`\`http\n${scores.join('\n')}\`\`\``,
          inline: true
        },
        {
          name: 'Oynama Zamanı',
          value: `\`\`\`http\n${playtimes.join('\n')}\`\`\``,
          inline: true
        },
        {
          name: 'Katılma',
          value: `<steam://connect/${host}:${port}>`
        }
      );
    }

    let footer;
    if (data.password) {
      footer = {
        text: 'Gizli Sunucu',
        icon_url: 'https://resources.bastionbot.org/images/lock.png'
      };
    }

    await message.channel.send({
      embed: {
        color: Bastion.colors.BLUE,
        title: data.name,
        description: '[ARK: Survival Evolved](https://store.steampowered.com/app/346110/)',
        fields: stats,
        footer: footer
      }
    });
  }
  catch (e) {
    if (e.toString() === 'UDP Watchdog Timeout') {
      return Bastion.emit('error', '', Bastion.i18n.error(message.guild.language, 'invalidIPPort'), message.channel);
    }
    throw e;
  }
};

exports.config = {
  aliases: [ 'arkse' ],
  enabled: true,
  argsDefinitions: [
    { name: 'address', type: String, defaultOption: true }
  ]
};

exports.help = {
  name: 'ark',
  description: 'Bir ARK sunucusu bilgisi al.',
  botPermission: '',
  userTextPermission: '',
  userVoicePermission: '',
  usage: 'ark <SUNUCU_IP:PORT>',
  example: [ 'ark 139.59.31.129:27019' ]
};
