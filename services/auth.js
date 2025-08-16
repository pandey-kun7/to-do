const JWT = require("jsonwebtoken")

const secret = process.env.JWT_SECRET_KEY;

function createUserToken(user){
    const payload = {
        _id:user._id,
        fullname:user.fullname,
        email:user.email,
    }

    const token = JWT.sign(payload,secret)

    return token
}

function validateUserKey(token){
    const payload = JWT.verify(token,secret)
    return payload;
}

module.exports = {
    createUserToken,
    validateUserKey,
}