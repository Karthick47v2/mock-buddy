// check network bandwidth by downloading image from net

// dummy image
const imgAdd =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1920px-Google_2015_logo.svg.png";
// size in bits
const size = 69819 * 8;

// return whether connection is good or bad
export const getNetSpeed = async (limit) => {
  // current time
  const sTime = new Date().getTime();
  // store downloaded image
  const dload = new Image();
  // cache busting to download image everytime instead of getting from cache
  dload.src = imgAdd + "?nnn=" + sTime;

  await dload.decode();

  // time taken to download image
  const duration = (new Date().getTime() - sTime) / 1000;
  // bandwidth
  const speedBps = (size / duration).toFixed(2);
  const speedKbps = (speedBps / 1024).toFixed(2);

  return speedKbps > limit;
};
