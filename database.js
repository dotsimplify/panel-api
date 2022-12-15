const mongoose = require("mongoose");

// const connection = (databaseName) => {
// mongoose connection starts here
// ||      `mongodb://localhost:27017/${process.env.DATABASE_NAME}`
mongoose
  .connect(
    process.env.MONGODB_URI ||
      `mongodb://localhost:27017/${process.env.DATABASE_NAME}`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Mongoose connected to db");
  })
  .catch((err) => console.log(err.message));

// mongoose.connection.on("connected", () => {
//   console.log(`Mongoose connected to db ${process.env.DATABASE_NAME}`);
// });

mongoose.connection.on("error", (err) => {
  console.log(err.message);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose connection is disconnected.");
});

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  process.exit(0);
});
// };
// module.exports = connection;
