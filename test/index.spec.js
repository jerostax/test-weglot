const fs = require('fs');
const constants = require('../src/constants/index');
const fileUtils = require('../src/utils/file');
const init = require('../src/index');

const { DATA_DIRPATH } = constants;
const { getDataInputsContentFiles } = fileUtils;

test('input files to match output files', () => {
  const inputsFileContent = getDataInputsContentFiles(DATA_DIRPATH);
  inputsFileContent.forEach((inputFile, idx) => {
    const inputFileResult = init(inputFile);
    const outputFileContent = fs.readFileSync(
      `./data/output${idx + 1}.txt`,
      'utf8'
    );
    expect(inputFileResult).toEqual(outputFileContent);
  });
});
