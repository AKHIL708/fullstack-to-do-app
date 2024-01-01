const express = require("express");
const router = express.Router();
const pool = require("../../db/connection");
const sign = require("jwt-encode");

router.post("/", (req, res) => {
  const { userName, password } = req.body;
  console.log(req.body.userName, req.body.password);
  let authQuery = `SELECT * FROM users WHERE userName="${userName}" and password="${password}";`;
  console.log(authQuery);
  pool.query(authQuery, (error, results) => {
    console.log(results);
    if (results.length > 0) {
      console.log(results);
      res.status(200).json({ message: "success", token: results[0].id });
    } else {
      res.status(500).json({ message: "failure" });
      console.log(error);
    }
  });
});

router.post("/register", (req, res) => {
  try {
    const { userName, password } = req.body;
    console.log(req.body.userName, req.body.password);
    let authQuery = `INSERT into users(id , userName , password) VALUES ( "${encodeData(
      req.body
    )}" , "${userName}" , "${password}");`;
    pool.query(authQuery, (error, results) => {
      if (results) {
        console.log("results", results);
        res.status(200).json({ message: "success" });
      } else {
        res.status(500).json({ message: "failure", reason: error.code });
        console.log("error", error.code);
      }
    });
  } catch (error) {
    res.status(500).json({ message: "failure", reason: error.code });
  }
});

function encodeData(data) {
  const secret = "mypersonalSecretKeyIshere";
  const jwt = sign(data, secret);
  return jwt;
}

module.exports = router;
