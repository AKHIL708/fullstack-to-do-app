const app = require("./app.js");
const port = 5000;

var server = app
  .listen(port, function () {
    console.log(`successfully listening :  ${port}`);
  })
  .on("error", (err) => {
    console.log("error in listening to app : ", err);
  });
