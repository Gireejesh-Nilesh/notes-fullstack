// start the server
// connect to the db
require("dotenv").config();
const connectToDB = require("./src/config/db");
const app = require("./src/app");

connectToDB();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

