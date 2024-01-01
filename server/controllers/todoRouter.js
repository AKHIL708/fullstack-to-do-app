const express = require("express");
const router = express.Router();
const pool = require("../db/connection");

router.post("/", (req, res) => {
  const selectedQuery = `SELECT * FROM todolistdetails where userId = "${req.body.userId}"`;

  pool.query(selectedQuery, (error, results) => {
    if (error) {
      console.log("error fetching data : ", error);
      res.status(500).json({ error: "internal server Error" });
    } else {
      console.log("data fetched Successfully");
      res.status(200).json(results);
    }
  });
});
// id varchar(500) PK
// createdAt varchar(45)
// data varchar(45)
// type varchar(45)

router.post("/add", (req, res) => {
  const { id, createdAt, type, data, userId } = req.body;
  console.log(req.body);
  const insertQuery =
    "INSERT INTO todolistdetails (id , userId , type , data , createdAt) VALUES (?,?, ? ,? ,?)";
  //   res.status(200).json(req.body);
  pool.query(
    insertQuery,
    [id, userId, type, data, createdAt],
    (error, results) => {
      if (error) {
        console.log("error adding data : ", error);
        res.status(500).json({ error: "internal server Error" });
      } else {
        console.log("data added Successfully");
        res.status(200).json(results);
      }
    }
  );
});

router.post("/delete", (req, res) => {
  const { id } = req.body;
  console.log(req.body);
  const deleteQuery = `DELETE FROM todolistdetails WHERE id = "${req.body.id}"; `;
  //   res.status(200).json(req.body);
  pool.query(deleteQuery, (error, results) => {
    if (error) {
      console.log("error deleting data : ", error);
      res.status(500).json({ error: "internal server Error" });
    } else {
      console.log("data deleted Successfully");
      res.status(200).json(results);
    }
  });
});

router.post("/filter", (req, res) => {
  const filterQuery = `SELECT * FROM todolistdetails where type = "${req.body.type}" and userId = "${req.body.userId}"`;
  pool.query(filterQuery, (error, results) => {
    if (error) {
      console.log("error filtering data : ", error);
      res.status(500).json({ error: "internal server Error" });
    } else {
      console.log("data filtered Successfully");
      res.status(200).json(results);
    }
  });
});

router.post("/updateStatus", (req, res) => {
  console.log(req.body);
  const updateStatusQuery = `UPDATE todolistdetails SET type  
  = "${req.body.type}" WHERE id = "${req.body.id}"`;
  pool.query(updateStatusQuery, (error, results) => {
    if (error) {
      console.log("error updating data : ", error);
      res.status(500).json({ error: "internal server Error" });
    } else {
      console.log("data updated Successfully");
      res.status(200).json(results);
    }
  });
});
router.post("/updateData", (req, res) => {
  console.log(req.body);
  const updateStatusQuery = `UPDATE todolistdetails SET data  
  = "${req.body.data}" WHERE id = "${req.body.id}"`;
  pool.query(updateStatusQuery, (error, results) => {
    if (error) {
      console.log("error updating data : ", error);
      res.status(500).json({ error: "internal server Error" });
    } else {
      console.log("data updated Successfully");
      res.status(200).json(results);
    }
  });
});

module.exports = router;
