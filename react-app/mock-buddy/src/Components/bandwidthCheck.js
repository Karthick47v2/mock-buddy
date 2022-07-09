/**
 * Bandwidth check module
 * @module bandwidthCheck
 */

/**
 * Image link
 * @type {string}
 */
const imgAdd =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1920px-Google_2015_logo.svg.png";

/**
 * Image size in bits
 * @type {number}
 */
const size = 69819 * 8;

/**
 * @function getNetSpeed
 * @description Return network bandwidth status
 * @param {number} limit - good bandwidth threshold for video streaming
 * @returns {Boolean} - connection status
 */
export const getNetSpeed = async (limit) => {
  /**
   * Current time
   * @type {number}
   */
  const sTime = new Date().getTime();
  /**
   * Downloaded image
   * @type {Image}
   */
  const dload = new Image();
  // cache busting to download image everytime instead of getting from cache
  dload.src = imgAdd + "?nnn=" + sTime;

  await dload.decode();

  /**
   * Time elapsed to download image from internet
   * @type {number}
   */
  const duration = (new Date().getTime() - sTime) / 1000;
  /**
   * Network bandwidth in Bps (Rounded to 2 decimals)
   * @type {number}
   */
  const speedBps = (size / duration).toFixed(2);
  /**
   * Network bandwidth in Kbps (Rounded to 2 decimals)
   * @type {number}
   */
  const speedKbps = (speedBps / 1024).toFixed(2);

  return speedKbps > limit;
};
