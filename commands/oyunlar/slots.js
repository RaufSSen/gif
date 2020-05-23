/**
 * @file slots command
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license GPL-3.0
 */

exports.exec = async (Bastion, message) => {
  let reel = [
    ':custard:',
    ':candy:',
    ':cake:',
    ':icecream:',
    ':lollipop:',
    ':chocolate_bar:',
    // ':moneybag:',
    ':shaved_ice:',
    ':doughnut:',
    ':cookie:',
    ':ice_cream:'
  ];

  let reels = [];
  for (let i = 0; i < 3; i++) {
    reels.push(reel.getRandom());
  }

  let result = 'Üzgünüm, kaybettin.';
  if (reels[0] === reels[1] && reels[1] === reels[2]) {
    result = 'TEBRİKLER! Kazandın!.';
  }

  await message.channel.send({
    embed: {
      color: Bastion.colors.BLUE,
      title: 'Slot Makilesi',
      description: reels.join(' \u05C0 '),
      footer: {
        text: `🎰 ${result}`
      }
    }
  });
};

exports.config = {
  aliases: [],
  enabled: true
};

exports.help = {
  name: 'slotlar',
  description: 'Spins the reels of the slot machine and shows you the result.',
  botPermission: '',
  userTextPermission: '',
  userVoicePermission: '',
  usage: 'slotlar',
  example: []
};
