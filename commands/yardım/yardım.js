/**
 * @file help command
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license GPL-3.0
 */

exports.exec = async (Bastion, message, args, name) => {
  if (args.command) {
    let channel, command = args.command.toLowerCase();
    if (Bastion.commands.has(command) || Bastion.aliases.has(command)) {
      if (Bastion.commands.has(command)) {
        command = Bastion.commands.get(command);
      }
      else if (Bastion.aliases.has(command)) {
        command = Bastion.commands.get(Bastion.aliases.get(command).toLowerCase());
      }
      let example = [];
      if (command.help.example.length < 1) {
        example.push('-');
      }
      else {
        for (let i = 0; i < command.help.example.length; i++) {
          example.push(`\`\`\`${message.guild.prefix[0]}${command.help.example[i]}\`\`\``);
        }
      }

      if (args.dm) {
        channel = message.author;
      }
      else {
        channel = message.channel;
      }

      await channel.send({
        embed: {
          color: Bastion.colors.GOLD,
          fields: [
            {
              name: 'Komut',
              value: `\`${command.config.aliases}\``,
              inline: true
            },
            {
              name: 'Açıklama',
              value: Bastion.i18n.command(message.guild.language, command.help.name).description,
              inline: false
            },
            {
              name: 'BOT İzinleri',
              value: `\`${command.help.botPermission || '-'}\``,
              inline: true
            },
            {
              name: 'Kullanıcı İzinleri',
              value: command.config.ownerOnly ? 'Bot Sahibi' : command.config.musicMasterOnly ? 'Müzik Ustası' : command.config.guildOwnerOnly ? 'Sunucu Sahibi' : `\`${command.help.userTextPermission || '-'}\``,
              inline: true
            },
            {
              name: 'Kullanım',
              value: `\`\`\`${message.guild.prefix[0]}${command.help.usage}\`\`\``,
              inline: false
            },
            {
              name: 'Örnek',
              value: example.join('\n'),
              inline: false
            }
          ],
          footer: {
            text: command.config.enabled ? '' : 'Bu Komut Kapatıldı.'
          }
        }
      });
    }
    else {
        return Bastion.emit('error', '', Bastion.i18n.error(message.guild.language, 'notFound', 'komut'), message.channel);
    }
  }
  else {
    await message.channel.send({
      embed: {
        color: Bastion.colors.GOLD,
        title: 'Yardım',
        description: `Kategoriyi görmek için \`${message.guild.prefix[0]}komutlar\`.` +
                     `\nKategorinin içindeki komutlara bakmak için, type \`${message.guild.prefix[0]}komutlar <kategori>\`.` +
                     `\nKomut hakkında daha çok bilgi için \`${message.guild.prefix[0]}yardım <komut_adı>\`.`,
        fields: [
          {
            name: 'Sessiz',
            value: '[Katıl](https://discord.gg/QjH7qF)',
            inline: true
          },
          {
            name: 'Sessiz Bot',
            value: `[Katıl](https://discordapp.com/oauth2/authorize?client_id=${Bastion.user.id}&scope=bot&permissions=8)`,
            inline: true
          }
        ],
        thumbnail: {
          url: Bastion.user.displayAvatarURL
        },
        footer: {
          text: `Sunucu Prefixi: ${message.guild.prefix.join(' ')} • Toplam Komut: ${Bastion.commands.size}`
        }
      }
    });
  }
};

exports.config = {
  aliases: [ ' ' ],
  enabled: true,
  argsDefinitions: [
    { name: 'command', type: String, alias: 'c', defaultOption: true },
    { name: 'dm', type: Boolean }
  ]
};

exports.help = {
  name: 'yardım',
  description: 'Komutun Ne İşe Yaradığını Öğren.',
  botPermission: '',
  userTextPermission: '',
  userVoicePermission: '',
  usage: 'yardım [komut_adı]',
  example: [ 'yardım' ]
};
