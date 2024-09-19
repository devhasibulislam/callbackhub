/* external imports */
const express = require("express");
const cors = require("cors");

/* application level connection */
const app = express();

/* middleware connections */
app.use(cors({ origin: "*" }));
app.use(express.json());

/* router level connections */
// global server initial call handler
app.get("/", (req, res, next) => {
  try {
    res.json({
      status: res.statusCode,
      acknowledgement: true,
      message: "success",
      description: "hello from server",
    });
  } catch (error) {
    next(error);
  } finally {
    console.log({
      status: res.statusCode,
      method: req.method,
      route: `${req.protocol}://${req.get("host")}${req.originalUrl}`,
    });
  }
});

/* global callback handler */
app.get("/api/callback", (req, res, next) => {
  try {
    res.json({
      status: res.statusCode,
      acknowledgement: true,
      message: "success",
      data: req.query,
    });
  } catch (error) {
    next(error);
  } finally {
    console.log({
      status: res.statusCode,
      method: req.method,
      route: `${req.protocol}://${req.get("host")}${req.originalUrl}`,
    });
  }
});

/* global error handler */
app.use((err, _, res, __) => {
  res.json({
    status: res.statusCode,
    acknowledgement: false,
    message: err.name,
    description: err.message,
  });
});

/* application port */
const port = process.env.PORT || 1337;

/* establish server port */
app.listen(port, () => {
  console.warn(`[success]: running on port ${port}`);
});

/* export application */
module.exports = app;
