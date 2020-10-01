import * as dotenv from "dotenv";
import * as path from "path";

const Environment = () => {
  /** config the environment variable */
  dotenv.config();
  dotenv.config({ path: path.join(__dirname, "../../../.env") });
};

export default Environment;
