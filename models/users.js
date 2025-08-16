const {Schema,model} = require("mongoose")
const {createHmac,randomBytes} = require("crypto");
const { createUserToken } = require("../services/auth");

const userSchema = new Schema({
    fullname:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
        unique:true,
    },
    password:{
        type:String,
        require:true,
    },
    salt:{
        type:String,
    }
},{timestamps:true})

userSchema.pre("save",function (next) {
    const user = this;
    if(!user.isModified("password")) return;
    const salt = randomBytes(16).toString();

    const hashedPassword = createHmac("sha256",salt).update(user.password).digest("hex")

    this.password = hashedPassword;
    this.salt = salt;

    next();

})

userSchema.static("matchPasswordAndGenearateUserToken",
    async function (email,password){
        const user = await this.findOne({email})
        if(!user){
            throw new Error("Invalid User")
        }

        const salt = user.salt;
        const hashedPassword = user.password;

        const providedPassword = createHmac("sha256",salt).update(password).digest("hex")

        if(providedPassword != hashedPassword) throw new Error("Invalid Password");

        const token = createUserToken(user)

        return token;
     }
)



const User = model("user",userSchema);

module.exports = User;