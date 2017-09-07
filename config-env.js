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
  var mashapeKey = env.mashape.key;
  var serviceEndpoint = env.service.endpoint;

  const options = {
    files: envWorkingFilePath,
    from: [/{MASHAPE_KEY}/g, /{SERVICE_ENDPOINT}/g],
    to: [mashapeKey, serviceEndpoint],
    allowEmptyPaths: false
  };

  try {
    const changedFiles = replace.sync(options);
  }
  catch (error) {
    console.error('Error occurred:', error);
  }
});


