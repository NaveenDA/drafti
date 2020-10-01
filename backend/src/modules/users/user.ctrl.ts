import * as Joi from "@hapi/joi";
import * as jwt from "jsonwebtoken";
import * as md5 from "md5";
import * as moment from "moment";
import { Request, Response } from "express";

import Users from "./user.model";

class UserCtrl {
  public static async login(req: Request, res: Response) {
    const schema = Joi.object().keys({
      username: Joi.string().required(),
      password: Joi.string().required(),
    });
    const input: any = {
      username: req.body.username,
      password: req.body.password,
    };
    const validateResults = schema.validate(input);
    if (validateResults.error) {
      res
        .status(500)
        .send({ message: validateResults.error, type: "Validation Error" });
    } else {
      try {
        input.password = md5(input.password + process.env.HASH_SALT);
        const user = await Users.findOneOrFail(input);
        if (user && user.id) {
          const token = jwt.sign(
            { expiresIn: "365 days", data: { id: user.id } },
            process.env.JWT_SALT,
          );
          res.send({ token });
        } else {
          res.status(400).send({
            code: 400,
            message: "Bad Credentials",
          });
        }
      } catch (error) {
        res.status(400).send({
          code: 400,
          message: "Bad Credentials",
        });
      }
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
      const user = await Users.findOneOrFail({ id });
      res.send(user);
    } catch (error) {
      res.send({ message: "Problem while getting user" });
    }
  }

  public static async register(req: Request, res: Response) {
    const schema = Joi.object().keys({
      name: Joi.string().required(),
      username: Joi.string().required(),
      password: Joi.string().required(),
    });

    const input: any = {
      name: req.body.name,
      username: req.body.username,
      password: req.body.password,
    };
    const validateResults = schema.validate(input);
    if (validateResults.error) {
      res
        .status(500)
        .send({ message: validateResults.error, type: "Validation Error" });
    } else {
      try {
        input.password = md5(input.password + process.env.HASH_SALT);
        input.created_on = moment();
        const retVal = await Users.save(input);
        res.send(retVal);
      } catch (error) {
        res.status(500).send({ message: "Problem Registring User" });
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
    });

    const input: any = {
      name: req.body.name,
    };
    const validateResults = schema.validate(input);
    if (validateResults.error) {
      res
        .status(500)
        .send({ message: validateResults.error, type: "Validation Error" });
    } else {
      try {
        const user = await Users.update({ id }, { ...input });
        res.send(user);
      } catch (error) {
        res.send({ message: "Problem while updating user" });
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
      const user = await Users.delete({ id });
      res.send(user);
    } catch (error) {
      res.status(500).send({ message: "Problem while deleting user" });
    }
  }
}

export default UserCtrl;
