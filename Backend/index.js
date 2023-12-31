const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const usersRoute = require("./routes/users");
const postsRoute = require("./routes/posts");
const categoriesRoute = require("./routes/categories");

dotenv.config();
app.use(express.json());


main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URL).then(console.log("connected"));
}

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/posts", postsRoute);
app.use("/api/categories", categoriesRoute);


app.listen("5000", () =>{
    console.log("Backend is running,")
});