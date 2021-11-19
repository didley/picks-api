import mongoose from "mongoose";
import chalk from "chalk";

const environment = process.env.NODE_ENV;
const dbURI = process.env.DB_URI;
const dbName = process.env.DB_NAME || "picksDB";

const logEnvironment = (env) => {
  if (!env) {
    throw new Error(
      "NODE_ENV not set, add NODE_ENV to start of package.json script or set in .env. eg. NODE_ENV=development"
    );
  }

  switch (env) {
    case "development":
      console.log(chalk.white.bgCyan.bold("  DEV ENVIRONMENT  "));
      break;

    case "test":
      console.log(chalk.white.bgYellow.bold("  TEST ENVIRONMENT  "));
      break;

    case "staging":
      console.log(chalk.white.bgYellow.bold("  STAGING   ENVIRONMENT  "));
      break;

    case "production":
      console.log(chalk.white.bgRed.bold("  PRODUCTION ENVIRONMENT!  "));
      break;

    default:
      console.log(chalk.white.bgRed.bold(`  ${env} ENVIRONMENT!  `));
      console.log(
        chalk.green.italic(
          `DB URI handling for "${env}" environment has not been implemented.`
        )
      );
  }
};

const connect = async () => {
  logEnvironment(environment);

  await mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    autoIndex: false,
    dbName: dbName,
  });
  console.log(`🚀   Connected to ${dbName + " " || ""}DB successfully!`);
};

const disconnect = () => mongoose.disconnect();

export const db = { connect, disconnect, name: dbName };
