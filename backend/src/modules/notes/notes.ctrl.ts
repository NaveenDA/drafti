import * as Joi from "@hapi/joi";
import { Request, Response } from "express";
import { v4 } from "uuid";

import Notes from "./notes.model";
import { CoreUtils } from "../../../../core";

class NotesCtrl {
  public static async getAll(req: Request, res: Response) {
    try {
      const user_id = req["user_id"];
      const notes = await Notes.find({ user: user_id });
      res.send(notes);
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
      const user = await Notes.findOne({ user: user_id, id });
      res.send(user);
    } catch (error) {
      res.status(500).send({ message: "Problem while getting Notes" });
    }
  }

  public static async save(req: Request, res: Response) {
    const schema = Joi.object().keys({
      name: Joi.string().required(),
      note: Joi.string().required(),
      user: Joi.string().required(),
      is_shared: Joi.boolean().default(false),
      collection: Joi.string().required(),
    });
    const user_id = req["user_id"];
    const input: any = {
      name: req.body.name,
      note: req.body.note,
      user: user_id,
      is_shared: req.body.is_shared,
      collection: req.body.collection,
    };
    const validateResults = schema.validate(input);
    if (validateResults.error) {
      res
        .status(500)
        .send({ message: validateResults.error, type: "Validation Error" });
    } else {
      try {
        const finalInput = validateResults.value;
        if (finalInput.is_shared) {
          finalInput.share_id = v4();
        }
        finalInput.raw_html = CoreUtils.compile(finalInput.note);
        finalInput.short_description = CoreUtils.compile(
          CoreUtils.truncateOnWord(finalInput.note, 300),
        );
        const note = await Notes.save(finalInput);
        res.send(note);
      } catch (error) {
        console.error(error);
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
      user: Joi.string().required(),
      is_shared: Joi.boolean().default(false),
      collection: Joi.string().required(),
    });
    const user_id = req["user_id"];

    const input: any = {
      name: req.body.name,
      note: req.body.note,
      user_id,
      is_shared: req.body.is_shared,
      collection: req.body.collection,
    };
    const validateResults = schema.validate(input);
    if (validateResults.error) {
      res
        .status(500)
        .send({ message: validateResults.error, type: "Validation Error" });
    } else {
      try {
        const finalInput = validateResults.value;
        if (finalInput.is_shared && !finalInput.share_id) {
          finalInput.share_id = v4();
        }
        finalInput.raw_html = CoreUtils.compile(finalInput.note);
        finalInput.short_description = CoreUtils.compile(
          CoreUtils.truncateOnWord(finalInput.note, 300),
        );
        const note = await Notes.update({ id }, { ...finalInput });
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
      const note = await Notes.delete({ id });
      res.send(note);
    } catch (error) {
      res.status(500).send({ message: "Problem while deleting notes" });
    }
  }

  public static async getRecentNotes(req: Request, res: Response) {
    try {
      const user_id = req["user_id"];
      const notes = await Notes.find({
        where: { user: user_id },
        order: {
          created_on: "DESC",
        },
        take: 20,
      });
      res.send(notes);
    } catch (error) {
      res.status(500).send({ message: "Problem while getting Notes" });
    }
  }
  public static async getNotesBasedOnCollection(req: Request, res: Response) {
    const id = req.params.id;
    if (!id) {
      return res
        .status(500)
        .send({ message: "ID is missing", type: "Validation Error" });
    }

    const input = {
      collection: id,
      user: req["user_id"],
    };
    try {
      const user_id = req["user_id"];
      const notes = await Notes.find({
        where: {
          collection: input.collection,
          user: input.user,
        },
      });
      res.send(notes);
    } catch (error) {
      res.status(500).send({ message: "Problem while getting Notes" });
    }
  }
}

export default NotesCtrl;
