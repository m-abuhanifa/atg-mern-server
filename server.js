const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
const connectDB = require("./config/db");
const morgan = require("morgan");
const helmet = require("helmet");
const authRouter = require("./routes/authRoute");
const postRouter = require("./routes/postRoute");

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("common"));

// api

app.use("/api", authRouter);
app.use("/api/posts", postRouter);

//MongoDB connection
connectDB();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`App listening at port ${port}`);
});
