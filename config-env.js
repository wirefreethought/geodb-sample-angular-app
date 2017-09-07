var fs = require('fs');
var replace = require('replace-in-file');

var argv = require('yargs').argv;
var env = require("./.env.json");

const environment = argv.environment;
const isProd = environment === 'prod';

const envSourceFilePath = isProd
  ? "src/environments/environment.prod.ts"
  : "src/environments/environment.ts";

const envWorkingFilePath = "src/environments/environment.working.ts";

// Copy source environment to working environment.
var stream = fs
  .createReadStream(envSourceFilePath)
  .pipe(fs.createWriteStream(envWorkingFilePath));

stream.on('finish', function() {
  // Set env variables in working environment.
  var serviceEndpoint = env.service.endpoint;
  var apiKey = env.service.apiKey;

  const options = {
    files: envWorkingFilePath,
    from: [/{SERVICE_ENDPOINT}/g, /{API_KEY}/g],
    to: [serviceEndpoint, apiKey],
    allowEmptyPaths: false
  };

  try {
    const changedFiles = replace.sync(options);
  }
  catch (error) {
    console.error('Error occurred:', error);
  }
});


