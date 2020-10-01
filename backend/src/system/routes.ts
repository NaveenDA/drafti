import { Application } from "express";

import AuthMiddleware from "../middlewares/auth";
import NotesRoutes from "../modules/notes/notes.routes";
import UserCtrl from "../modules/users/user.ctrl";
import UserRoutes from "../modules/users/user.routes";

const Routes = (app: Application) => {
  app.use("/api/notes", AuthMiddleware, NotesRoutes);
  app.use("/api/user", AuthMiddleware, UserRoutes);
  app.post("/api/login", UserCtrl.login);
  app.post("/api/register", UserCtrl.register);
};

export default Routes;
