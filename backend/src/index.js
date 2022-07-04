require("./models/User");
require("./models/Track");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
//const cors = require('cors');
const authRoutes = require("./routes/authRoutes");
const trackRoutes = require("./routes/trackRoutes");
const requireAuth = require("./middlewares/requireAuth");

dotenv.config()

const app = express();

// const allowCrossDomain = function(req, res, next) {
//   res.header('Access-Control-Allow-Origin', "*");
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//   res.header('Access-Control-Allow-Headers', 'Content-Type');
//   next();
// };

// app.use(allowCrossDomain)

//app.use(cors(cors()))
app.use(bodyParser.json()); // parsing json body data from the routes located below
app.use(authRoutes);
app.use(trackRoutes);

const mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
  throw new Error(
    `MongoURI was not supplied!`
  );
}
// mongoose.connect(mongoUri, {
//   useNewUrlParser: true,
//   useCreateIndex: true,
//   useUnifiedTopology: true,
// });
mongoose.connect(mongoUri);
mongoose.connection.on("connected", () => {
  console.log("Connected to mongo instance");
});
mongoose.connection.on("error", (err) => {
  console.error("Error connecting to mongo", err);
});

app.get("/", requireAuth, (req, res) => {
  res.send(`Your email: ${req.user.email}`);
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
