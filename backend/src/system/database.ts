import * as path from "path";
import { ConnectionOptions, createConnection } from "typeorm";
const Database = () => {
  const dbConfig: ConnectionOptions = {
    type: "postgres",
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    entities: [path.join(__dirname + "/../modules/**/*.model{.ts,.js}")],
    synchronize: true,
    // ssl: {
    //   rejectUnauthorized: false,
    // },
  };

  (async () => {
    console.time("Database Connection Timing");
    try {
      await createConnection(dbConfig);
      console.timeEnd("Database Connection Timing");
    } catch (error) {
      console.log("Unable to connect the database");
      console.error(error);
    }
  })();
};

export default Database;
