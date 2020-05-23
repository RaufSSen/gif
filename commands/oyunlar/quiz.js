/**
 * @file hello command
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license GPL-3.0
 */

var sayı;
var cevap;
var cevaplanmış;
var kcevap;

exports.exec = async (Bastion, message, msg) => {
  
  if (cevaplanmış == false){
    kcevap = msg;
    if (kcevap == cevap) {
      message.channel.send ("Bildin!");
    }else{
      message.channel.send ("Bilemedin");
    }
    cevaplanmış = true; cevap =""; kcevap="";
  }
  
  sayı = 3;
  var random = Math.floor (Math.random() * (sayı - 1 + 1)) + 1;
  switch(random){
    case 1:message.channel.send({embed: {color: Bastion.colors.BLUE,description: 'Benim Adım Ne?',footer: {text: `Şık Yok.`}}}); cevap = "Rauf";
    case 2:message.channel.send({embed: {color: Bastion.colors.BLUE,description: 'Benim Adım Ne?',footer: {text: `Şık Yok.`}}}); cevap = "Rauf";
    case 3:message.channel.send({embed: {color: Bastion.colors.BLUE,description: 'Benim Adım Ne?',footer: {text: `Şık Yok.`}}}); cevap = "Rauf";
  }
  cevaplanmış = false;

};

exports.config = {
  aliases: [ 'sınav','soru' ],
  enabled: true
};

exports.help = {
  name: 'quiz',
  description: 'Eat my taşşak.',
  botPermission: '',
  userTextPermission: '',
  userVoicePermission: '',
  usage: 'quiz',
  example: []
};
