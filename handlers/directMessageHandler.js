/**
 * @file directMessageHandler
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license GPL-3.0
 */

/**
 * Handles direct messages sent to Bastion
 * @param {Message} message Discord.js message object
 * @returns {void}
 */
/*
  var cevaplar = [
  "Hey"
]

var random = cevaplar[Math.floor(Math.random() * cevaplar.length)];

*/

module.exports = async message => {

  if (message.content.toLowerCase().startsWith('selam')) {
  var cevaplar = [
  "Hey",
  "Sanada Selam",
  "O kimler varmış burada",
  "Seeelam",
  "selam Bro?"
]
var random = cevaplar[Math.floor(Math.random() * cevaplar.length)];
    
        return message.channel.send({
        embed: {
          color: message.client.colors.BLUE,
          title: message.author.tag,
          description: `${random} e, naber?`
        }
      }).catch(e => {
        message.client.log.error(e);
      });
}
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  try {
    if (!message.content) return;

    if (message.content.toLowerCase().startsWith('prefix')) {
      return message.channel.send({
        embed: {
          color: message.client.colors.BLUE,
          title: 'Prefixler',
          description: `\`${message.client.configurations.prefix.join('` `')}\``
        }
      }).catch(e => {
        message.client.log.error(e);
      });
    }

    if (message.content.toLowerCase().startsWith('yardım')) {
      return message.channel.send({
        embed: {
          color: message.client.colors.BLUE,
          title: 'The Bastion Bot',
          url: 'https://bastionbot.org',
          description: 'Join [**Bastion HQ**](https://discord.gg/fzx8fkt) to test Bastion and it\'s commands, for giveaway events, for chatting and for a lot of fun!',
          fields: [
            {
              name: 'Bastion HQ Invite Link',
              value: 'https://discord.gg/fzx8fkt'
            },
            {
              name: 'Bastion Bot Invite Link',
              value: `https://discordapp.com/oauth2/authorize?client_id=${message.client.user.id}&scope=bot&permissions=2146958463`
            }
          ],
          thumbnail: {
            url: message.client.user.displayAvatarURL
          },
          footer: {
            text: '</> with ❤ by Sankarsan Kampa (a.k.a. k3rn31p4nic)'
          }
        }
      }).catch(e => {
        message.client.log.error(e);
      });
    }


    // Instant responses
    let instantResponse = await message.client.methods.makeBWAPIRequest('/chat/instant', {
      qs: {
        message: message.content
      }
    });

    if (instantResponse.status === 'success') {
      if (instantResponse.message.permissions.everyone || message.client.credentials.ownerId.includes(message.author.id)) {
        message.channel.startTyping();

        if (instantResponse.message.response instanceof Array) {
          for (let response of instantResponse.message.response) {
            let reply = await message.channel.send(response).catch(() => {});
            if (!reply) break;
          }
        }
        else {
          await message.channel.send(instantResponse.message.response).catch(() => {});
        }

        return message.channel.stopTyping(true);
      }
    }


    let settingsModel = await message.client.database.models.settings.findOne({
      attributes: [ 'relayDirectMessages' ],
      where: {
        botID: message.client.user.id
      }
    });

    if (settingsModel && settingsModel.dataValues.relayDirectMessages) {
      // Find the application owner
      let app = await message.client.fetchApplication();
      let owner = await message.client.fetchUser("701006881551941654");

      // Relay the message
      await owner.send({
        embed: {
          author: {
            name: message.author.tag
          },
          description: message.content
        }
      });
    }
  }
  catch (e) {
    message.client.log.error(e);
  }
};
