/**
 * @file searchServers command
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license GPL-3.0
 */

exports.exec = async (Bastion, message, args) => {
  if (!args.length) {
    return Bastion.emit('commandUsage', message, this.help);
  }

  let guilds = Bastion.guilds.filter(g => g.name.toLowerCase().includes(args.join(' ').toLowerCase())).map(g => `${g.name} - ${g.id}`);
  let total = guilds.length;
  guilds = total > 0 ? guilds.slice(0, 10).join('\n') : 'None';

  await message.channel.send({
    embed: {
      color: Bastion.colors.BLUE,
      title: 'Sunucu Ara',
      description: ` **${total}** sunucu buldum${Bastion.shard ? `,  ${Bastion.shard.id},` : ''} birlikte **${args.join(' ')}** Bu ada sahip`,
      fields: [
        {
          name: 'Sunucular',
          value: total > 10 ? `and ${total - 10} more.` : guilds
        }
      ]
    }
  });
};

exports.config = {
  aliases: [ 'SunucuAra' ],
  enabled: true,
  ownerOnly: true
};

exports.help = {
  name: 'searchServers',
  description: 'Sessiz\'ın Bağlı Olduğu Sunucuları arar.',
  botPermission: '',
  userTextPermission: '',
  userVoicePermission: '',
  usage: 'SunucuAra <isim>',
  example: [ 'SunucuAra Sessiz' ]
};
