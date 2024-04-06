const fileUtils = require('./utils/file');
const mathsUtils = require('./utils/maths');
const constants = require('./constants/index');

const { getDataInputsContentFiles } = fileUtils;
const { convertMinutesToFormatedTime, convertMinutesToDays } = mathsUtils;
const {
  DATA_DIRPATH,
  MINUTES_IN_A_DAY,
  MINUTES_IN_A_WEEK,
  MIN_START_TIME,
  MAX_END_TIME,
  MEETING_DURATION
} = constants;

/**
 * Get all the inputs files content
 */
const inputsFileContent = getDataInputsContentFiles(DATA_DIRPATH);

/**
 * Creates a schedule array based on a 5 days work week in minutes
 * @returns A boolean array with default available time
 */
function initiateSchedule() {
  const schedule = [];
  // Range of available times per day in minutes
  const availableTime = initiateAvailableTimePerDayInMinute();
  // Set to true if index is in the range of available times per day in minutes
  for (let i = 0; i < MINUTES_IN_A_WEEK; i++) {
    let isAvailable = false;

    availableTime.forEach(({ min, max }) => {
      if (i >= min && i <= max) {
        isAvailable = true;
      }
    });

    schedule.push(isAvailable);
  }
  return schedule;
}

/**
 * Creates a default range of available time (08h00 - 17h59) for each days of the 5 days work week
 * @returns An array of object containing the min and max default available times
 */
function initiateAvailableTimePerDayInMinute() {
  const availableTimesRange = [];
  // Default current day is Monday as 0, starts at 0 minutes
  for (let i = 0; i < 5; i++) {
    currentDay = i * MINUTES_IN_A_DAY;
    // Set minimum start time & maximum end time based on the current day
    availableTimesRange.push({
      min: MIN_START_TIME + currentDay,
      max: MAX_END_TIME + currentDay
    });
  }
  return availableTimesRange;
}

/**
 * Given a file list of unavailable times, format data to get the start and end times in minutes
 * @param {object} file
 * @returns list of objects
 */
const formatInputFileContent = (file) => {
  const formatedFileContent = file.map((content) => {
    const scheduleToArray = content.split(' ');
    // Day of the week , first day is monday as 0
    const day = Number(scheduleToArray[0]) - 1;
    const timeRange = scheduleToArray[1];
    // Start time hour in minutes
    const startTimeHour = Number(timeRange.split('-')[0].split(':')[0]) * 60;
    // Start time minutes
    const startTimeMinute = Number(timeRange.split('-')[0].split(':')[1]);
    // End time hour in minutes
    const endTimehour = Number(timeRange.split('-')[1].split(':')[0]) * 60;
    // End time minutes
    const endTimeMinute = Number(timeRange.split('-')[1].split(':')[1]);
    return {
      day,
      startTime: startTimeHour + startTimeMinute + day * MINUTES_IN_A_DAY,
      endTime: endTimehour + endTimeMinute + day * MINUTES_IN_A_DAY
    };
  });
  return formatedFileContent;
};

/**
 * Update the schedule boolean array with unavailable range of time from the input file
 * @param {object} schedule
 * @param {object} file
 * @returns updated schedule array
 */
function updateSchedule(schedule, file) {
  const newSchedule = [];
  for (let i = 0; i < schedule.length; i++) {
    // Default available boolean
    let isAvailable = schedule[i];
    for (j = 0; j < file.length; j++) {
      const { startTime, endTime } = file[j];
      if (i >= startTime && i <= endTime) {
        isAvailable = false;
      }
    }
    newSchedule.push(isAvailable);
  }
  return newSchedule;
}

/**
 * Find the first available 60 minutes range of time
 * @param {object} schedule array of booleans
 * @returns the formated available meeting
 */
function findFirstAvailableMeeting(schedule) {
  let count = 0;
  let result;
  for (let i = 0; i < schedule.length; i++) {
    if (schedule[i]) {
      count++;
    } else {
      count = 0;
    }
    if (count === MEETING_DURATION) {
      const day = convertMinutesToDays(i);
      const startTime = convertMinutesToFormatedTime(i - 59);
      const endTime = convertMinutesToFormatedTime(i);

      result = `${day} ${startTime}-${endTime}`;
      return result;
    }
  }
}

/**
 * Initiate program to find the first available meeting time for a given input files
 * @param {object} inputFile
 * @returns A string with the formated available meeting time
 */
function init(inputFile) {
  // Initiate Schedule
  const initialSchedule = initiateSchedule();
  // Format Input file
  const currentInputFile = formatInputFileContent(inputFile);
  // Update initial Schedule with unavailable times range from Input file
  const updatedSchedule = updateSchedule(initialSchedule, currentInputFile);
  // Find the first available range time of 60 minutes for a meeting
  const firstAvailableMeeting = findFirstAvailableMeeting(updatedSchedule);
  return firstAvailableMeeting;
}

/**
 * Run the program on each input files
 */
inputsFileContent.forEach((inputFile) => init(inputFile));

module.exports = init;
