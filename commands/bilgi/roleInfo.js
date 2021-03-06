/**
 * @file roleInfo command
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license GPL-3.0
 */

exports.exec = async (Bastion, message, args) => {
  if (!args.length) {
    return Bastion.emit('commandUsage', message, this.help);
  }

  let role = message.mentions.roles.first();
  if (!role) {
    role = message.guild.roles.find(role => role.name === args.join(' '));
  }

  if (!role) {
    return Bastion.emit('error', '', Bastion.i18n.error(message.guild.language, 'roleNotFound'), message.channel);
  }
  let permissions = [];
  let serializedPermissions = role.serialize();
  for (let permission in serializedPermissions) {
    if (serializedPermissions[permission]) {
      permissions.push(permission.replace(/_/g, ' ').toTitleCase());
    }
  }

  let roleModel = await Bastion.database.models.role.findOne({
    attributes: [ 'description' ],
    where: {
      roleID: role.id,
      guildID: message.guild.id
    }
  });
  let roleDescription;
  if (roleModel && roleModel.dataValues.description) {
    roleDescription = await Bastion.utils.decompressString(roleModel.dataValues.description);
  }

  await message.channel.send({
    embed: {
      color: Bastion.colors.BLUE,
      author: {
        name: role.name
      },
      title: 'Role info',
      description: roleDescription,
      fields: [
        {
          name: 'ID',
          value: role.id,
          inline: true
        },
        {
          name: 'Kullanıcılar',
          value: role.members.size,
          inline: true
        },
        {
          name: 'Çekilen',
          value: role.hoist ? 'Evet' : 'Hayır',
          inline: true
        },
        {
          name: 'Dış',
          value: role.managed ? 'Evet' : 'Hayır',
          inline: true
        },
        {
          name: 'Yaratıldı',
          value: role.createdAt.toUTCString(),
          inline: true
        },
        {
          name: 'İzinler',
          value: permissions.length ? permissions.join(', ') : 'Hiçbirşey'
        }
      ],
      thumbnail: {
        url: `https://dummyimage.com/250/${role.hexColor.slice(1)}/&text=%20`
      }
    }
  });
};

exports.config = {
  aliases: [ 'rolbilgi' ],
  enabled: true
};

exports.help = {
  name: 'roleInfo',
  description: 'Shows information of a specified role of your Discord server.',
  botPermission: '',
  userTextPermission: '',
  userVoicePermission: '',
  usage: 'rolbilgi <@roladı |roladı>',
  example: [ 'rolbilgi @Sessiz', 'rolbilgi Sessiz' ]
};
