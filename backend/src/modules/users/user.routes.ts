import * as express from "express";

import UserCtrl from "./user.ctrl";

const UserRoutes = express.Router();

UserRoutes.get("/:id", UserCtrl.getById);
UserRoutes.put("/:id", UserCtrl.update);
UserRoutes.delete("/:id", UserCtrl.delete);

export default UserRoutes;
