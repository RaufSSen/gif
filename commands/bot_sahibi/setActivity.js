/**
 * @file setActivity command
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license GPL-3.0
 */

exports.exec = async (Bastion, message, args) => {
  if (args.name) {
    args.name = args.name.join(' ');

    await Bastion.user.setActivity(args.name, { type: args.type });

    await message.channel.send({
      embed: {
        color: Bastion.colors.GREEN,
        description: `Aktivitem Artık: **${args.type} ${args.name}**`
      }
    }).catch(e => {
      Bastion.log.error(e);
    });
  }
  else {
    let game = typeof Bastion.configurations.game.name === 'string' ? Bastion.configurations.game.name : Bastion.configurations.game.name.length ? Bastion.configurations.game.name[0] : null;
    await Bastion.user.setActivity(game, { type: Bastion.configurations.game.type });

    await message.channel.send({
      embed: {
        color: Bastion.colors.GREEN,
        description: `Aktivitem Normalden: **${Bastion.configurations.game.type} ${game}**`
      }
    }).catch(e => {
      Bastion.log.error(e);
    });
  }
};

exports.config = {
  aliases: [ 'AktiviteAyarla' ],
  enabled: true,
  ownerOnly: true,
  argsDefinitions: [
    { name: 'name', type: String, multiple: true, defaultOption: true },
    { name: 'type', type: String, alias: 't', defaultValue: 'Streaming' }
  ]
};

exports.help = {
  name: 'setActivity',
  description: 'Aktiviteyi Ayarlar.',
  botPermission: '',
  userTextPermission: '',
  userVoicePermission: '',
  usage: 'AktiviteAyarla [ AKTIVITE_ADI [-t AKTIVITE_TIPI] ]',
  example: [ 'AktiviteAyarla minyonlar! -t Watching', 'AktiviteAyarla seninle birlikte', 'AktiviteAyarla' ]
};
