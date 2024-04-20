import jwt from "jsonwebtoken";
import Token from "../models/Token.js";
import getDatabaseConfig from "../utils/get-database-config.js";

class TokenService {
  generate(payload) {
    const accessToken = jwt.sign(payload, getDatabaseConfig().accessSecret, {
      expiresIn: "15d"
    });
    const refreshToken = jwt.sign(payload, getDatabaseConfig().refreshSecret);
    return { accessToken, refreshToken, expiresIn: 3600 * 12 * 24 };
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
      return jwt.verify(refreshToken, getDatabaseConfig().refreshSecret);
    } catch (e) {
      return null;
    }
  }

  validateAccess(accessToken) {
    try {
      return jwt.verify(accessToken, getDatabaseConfig().accessSecret);
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
