/**
 * @file getRequiredExpForLevel
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license GPL-3.0
 */

module.exports = (level = 0) => {
  level = parseInt(level, 10);

  if (level >= 0) {
    // neden 1 kullandım? Çünkü SİHİRLİ SAYI HAHAHAHA
    return Math.floor((level / 1) * (level / 1));
  }

  return null;
};