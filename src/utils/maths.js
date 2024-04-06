const constants = require('../constants/index');
const { MINUTES_IN_A_DAY } = constants;

/**
 * Given minutes, convert and format time as hh:mm
 * @param {number} minutes
 * @returns A string formated time
 */
module.exports.convertMinutesToFormatedTime = (minutes) => {
  let hours = Math.floor(minutes / 60) % 24;
  minutes = minutes % 60;
  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
};

/**
 * Given minutes, convert as the number of days
 * @param {number} minutes
 * @returns A number of days
 */
module.exports.convertMinutesToDays = (minutes) => {
  const days = Math.floor(minutes / MINUTES_IN_A_DAY) + 1;
  return days;
};
