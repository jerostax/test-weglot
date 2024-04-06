// Data Directory name
const DATA_DIRPATH = './data';
// Amount of minutes in a day
const MINUTES_IN_A_DAY = 60 * 24;
// Amount of minutes in a week of 5 days (monday to friday)
const MINUTES_IN_A_WEEK = MINUTES_IN_A_DAY * 5;
// Minimum start time in minutes (08h00)
const MIN_START_TIME = 480;
// Maximum end time in minutes (17h59)
const MAX_END_TIME = 1079;
// Meeting duration in minutes
const MEETING_DURATION = 60;

module.exports = {
  DATA_DIRPATH,
  MINUTES_IN_A_DAY,
  MINUTES_IN_A_WEEK,
  MIN_START_TIME,
  MAX_END_TIME,
  MEETING_DURATION
};
