import mongoose from "mongoose";
import chalk from "chalk";

const dbName = process.env.DB_NAME || "test";

const dbURI = () => {
  const environment = process.env.NODE_ENV;

  if (!environment) {
    throw new Error(
      "NODE_ENV not set, add NODE_ENV to start of package.json script or set in .env. eg. NODE_ENV=development"
    );
  }

  let dbURI;

  switch (environment) {
    case "development":
      dbURI = process.env.DB_DEV_URI;
      console.log(chalk.white.bgCyan.bold("  DEV ENVIRONMENT  "));
      break;

    case "test":
      dbURI = process.env.DB_TEST_URI;
      console.log(chalk.white.bgYellow.bold("  TEST ENVIRONMENT  "));
      break;

    case "production":
      dbURI = process.env.DB_PROD_URI;
      console.log(chalk.white.bgRed.bold("  PRODUCTION ENVIRONMENT!  "));
      break;

    default:
      console.log(chalk.white.bgRed.bold(`  ${environment} ENVIRONMENT!  `));
      console.log(
        chalk.green.italic(
          `DB URI handling for "${environment}" environment has not been implemented.`
        )
      );
  }

  return { get: dbURI, environment };
};

const connect = async () => {
  await mongoose.connect(dbURI().get, {
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
