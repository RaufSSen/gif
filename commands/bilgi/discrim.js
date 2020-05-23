/**
 * @file discrim command
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license GPL-3.0
 */

exports.exec = async (Bastion, message, args) => {
  if (!/^\d{4}$/.test(args[0])) {
    return Bastion.emit('commandUsage', message, this.help);
  }

  let members = message.guild.members.filter(m => m.user.discriminator === args[0]).map(m => m.user.tag);
  let total = members.length;
  members = members.length > 0 ? members.slice(0, 10).join('\n') : 'None';

  await message.channel.send({
    embed: {
      color: Bastion.colors.BLUE,
      title: 'Discriminator Araması',
      description: `Found **${total}** users with discriminator **${args[0]}**`,
      fields: [
        {
          name: 'Kullanıcılar',
          value: total > 10 ? `${members} and ${total - 10} more.` : members
        }
      ]
    }
  });
};

exports.config = {
  aliases: ['discrim'],
  enabled: true
};

exports.help = {
  name: 'discrim',
  description: 'Searches for the users of your Discord server for the specified discriminator.',
  botPermission: '',
  userTextPermission: '',
  userVoicePermission: '',
  usage: 'discrim <id>',
  example: [ 'discrim 7438' ]
};
