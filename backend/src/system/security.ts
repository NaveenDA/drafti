import * as compression from "compression";
import * as cors from "cors";
import * as helmet from "helmet";
import { Application } from "express";

const Security = (app: Application) => {
  /* Config cors*/
  app.use(cors());
  /* Security */
  app.use(helmet());
  /**
   * App level compression
   */
  app.use(compression());
};

export default Security;
