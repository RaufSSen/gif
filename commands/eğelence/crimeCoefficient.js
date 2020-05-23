/**
 * @file crimeCoefficient command
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license GPL-3.0
 */

exports.exec = async (Bastion, message) => {
  let user = message.mentions.users.first();
  if (!user) {
    user = message.author;
  }
  user = user.tag;

  let userHash = 0;
  for (let i = 0; i < user.length; i++) {
    userHash += parseInt(user[i].charCodeAt(0));
  }

  let crimeCoefficient = Math.round(parseFloat(`0.${String(userHash)}`) * 500) + 1;

  let crimeStat;
  if (crimeCoefficient < 100) {
    crimeStat = 'Şüpheli, icra eylemi için bir hedef değildir. Dominator tetiği kilitlenecek.';
  }
  else if (crimeCoefficient < 300) {
    crimeStat = 'Şüpheli, gizli bir suçlu olarak sınıflandırılmıştır ve uygulama eylemi için bir hedeftir. Dominator Ölümcül Olmayan Paralyzer moduna ayarlandı. Şüpheli, Dominator kullanılarak nakavt edilebilir.';
  }
  else {
    crimeStat = 'Öldürücü kuvvetlere yetki verilir Dominator otomatik olarak Öldürücü Eliminator\'e geçecek, bu ölümcül Eliminator\'ün çarptığı ve patlayacağı şüphesiyle.';
  }

  await message.channel.send({
    embed: {
      color: Bastion.colors.BLUE,
      title: `${user} nın suç deneyimi ${crimeCoefficient}`,
      description: crimeStat
    }
  });
};

exports.config = {
  aliases: ['sucdeneyim'],
  enabled: true
};

exports.help = {
  name: 'crimeCoefficient',
  description: 'Bir Kullanıcının Suç Deneyimine Bak.',
  botPermission: '',
  userTextPermission: '',
  userVoicePermission: '',
  usage: 'sucdeneyim [@kullanıcı]',
  example: [ 'sucdeneyim', 'sucdeneyim @kullanıcı#0001' ]
};
