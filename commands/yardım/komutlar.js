/**
 * @file commands command
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license GPL-3.0
 */

exports.exec = async (Bastion, message, args) => {
  let categories = Bastion.commands.map(c => c.config.module.toLowerCase()).unique();

  if (!args.category) {
    return await message.channel.send({
      embed: {
        color: Bastion.colors.GOLD,
        title: 'Komut Kategorisi Listesi',
        description: `\`${this.help.name} <komut>\` kullanarak katogorinin içindeki komutlara bakabilirsin, komutlarda ayrıntılı bilgi için \"+yardım <kategori>\" yazabilirsin.`,
        fields: [
          {
            name: 'Command Categories',
            value: categories.map(m => m.replace(/_/g, ' ').toTitleCase()).join('\n')
          }
        ],
        footer: {
          text: `Biliyormuydun BOT'un bu versiyonunda tamıtamına ${Bastion.commands.size} komut bulunuyor!`
        }
      }
    });
  }

  args.category = args.category.join('_').toLowerCase();
  if (!categories.includes(args.category)) {
    return await message.channel.send({
      embed: {
        color: Bastion.colors.RED,
        title: 'Komut Kategorisi Bulunamadı',
        description: '`komutlar` komudu ile kategorileri, `komutlar <kategori adı>` ilede kategorideki komutları görebilirsiniz.'
      }
    });
  }

  let commands = Bastion.commands.filter(c => c.config.module === args.category);
  args.category = args.category.replace(/_/g, ' ').toTitleCase();

  await message.channel.send({
    embed: {
      color: Bastion.colors.GOLD,
      title: `${args.category} kategorisinin komutları`,
      description: `\`komutlar\` komudu ile ${categories.length} kategoriyi görün.`,
      fields: [
        {
          name: `${commands.size} ${args.category} Commands`,
          value: `\`\`\`diff\n+ ${commands.map(c => c.config.aliases).join('\n+ ')}\`\`\``
        },
        {
          name: 'Daha fazla detay?',
          value: 'Yardım komutuna gözat, `yardım <komut>`.'
        }
      ],
      footer: {
        text: `Biliyormuydun BOT'un bu versiyonunda tamıtamına ${Bastion.commands.size} komut bulunuyor!`      }
    }
  });
};

exports.config = {
  aliases: [ 'komutlar' ],
  enabled: true,
  argsDefinitions: [
    { name: 'category', type: String, multiple: true, defaultOption: true }
  ]
};

exports.help = {
  name: 'komutlar',
  description: 'Kategorideki tüm komutları gösterir.',
  botPermission: '',
  userTextPermission: '',
  userVoicePermission: '',
  usage: 'komutlar [kategori]',
  example: [ 'komutlar', 'komutlar oyun istatikleri', 'komutlar Moderasyon"' ]
};
