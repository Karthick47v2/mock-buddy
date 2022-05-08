// check the download speed of an internet image for checking network quality

// dummy image
const imgAdd =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1920px-Google_2015_logo.svg.png";
const size = 69819 * 8; // bits

export const getNetSpeed = async (limit) => {
  const sTime = new Date().getTime();

  const dload = new Image();
  // cache busting to download image everytime instead of getting from cache
  dload.src = imgAdd + "?nnn=" + sTime;

  await dload.decode();

  const duration = (new Date().getTime() - sTime) / 1000;
  const speedBps = (size / duration).toFixed(2);
  const speedKbps = (speedBps / 1024).toFixed(2);

  return speedKbps > limit;
};
