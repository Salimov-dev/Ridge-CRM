import tokenService from "../services/token.service.js";

export default (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next()
  }

  try {
    const token = req.headers.authorization.split(' ')[1]
    if (!token) {
      return res.status(401).json({message: 'Unauthorized'})
    }

    const data = tokenService.validateAccess(token)

    req.user = data

    next()
  } catch (e) {
    res.status(401).json({message: 'Unauthorized'})
  }
};
