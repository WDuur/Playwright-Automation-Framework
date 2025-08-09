import { exec } from "child_process";
import dotenv from "dotenv";

// load env variables from .env file
dotenv.config({ path: "./env/.env" });

// Setting a retry
const retryValue = process.env.RETRY || 0;
const parallelValue = process.env.PARALLEL || 1;

// define a common command string for cucumber tests
const common = `./src/features/*.feature \
    --require-module ts-node/register \
    --require ./src/step-definitions/**/**/*.ts \
    --require ./src/utils/cucumber-timeout.ts \
    -f json:./reports/report.json \
    --format html:./reports/report.html \
    --parallel ${parallelValue} \
    --retry ${retryValue} \
    --tags "not @ignore" `;

// define an interface for the profile object
interface ProfileCommands {
  [key: string]: string;
}

// Define a command string for different test profiles
const profiles: ProfileCommands = {
  smoke: `${common} --tags @smoke`,
  regression: `${common} --tags @regression`,
  login: `${common} --tags @login`,
  contactus: `${common} --tags @contactus`,
};

// Get the thirth argument and assign it to the profile
const profile = process.argv[2];

//construct
let command = `cucumber-js ${
  profiles[profile as "smoke" | "regression" | "login" | "contactus"]
}`;

// print command to console
console.log(command);

// execute command
exec(
  command,
  { encoding: "utf8" },
  (error: Error | null, stdout: string, stderr: string) => {
    if (error) {
      console.error(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  }
);
