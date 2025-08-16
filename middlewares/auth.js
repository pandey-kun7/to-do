const {validateUserKey} = require("../services/auth")

function checkForAuthenticationCookie(cookiename){
    return function (req,res,next){
        const tokenCookieValue = req.cookies?.[cookiename];
        if(!tokenCookieValue){
            return next();
        }
        try{
            const userpayload = validateUserKey(tokenCookieValue);
            req.user = userpayload
        }catch(error){

        }

        next();
    }
}

module.exports = {
    checkForAuthenticationCookie,
}