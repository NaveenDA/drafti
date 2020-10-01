import * as express from "express";

import notesCtrl from "./notes.ctrl";

const NotesRoutes = express.Router();
NotesRoutes.get("/", notesCtrl.getAll);

NotesRoutes.get("/recent", notesCtrl.getRecentNotes);
NotesRoutes.get("/collection/:id", notesCtrl.getNotesBasedOnCollection);
NotesRoutes.get("/:id", notesCtrl.getById);
NotesRoutes.post("/", notesCtrl.save);
NotesRoutes.put("/:id", notesCtrl.update);
NotesRoutes.delete("/:id", notesCtrl.delete);

export default NotesRoutes;
