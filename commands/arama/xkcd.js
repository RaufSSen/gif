/**
 * @file xkcd command
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license GPL-3.0
 */

const xkcd = xrequire('xkcd');

exports.exec = async (Bastion, message, args) => {
  if (args.latest) {
    await xkcd((data) => {
      message.channel.send({
        embed: {
          color: Bastion.colors.BLUE,
          title: data.title,
          description: data.alt,
          url: `https://xkcd.com/${data.num}`,
          fields: [
            {
              name: 'Karikatür Numarası',
              value: data.num,
              inline: true
            },
            {
              name: 'Çıkış Tarihi',
              value: new Date(data.year, data.month, data.day).toDateString(),
              inline: true
            }
          ],
          image: {
            url: data.img
          },
          footer: {
            text: 'xkcd tarafından güçlendirildi'
          }
        }
      }).catch(e => {
        Bastion.log.error(e);
      });
    });
  }
  else {
    await xkcd((data) => {
      let comicNumber;
      if (args.number && !isNaN(args.number)) {
        comicNumber = args.number > data.num ? data.num : args.number;
      }
      else {
        comicNumber = Bastion.methods.getRandomInt(1, data.num);
        comicNumber = Number.random(1, data.num);
      }

      xkcd(comicNumber, (data) => {
        message.channel.send({
          embed: {
            color: Bastion.colors.BLUE,
            title: data.title,
            description: data.alt,
            url: `https://xkcd.com/${data.num}`,
            fields: [
              {
                name: 'Karikatür Numarası',
                value: data.num,
                inline: true
              },
              {
                name: 'Çıkış Tarih',
                value: new Date(data.year, data.month, data.day).toDateString(),
                inline: true
              }
            ],
            image: {
              url: data.img
            },
            footer: {
              text: 'xkcd tarafından güçlendirildi'
            }
          }
        }).catch(e => {
          Bastion.log.error(e);
        });
      });
    });
  }
};

exports.config = {
  aliases: ['xkcd'],
  enabled: true,
  argsDefinitions: [
    { name: 'number', type: Number, alias: 'n' },
    { name: 'son', type: Boolean, alias: 'l' }
  ]
};

exports.help = {
  name: 'xkcd',
  description: 'Shows a xkcd comic.',
  botPermission: '',
  userTextPermission: '',
  userVoicePermission: '',
  usage: 'xkcd [ --latest | -n komik numarası ]',
  example: [ 'xkcd', 'xkcd --son', 'xkcd -n 834' ]
};
