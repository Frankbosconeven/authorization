const jwt = require("jsonwebtoken")
exports.authRequired = (req, res, next) => {
    const authorization = req.headers.authorization;
    if (!authorization) {
        return res.status(402).json({   error: "please login"})
    }

    //const token = authorization.split("bearer ")[0]
    const token = authorization.split("")[1]
    if (!token) {
        return req.status(402).json({error: "please login"})
    }

    const user = jwt.verify(
        token,
        "25176c6d8567c07090a5692e566a931ef3d5e5655dc0fb09d82172a056887c0a"
    );
    req.user = user;
    next();
}