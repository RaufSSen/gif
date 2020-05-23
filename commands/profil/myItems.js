/**
 * @file myItems command
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license GPL-3.0
 */

exports.exec = async (Bastion, message) => {
  let color, title, description;

  let itemsModel = await Bastion.database.models.items.findOne({
    attributes: [ 'custom' ],
    where: {
      userID: message.author.id,
      guildID: message.guild.id
    }
  });

  let userItems;
  if (itemsModel) {
    userItems = itemsModel.dataValues.custom;
  }
  else {
    userItems = [];
  }

  if (userItems.length) {
    color = Bastion.colors.BLUE;
    title = `${message.author.tag} Kullanıcısının Eşyaları`;
    description = userItems.join(', ');
  }
  else {
    color = Bastion.colors.RED;
    title = 'Bulunamadı';
    description = 'Bu sunucuda hiçbir eşyan bulunamadı.';
  }

  await message.channel.send({
    embed: {
      color: color,
      title: title,
      description: description
    }
  });
};

exports.config = {
  aliases: ['eşyalarım'],
  enabled: true
};

exports.help = {
  name: 'myItems',
  description: 'Shows the items you\'ve bought from the server\'s shop.',
  botPermission: '',
  userTextPermission: '',
  userVoicePermission: '',
  usage: 'myItems',
  example: []
};
