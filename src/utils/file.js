const fs = require('fs');

/**
 * This function returns a list of all inputs files content
 * @param {string} dirPath
 * @returns An array containing lists of strings content
 */
module.exports.getDataInputsContentFiles = (dirPath) => {
  const inputsFileNamesList = getDataInputsFilesNames(dirPath);
  const inputsFileContent = inputsFileNamesList.map((fileName) =>
    readInputFile(dirPath, fileName)
  );
  return inputsFileContent;
};

/**
 * This function returns a list of input files names given a directory path
 * @param {string} dirPath
 * @returns array of strings
 */
getDataInputsFilesNames = (dirPath) => {
  try {
    // Read files in directory
    const files = fs.readdirSync(dirPath);
    // Filters files to get input files
    const inputFiles = files.filter((file) => file.includes('input'));
    return inputFiles;
  } catch (error) {
    console.error('An error occurred : ', error);
  }
};

/**
 * This function reads the content of a file give the directory path and file name
 * @param {string} dirPath directory path
 * @param {string} fileName file name
 * @returns array of strings
 */
readInputFile = (dirPath, fileName) => {
  try {
    // Read the file and transform the an array of strings
    let fileContent = fs
      .readFileSync(`${dirPath}/${fileName}`, 'utf8')
      .split('\r\n');
    if (fileContent[0].includes('\n1')) {
      fileContent = fileContent[0].replace(/\n/g, ',').split(',');
    }
    return fileContent;
  } catch (error) {
    console.error('An error occurred : ', error);
  }
};
