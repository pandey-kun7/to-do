require('dotenv').config()

const express = require("express");
const path = require("path")
const cookieParser = require("cookie-parser")

const userRoute = require("./routes/users")
const DBConnection = require("./connection")
const { checkForAuthenticationCookie } = require("./middlewares/auth");


const app = express();
const port = 8000;

DBConnection(process.env.MONGO_DB_URL)

app.use(express.urlencoded({extended:false}))

app.set("view engine","ejs");
app.set("views",path.resolve("views"))

app.use(express.static(path.resolve("styles")));
app.use(express.static(path.resolve(__dirname)));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"))

app.use("/",userRoute);


app.listen(port,()=>(console.log(`Server started at http://localhost:${port}`)))