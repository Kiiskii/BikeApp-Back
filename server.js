const app = require("./index.js");
const port = process.env.PORT ?? 3000;
const host = !!process.env.PORT ? "0.0.0.0" : "app";

app.listen(port, host, () => {
  console.log(`App running on port ${port}.`);
});
