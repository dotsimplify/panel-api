const app = require("./app");

let port = process.env.Port || 5000;

//listening port number
app.listen(port, () => console.log("server running on " + port));
