const formatDate = (stringDate) => {
  const date = new Date(stringDate)
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString("id", options);
}

function timeFromNow(date) {
  const detik = Math.floor((new Date() - new Date(date)) / 1000);
  const tahun = Math.floor(detik / 31536000);
  const bulan = Math.floor(detik / 2592000);
  const hari = Math.floor(detik / 86400);

  if (hari > 548) {
    return tahun + ' tahun yang lalu';
  }
  if (hari >= 320 && hari <= 547) {
    return 'satu tahun yang lalu';
  }
  if (hari >= 45 && hari <= 319) {
    return bulan + ' bulan yang lalu';
  }
  if (hari >= 26 && hari <= 45) {
    return 'satu bulan yang lalu';
  }

  const jam = Math.floor(detik / 3600);

  if (jam >= 36 && hari <= 25) {
    return hari + ' hari yang lalu';
  }
  if (jam >= 22 && jam <= 35) {
    return 'satu hari yang lalu';
  }

  const menit = Math.floor(detik / 60);

  if (menit >= 90 && jam <= 21) {
    return jam + ' jam yang lalu';
  }
  if (menit >= 45 && menit <= 89) {
    return 'satu jam yang lalu';
  }
  if (detik >= 90 && menit <= 44) {
    return menit + ' menit yang lalu';
  }
  if (detik >= 45 && detik <= 89) {
    return 'satu menit yang lalu';
  }
  if (detik >= 0 && detik <= 45) {
    return 'satu detik yang lalu';
  }
}
