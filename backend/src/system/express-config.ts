import * as bodyparser from "body-parser";
import { Application } from "express";

const ExpressConfiguration = (app: Application) => {
  // ** To enable get the json Request data */
  app.use(bodyparser.json());
  // **To enable get the POST request data */
  app.use(
    bodyparser.urlencoded({
      extended: false,
    }),
  );
};

export default ExpressConfiguration;
