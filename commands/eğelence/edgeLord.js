/**
 * @file edgeLord command
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license GPL-3.0
 */

exports.exec = async (Bastion, message) => {
  await message.channel.send({
    embed: {
      color: Bastion.colors.BLUE,
      description: 'Ne halt ettin, benim hakkımda ne dedin?' +
                   'seni küçük kaltak? En iyi mezun olduğumu bilmeni isterim.' +
                   'Gölge Okulu sınıfımdan ve sertifikalıyım' +
                   'Edgelord ve 300\'den fazla intihar girişimi onayladım.' +
                   'Ben pasif agresif savaş eğitimi aldım ve '+
                   'Tüm dünyada en iyi edger. Sen bir hiçsin' +
                   'ben ama sadece başka bir terapist. Heck\'i yok edeceğim '+
                   'Ben asla sevmediğim olan hassasiyetle kendimden' +
                   'Bu Dünya\'nın altında daha önce görülmüş, benim hecking sözlerimi işaretleyin.' +
                   'Bana yardım etmekten kaçabileceğini mi düşünüyorsun' +
                   'İnternet? Bir daha düşün, meddler. Biz konuşurken' +
                   'gizli Edgelords ağımla iletişim kuruyorum' +
                   'Yeraltı dünyası ve destek grubun sağa uçuyor' +
                   'Şimdi fırtınaya hazır olsan iyi edersin, kurtçuk. '+
                   'dediğim acınacak küçük şeyi yok eden fırtına' +
                   'benim hayatım. Ölü halt ediyorum, evlat. Her yerde olabilirim '+
                   'ne zaman istersen kendimi yedi yüzden fazla öldürürüm' +
                   'yolları, ve bu sadece benim çıplak ellerimle.' +
                   'Silahsız intihar konusunda yoğun bir şekilde eğitim aldım, ancak yaptım' +
                   'Halat mağazasının tüm cephaneliğine erişim ve yapacağım' +
                   'sefil kıçımı silmek için sonuna kadar kullan' +
                   'kıtanın yüzü, çünkü ben biraz bokum. '+
                   'Keşke ne kadar kutsal bir intikam alacağını bilseydin' +
                   'senin küçük "destekleyici" yorumun aşağı çekmek üzereydi' +
                   'üzerimde, belki çıldırtıcı dilinizi tutardınız. '+
                   'Ama yapamazdın, yapmadın, ve şimdi ben ödüyorum' +
                   'Fiyat, seni lanet olası salak. Hepsini suçlayacağım.'+
                   'senin üzerindeyim ve ben içinde boğulacağım. Ben ölüyorum lanet çocuk.'
    }
  });
};

exports.config = {
  aliases: [ 'edgy' ],
  enabled: true
};

exports.help = {
  name: 'edgeLord',
  description: 'Shows a message from an edge lord.',
  botPermission: '',
  userTextPermission: '',
  userVoicePermission: '',
  usage: 'edgy',
  example: []
};
