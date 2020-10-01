import "reflect-metadata";

import * as express from "express";
// const routeList = require("express-routes-catalogue").default;
import routeList from "express-routes-catalogue";

import Database from "./system/database";
import Environment from "./system/envoirment";
import ExpressConfiguration from "./system/express-config";
import Routes from "./system/routes";
import Security from "./system/security";

console.time("Server Start time");

const app: express.Application = express();

/**
 * Load all the
 */
Security(app);
ExpressConfiguration(app);
Routes(app);
Environment();
Database();

app.get("/", (req, res) => {
  res.send("Hello world!");
});

if (process.env.NODE_ENV === "development") {
  routeList.terminal(app);
}

process.on("uncaughtException", e => {
  console.error(e);
  process.exit(1);
});
process.on("unhandledRejection", e => {
  console.error(e);
  process.exit(1);
});

const port = process.env.PORT || 9090;

app.listen(port, () => {
  console.timeEnd("Server Start time");
  console.log("Backend sever start at localhost:" + port);
});
