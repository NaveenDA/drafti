import * as jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

const AuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let token: string = req.headers["authorization"] || "";
  if (token.startsWith("Bearer ")) {
    token = token.slice(7, token.length).trimLeft();
  }

  try {
    const jwtDecoded = jwt.verify(token, process.env.JWT_SALT);
    if (jwtDecoded && jwtDecoded["data"] && jwtDecoded["data"]["id"]) {
      req["user_id"] = jwtDecoded["data"]["id"];
      return next();
    } else {
      return res.status(403).send({
        code: 403,
        msg: "Invalid Token",
      });
    }
  } catch (error) {
    return res.status(403).send({
      code: 403,
      msg: "Invalid Token",
    });
  }
};

export default AuthMiddleware;
