/**
 * @file disableCommand command
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license GPL-3.0
 */

exports.exec = async (Bastion, message, args) => {
  let disabledCommands, title, description;
  if (args.name) {
    let command = args.name.toLowerCase();

    if (Bastion.commands.has(command) || Bastion.aliases.has(command)) {
      if (Bastion.commands.has(command)) {
        command = Bastion.commands.get(command);
      }
      else if (Bastion.aliases.has(command)) {
        command = Bastion.commands.get(Bastion.aliases.get(command).toLowerCase());
      }
    }
    else {
      return Bastion.emit('error', '', Bastion.i18n.error(message.guild.language, 'notFound', 'command'), message.channel);
    }

    if ([ 'enablecommand', 'disablecommand' ].includes(command.help.name.toLowerCase()) || command.config.ownerOnly) {
      return Bastion.emit('error', '', Bastion.i18n.error(message.guild.language, 'commandNoDisable', command.help.name), message.channel);
    }

    let guildModel = await Bastion.database.models.guild.findOne({
      attributes: [ 'disabledCommands' ],
      where: {
        guildID: message.guild.id
      }
    });

    if (guildModel.dataValues.disabledCommands) {
      guildModel.dataValues.disabledCommands.push(command.help.name.toLowerCase());
    }
    else {
      guildModel.dataValues.disabledCommands = [ command.help.name.toLowerCase() ];
    }

    guildModel.dataValues.disabledCommands = [ ...new Set(guildModel.dataValues.disabledCommands) ];

    disabledCommands = guildModel.dataValues.disabledCommands;
    description = Bastion.i18n.info(message.guild.language, 'disableCommand', message.author.tag, command.help.name);

    await Bastion.database.models.guild.update({
      disabledCommands: disabledCommands
    },
    {
      where: {
        guildID: message.guild.id
      },
      fields: [ 'disabledCommands' ]
    });
  }
  else if (args.module) {
    args.module = args.module.join('_').toLowerCase();
    if ([ 'bot_owner' ].includes(args.module)) {
      return Bastion.emit('error', '', 'Bunda bu komutları kapatamazsın.', message.channel);
    }

    disabledCommands = Bastion.commands.filter(c => c.config.module === args.module && ![ 'enablecommand', 'disablecommand' ].includes(c.help.name.toLowerCase())).map(c => c.help.name.toLowerCase());

    let guildModel = await Bastion.database.models.guild.findOne({
      attributes: [ 'disabledCommands' ],
      where: {
        guildID: message.guild.id
      }
    });
    if (guildModel.dataValues.disabledCommands) {
      disabledCommands = disabledCommands.concat(guildModel.dataValues.disabledCommands);
    }

    description = Bastion.i18n.info(message.guild.language, 'disableModule', message.author.tag, args.module);

    await Bastion.database.models.guild.update({
      disabledCommands: disabledCommands
    },
    {
      where: {
        guildID: message.guild.id
      },
      fields: [ 'disabledCommands' ]
    });
  }
  else if (args.all) {
    disabledCommands = Bastion.commands.filter(c => ![ 'enablecommand', 'disablecommand' ].includes(c.help.name.toLowerCase()) && !c.config.ownerOnly).map(c => c.help.name.toLowerCase());
    description = Bastion.i18n.info(message.guild.language, 'disableAllCommands', message.author.tag);

    await Bastion.database.models.guild.update({
      disabledCommands: disabledCommands
    },
    {
      where: {
        guildID: message.guild.id
      },
      fields: [ 'disabledCommands' ]
    });
  }
  else {
    let guildModel = await Bastion.database.models.guild.findOne({
      attributes: [ 'disabledCommands' ],
      where: {
        guildID: message.guild.id
      }
    });
    title = 'Bu sunucudaki kapatılmış komutlar:';
    description = guildModel.dataValues.disabledCommands ? guildModel.dataValues.disabledCommands.join(', ') : 'Sunucuda hiçbir komut kapatılmamış.';
  }

  await message.channel.send({
    embed: {
      color: Bastion.colors.RED,
      title: title,
      description: description
    }
  }).catch(e => {
    Bastion.log.error(e);
  });
};

exports.config = {
  aliases: [ 'komutkapa' ],
  enabled: true,
  argsDefinitions: [
    { name: 'name', type: String, defaultOption: true },
    { name: 'module', type: String, multiple: true, alias: 'm' },
    { name: 'all', type: Boolean, alias: 'a' }
  ]
};

exports.help = {
  name: 'komutkapat',
  description: 'Disable command/module in your server.',
  botPermission: '',
  userTextPermission: 'MANAGE_GUILD',
  userVoicePermission: '',
  usage: 'komutkapat [ KOMUT ]',
  example: [ 'komutkapat' ]
};
