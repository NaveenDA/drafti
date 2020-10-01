import * as dotenv from "dotenv";

const Environment = () => {
  /** config the environment variable */
  dotenv.config();
  dotenv.config({ path: "../../../.env" });
};

export default Environment;
