const express = require("express");
const sql = require("mssql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const config = {
  user: "sa",
  password: "b1@dmin2022",
  server: "172.16.200.215",
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
      `SELECT * FROM [CX_EP].[dbo].[categories] 
      WHERE name IN ('PIZZA MENU', 'Sides', 'Beverage', 'Group', 'GROUP SLIDER')
      ORDER BY CASE 
          WHEN name = 'PIZZA MENU' THEN 1 
          WHEN name = 'Sides' THEN 2
          WHEN name = 'Beverage' THEN 3
          WHEN name = 'Group' THEN 4
          WHEN name = 'GROUP SLIDER' THEN 5
          ELSE 6 -- Ensures other values are pushed to the end
      END;
      `,
      (err, result) => {
        if (err) console.log(err);
        res.send(result.recordset);
      }
    );
  });
});

app.get("/category/:categoryId", (req, res) => {
  const { categoryId } = req.params;
  sql.connect(config, (err) => {
    if (err) console.log(err);
    const request = new sql.Request();
    request.query(
      `SELECT * FROM [CX_EP].[dbo].[products]
       WHERE category_id = ${categoryId} AND status = 1`,
      (err, result) => {
        if (err) console.log(err);
        res.send(result.recordset);
      }
    );
  });
});

app.get("/TakeOut", (req, res) => {
  sql.connect(config, (err) => {
    if (err) console.log(err);
    const request = new sql.Request();
    request.query(
      `SELECT * FROM [CX_EP].[dbo].[categories] 
      WHERE name IN ('PIZZA MENU', 'Sides', 'Beverage', 'Group', 'GROUP SLIDER')
      ORDER BY CASE 
          WHEN name = 'PIZZA MENU' THEN 1 
          WHEN name = 'Sides' THEN 2
          WHEN name = 'Beverage' THEN 3
          WHEN name = 'Group' THEN 4
          WHEN name = 'GROUP SLIDER' THEN 5
          ELSE 6 -- Ensures other values are pushed to the end
      END;
      `,
      (err, result) => {
        if (err) console.log(err);
        res.send(result.recordset);
      }
    );
  });
});
