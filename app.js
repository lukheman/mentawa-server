const dotenv = require("dotenv");

// load enviroment variabels
console.log(process.env.NODE_ENV);

// const env = process.env.NODE_ENV || ;
if (process.env.NODE_ENV == "development") {
  dotenv.config({ path: `.development.env` });
} else {
  dotenv.config({ path: `.env` });
}

// express app
const express = require("express");
const expressLayout = require("express-ejs-layouts");
const morgan = require("morgan");

const app = express();
app.set("view engine", "ejs");

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// middleware:morgan
app.use(morgan("tiny"));

app.use(expressLayout);
app.set("layout", "layout/main");

// import routes
const apiRoutes = require("./routes/api.js");
const userRoutes = require("./routes/user.js");

const PORT = process.env.PORT || 3000;

app.use("/api", apiRoutes);
app.use("/user", userRoutes);

app.listen(PORT, () => {
  console.log(`Running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
