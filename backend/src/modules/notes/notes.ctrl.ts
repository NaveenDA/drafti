import * as Joi from "@hapi/joi";
import { Request, Response } from "express";

import Notes from "./notes.model";

class NotesCtrl {
  public static async getAll(req: Request, res: Response) {
    try {
      const user_id = req["user_id"];
      const user = await Notes.find({ user_id });
      res.send(user);
    } catch (error) {
      res.status(500).send({ message: "Problem while getting Notes" });
    }
  }

  public static async getById(req: Request, res: Response) {
    const id = req.params.id;
    if (!id) {
      return res
        .status(500)
        .send({ message: "ID is missing", type: "Validation Error" });
    }
    try {
      const user_id = req["user_id"];
      const user = await Notes.findOne({ user_id, id });
      res.send(user);
    } catch (error) {
      res.status(500).send({ message: "Problem while getting Notes" });
    }
  }

  public static async save(req: Request, res: Response) {
    const schema = Joi.object().keys({
      name: Joi.string().required(),
      note: Joi.string().required(),
      user_id: Joi.string().required(),
    });
    const user_id = req["user_id"];
    const input: any = {
      name: req.body.name,
      note: req.body.note,
      user_id,
    };
    const validateResults = schema.validate(input);
    if (validateResults.error) {
      res
        .status(500)
        .send({ message: validateResults.error, type: "Validation Error" });
    } else {
      try {
        const note = await Notes.save(validateResults.value);
        res.send(note);
      } catch (error) {
        res.status(500).send({
          message: "Unable to Save Message",
        });
      }
    }
  }

  public static async update(req: Request, res: Response) {
    const id = req.params.id;
    if (!id) {
      return res
        .status(500)
        .send({ message: "ID is missing", type: "Validation Error" });
    }

    const schema = Joi.object().keys({
      name: Joi.string().required(),
      note: Joi.string().required(),
      user_id: Joi.string().required(),
    });
    const user_id = req["user_id"];

    const input: any = {
      name: req.body.name,
      note: req.body.note,
      user_id,
    };
    const validateResults = schema.validate(input);
    if (validateResults.error) {
      res
        .status(500)
        .send({ message: validateResults.error, type: "Validation Error" });
    } else {
      try {
        const note = await Notes.update({ id }, { ...input });
        res.send(note);
      } catch (error) {
        res.status(500).send({
          message: "Unable to Save Message",
        });
      }
    }
  }

  public static async delete(req: Request, res: Response) {
    const id = req.params.id;
    if (!id) {
      return res
        .status(500)
        .send({ message: "ID is missing", type: "Validation Error" });
    }

    try {
      const user = await Notes.delete({ id });
      res.send(user);
    } catch (error) {
      res.status(500).send({ message: "Problem while deleting notes" });
    }
  }
}

export default NotesCtrl;
