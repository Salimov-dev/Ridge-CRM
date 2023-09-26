import jwt from "jsonwebtoken";
import config from "config";
import Token from "../models/Tokens.js";

class TokenService {
  generate(payload) {
    const accessToken = jwt.sign(payload, "the best secure key", {
      expiresIn: "1h",
    });

    const refreshToken = jwt.sign(payload, "super puper refresh key");

    return { accessToken, refreshToken, expiresIn: 3600 };
  }

  async save(user, refreshToken) {
    const data = await Token.findOne({ user });

    if (data) {
      data.refreshToken = refreshToken;
      return data.save();
    }

    const token = await Token.create({ user, refreshToken });
    return token;
  }

  validateRefresh(refreshToken) {
    try {
      return jwt.verify(refreshToken, config.get("refreshSecret"));
    } catch (e) {
      return null;
    }
  }

  validateAccess(accessToken) {
    try {
      return jwt.verify(accessToken, config.get("accessSecret"));
    } catch (e) {
      return null;
    }
  }

  async findToken(refreshToken) {
    try {
      return await Token.findOne({ refreshToken });
    } catch (e) {
      return null;
    }
  }
}

export default new TokenService();
