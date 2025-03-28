const express = require("express");
const dotenv = require("dotenv");

dotenv.config({ path: '../.env' }); // Load environment variables from the specified path


const sql = require("mssql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const config = {
  user: process.env.DB_USER,
  server: process.env.DB_SERVER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  options: {
    encrypt: false,
    trustServerCertificate: true,
    trustedConnection: false,
    enableArithAbout: true,
  },
  port: process.env.DB_PORT, // Use the environment variable directly
  };


app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server is running on port ${process.env.SERVER_PORT}`);

});

app.get("/dinein", (req, res) => {
  sql.connect(config, (err) => {
    if (err) console.log(err);
    const request = new sql.Request();
    request.query(
      `SELECT * FROM [dbo].[categories] 
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
      `SELECT * FROM [dbo].[products]
       WHERE category_id = ${categoryId} AND status = 1;`,
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
      `SELECT * FROM [dbo].[categories] 
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
