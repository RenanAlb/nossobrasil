const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const connectToDataBase = require("./database/mongodb");

// Dotenv config.
dotenv.config();

// MongoDB
connectToDataBase();

// Routes
const users = require("./routes/user");
const blogs = require("./routes/blogs");

// Server config.
const app = express();
const port = process.env.PORT || 8080;

// Middlewares
app.use(
  cors({
    origin: "http://127.0.0.1:5500",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

app.use("/users", users);
app.use("/blogs", blogs);

// Iniciar servidor
app.listen(port, () =>
  console.log(`Servidor ativo em http://localhost:${port}`)
);
