const express = require("express");
const sql = require("mssql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const config = {
  user: "sa",
  password: "b1@dmin2022",
  server: "172.16.0.103",
  database: "CX_EP",
  options: {
    trustServerCertificate: true,
    trustedConnection: false,
    enableArithAbout: true,
    instancename: "SQLEXPRESS",

  },
  port: 1433,
};

app.listen(8081, () => {
  console.log("Server is running on port 8081");
});

app.get("/dinein", (req, res) => {
  sql.connect(config, (err) => {
    if (err) console.log(err);
    const request = new sql.Request();
    request.query(
      "SELECT * FROM [CX_EP].[dbo].[categories] WHERE ID IN (3, 4, 5, 10, 11)",
      (err, result) => {
        if (err) console.log(err);
        res.send(result.recordset);
      }
    );
  });
});
