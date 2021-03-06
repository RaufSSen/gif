/**
 * @file inviteFilter
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license GPL-3.0
 */

/**
 * Handles filtering of Discord server invites in messages
 * @param {Message} message Discord.js message object
 * @returns {Promise<boolean>} Whether any invite was found in the message, by
 * any unauthorized user
 */
module.exports = message => {
  return new Promise(async (resolve, reject) => {
    try {
      resolve(false);

      // If the user has Manage Server permission, we don't need to filter it.
      if (message.member.hasPermission('MANAGE_GUILD')) return;

      // Fetch filter data from database
      let guildModel = await message.client.database.models.guild.findOne({
        attributes: [ 'guildID' ],
        where: {
          guildID: message.guild.id,
          filterInvites: true
        },
        include: [
          {
            model: message.client.database.models.textChannel,
            attributes: [ 'channelID', 'ignoreInviteFilter' ]
          },
          {
            model: message.client.database.models.role,
            attributes: [ 'roleID', 'ignoreInviteFilter' ]
          }
        ]
      });

      // Check if invite filter is disabled
      if (!guildModel) return;

      // Check if the channel is whitelisted
      if (guildModel.textChannels.
        filter(channel => channel.dataValues.ignoreInviteFilter).
        map(channel => channel.dataValues.channelID).
        includes(message.channel.id)) return;

      // Check if the user is in a whitelisted role
      let whitelistedRoles = guildModel.roles.
        filter(role => role.dataValues.ignoreInviteFilter).
        map(role => role.dataValues.roleID);

      for (let role of whitelistedRoles) {
        if (message.member.roles.has(role)) return;
      }

      // If message contains a discord invite, filter it
      if (hasDiscordInvite(message.content)) {
        resolve(true);
        return deleteInvite(message);
      }

      let links = message.content.match(/(http[s]?:\/\/)(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/gi);
      if (!links) return;

      for (let url of links) {
        let { followedURL } = await message.client.methods.makeBWAPIRequest('/url/follow', {
          qs: {
            url: url
          }
        });

        if (hasDiscordInvite(followedURL)) {
          resolve(true);
          return deleteInvite(message);
        }
      }
    }
    catch (e) {
      reject(e);
    }
  });
};

/**
 * Checks if a string contains a discord invite URL
 * @param {String} string string which needs to be checked for
 * @returns {Boolean} whether the string has invite URL or not
 */
function hasDiscordInvite(string) {
  let discordInvite = /(https:\/\/)?(www\.)?(discord\.gg|discord\.me|discordapp\.com\/invite|discord\.com\/invite)\/([a-z0-9-.]+)?/i;

  if (discordInvite.test(string)) return true;
  return false;
}

/**
 * Deletes the message with the invite URL (if Bastion has permission)
 * and warns the user
 * @param {String} message Discord.js message object
 * @returns {true} If the message was filtered
 */
function deleteInvite(message) {
  if (message.deletable) {
    message.delete().catch(() => {});
  }

  message.channel.send({
    embed: {
      color: message.client.colors.ORANGE,
      description: `${message.author} bu sunucuya sunucu linki atma iznin yok!`
    }
  }).then(msg => {
    msg.delete(5000).catch(() => {});
  }).catch(e => {
    message.client.log.error(e);
  });
  return true;
}
