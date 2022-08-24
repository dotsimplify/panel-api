require("dotenv").config();
const compression = require("compression");
const express = require("express");
require("./database");
const path = require("path");
const cors = require("cors");
const app = express();
const morgan = require("morgan");
app.use(express.json());
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
//static assets path
app.use(express.static(path.join(__dirname, "public")));
// app.use((req, res, next) => {
//   const corsWhitelist = ["http://localhost:3000"];
//   if (corsWhitelist.indexOf(req.headers.origin) !== -1) {
//     res.header("Access-Control-Allow-Origin", req.headers.origin);
//     // res.header(
//     //   "Access-Control-Allow-Headers",
//     //   "Origin, X-Requested-With, Content-Type, Accept"
//     // );
//   }

//   next();
// });

const whitelist = ["https://mt4-panel.vercel.app/"];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin)) {
      return callback(null, true);
    }
    callback(new Error("Not allowed by CORS"));
  },
};

// app.use(cors(corsOptions));
app.use(cors(corsOptions));

// cookie parser
app.use(cookieParser());
// path for temprary folder for photo upload
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
app.use(compression());
app.use(morgan("dev"));
// root route for application
app.get("/", (req, res) => {
  console.log(req.protocol + "://" + req.get("host") + req.originalUrl, "url");
  return res.status(200).json({ msg: "API health is Good" });
});

//Initiate router
app.use("/api/v1", require("./routes/upload"));
app.use("/admin", require("./routes/adminRouter"));

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

process
  .on("unhandledRejection", (reason, p) => {
    console.error(reason, "Unhandled Rejection at Promise", p);
  })
  .on("uncaughtException", (err) => {
    console.error(err, "Uncaught Exception thrown");
    process.exit(1);
  });

module.exports = app;
