import * as Joi from "@hapi/joi";
import * as parser from "xml2json";
import Axios from "axios";
import { Request, Response } from "express";

import Collections from "./collections.model";

class CollectionCtrl {
  public static async getAll(req: Request, res: Response) {
    try {
      const user_id = req["user_id"];
      const collection = await Collections.find({ user: user_id });
      res.send(collection);
    } catch (error) {
      res.status(500).send({ message: "Problem while getting Collection" });
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
      const user = await Collections.findOne({ user: user_id, id });
      res.send(user);
    } catch (error) {
      res.status(500).send({ message: "Problem while getting Collection" });
    }
  }

  public static async save(req: Request, res: Response) {
    const schema = Joi.object().keys({
      name: Joi.string().required(),
      icon: Joi.string().allow("", null),
      user: Joi.string().required(),
    });
    const user_id = req["user_id"];
    const input: any = {
      name: req.body.name,
      icon: req.body.icon,
      user: user_id,
    };
    const validateResults = schema.validate(input);
    if (validateResults.error) {
      res
        .status(500)
        .send({ message: validateResults.error, type: "Validation Error" });
    } else {
      try {
        console.log(validateResults.value);

        const collection = await Collections.save(validateResults.value);
        res.send(collection);
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
      icon: Joi.string().allow("", null),
      user_id: Joi.string().required(),
    });
    const user_id = req["user_id"];

    const input: any = {
      name: req.body.name,
      icon: req.body.icon,
      user_id,
    };
    const validateResults = schema.validate(input);
    if (validateResults.error) {
      res
        .status(500)
        .send({ message: validateResults.error, type: "Validation Error" });
    } else {
      try {
        const collection = await Collections.update({ id }, { ...input });
        res.send(collection);
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
      const collection = await Collections.delete({ id });
      res.send(collection);
    } catch (error) {
      res.status(500).send({ message: "Problem while deleting collection" });
    }
  }
  public static async getIcons(req: Request, res: Response) {
    const slug = req.params.slug;
    if (!slug) {
      return res
        .status(500)
        .send({ message: "Search Query is missing", type: "Validation Error" });
    }
    try {
      await Axios.get(
        `https://api.icons8.com/api/iconsets/search?term=${slug}`,
      ).then(_res => {
        let xmlDoc: any = parser.toJson(_res.data);
        xmlDoc = JSON.parse(xmlDoc);
        const icons = [];
        xmlDoc.icons8.result.search.icon.map(icon => {
          if (icon.png && icon.png.png[1]) {
            icons.push(icon.png.png[1]);
          }
        });
        res.json(icons);
      });
    } catch (error) {
      res.status(500).send({ message: "Problem while getting Icon" });
    }
  }
}

export default CollectionCtrl;
